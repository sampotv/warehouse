var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');

//DATABASE_URL='mysql://69tgqbwxdqpnkdvs8m2u:pscale_pw_Qd2GSN8fvn4DYDw3qeE0bjola1TIhWwYWDSWQBgbKCc@eu-west.connect.psdb.cloud/warehousedb?ssl={"rejectUnauthorized":true}'

const PORT = process.env.PORT || 3000;

const dbConn = mysql.createPool({
	host:'aws.connect.psdb.cloud',
	user:'zxosr2jpgphrnrr473fn',
	password:'pscale_pw_PfZyL3burGnvbXFtj8Idyr4GVcCxl006NzgP0Z6Ga7',
	database:'warehousedb',
  ssl: {
    rejectUnauthorized: true,
  },
  acquireTimeout: 1000,
  connectionLimit: 100
});


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb",extended: true}));
app.use(passport.initialize());

//create a secret key for jwt
let jwtSecretKey = null;
if(process.env.JWTKEY === undefined) {
  jwtSecretKey = require('./lib/jwt-key.json').secret;
} else {
  jwtSecretKey = process.env.JWTKEY;
}
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
 
      let options = {}
      options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

      options.secretOrKey = jwtSecretKey;
      
      passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log("Processing JWT payload for token content:");
        console.log(jwt_payload);
  
        const now = Date.now() / 1000;
        if(jwt_payload.exp > now) {
          done(null, jwt_payload);
        }
        else {// expired
          done(null, false);
        }
      }));



app.post("/login", (req, res)=> {
 const user = req.body.username
 const password = req.body.password
 dbConn.getConnection ( async (err, connection)=> {
if (err) throw (err)
//perform a sql search with given username to get specific data for the username
    const sqlSearch = "Select * from User where username = ?"
    const search_query = mysql.format(sqlSearch,[user])
    console.log(search_query)
     dbConn.query(search_query, async (err, result) => {
       console.log(result)
       connection.release(); 
    if (err)
      throw (err);
      //check if the given username exist
    if (result.length == 0) {
      console.log("User does not exist");
      res.sendStatus(404);
    }
    else {
      const passwordHash = result[0].password;
      //get the passwordHash from result and compare if the password is correct
      if (await bcrypt.compare(password, passwordHash)) {
        console.log("Login Successful");
        console.log("Generating accessToken");
        
          //with jwt.sign we create the jsonwebtoken, payload has values idUser, username
        //jwt.sign({ idUser: result[0].idUser, username: result[0].username}, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
            jwt.sign({ idUser: result[0].idUser, username: result[0].username, idCompany: result[0].idCompany}, jwtSecretKey, {expiresIn: "2h"}, (err, token) => {
          res.json({ token });  
          console.log(token)
        });   

      } else {
        console.log("Password Incorrect");
        res.send("Password incorrect!");
      }//console.log(jwt)
    }
  }) 
}) 
}) 

//Display your warehouse
app.get(`/warehouse/:idCompany`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM WarehouseItem WHERE idCompany=?',[req.params.idCompany], function(error, result) {
      if (error) throw error;
      console.log("warehouse fetched");     
      res.send(result)  
    });
  });   
});

//params test
app.get("/warehouse2/:idUser", (req,res)=>{

  const idUser = req.params.idUser;
   dbConn.query("SELECT * FROM WarehouseItem WHERE idUser = ?", idUser, 
   (err,result)=>{
      if(err) {
      console.log(err)
      } 
      res.send(result)
      });  
     });

// Add warehouse itemslot
app.post(`/additem/:idCompany`, function(req, res) {
  dbConn.getConnection(function () {
    dbConn.query('INSERT INTO WarehouseItem (row, floor, place, description, idCompany) VALUES (?, ?, ?, ?, ?)',
    [req.body.row, req.body.floor, req.body.place, req.body.description, req.params.idCompany],
    function(error, result) {
      if (error) throw error;
      console.log("Itemslot added");
      res.send(result)
    }
    );
  });
});

// get all user information
app.get(`/user/:idUser`, function(req, res) {
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM User WHERE idUser=?',[req.params.idUser], function(error, result) {
      if (error) throw error;
      console.log("userinfo fetched");     
      res.send(result)  
    });
  });   
});

// get company name
app.get(`/company/:idCompany`, function(req, res) {
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM Company WHERE idCompany=?',[req.params.idCompany], function(error, result) {
      if (error) throw error;
      console.log("Company name fetched");     
      res.send(result)  
    });
  });   
});

// Get all warehouseitems for testing
app.get(`/test`, function (req, res) {
    dbConn.getConnection (function () {
        dbConn.query('SELECT * FROM WarehouseItem', function (error, result) {
            if (error) throw error;
            console.log("Warehouse items fetched");
            res.send(result)
        });
    });
});

//Update warehouseitem description
app.post(`/test/:idWarehouseItem`, function(req, res) {
  dbConn.getConnection(function () {
    dbConn.query('UPDATE WarehouseItem SET description= ? WHERE idItem= ?',
    [req.body.description, req.body.idItem],
    function (error, result) {
      if (error) throw error;
      console.log("Warehouse item updated");
      res.send(result)
});
});
});

// Add new user, password is saved with bcrypt hash
app.post(`/user`, function(req, res) {
    dbConn.getConnection(function () {
      
      const salt = bcrypt.genSaltSync(6);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
      dbConn.query('INSERT INTO User (username, password, firstname, lastname, idCompany) VALUES ( ?, ?, ?, ?, ?)',
      [ req.body.username, passwordHash, req.body.firstname, req.body.lastname, req.body.idCompany],
       function(error, result) {
        if (error) throw error;
        console.log("User created");
        res.send(result)  
      });
    });   
  });

//Display your warehouse with detailed information
app.get(`/warehouseinfo/:idCompany`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('select *, date_format(lastEdited, "%d.%m.%Y : %H.%i.%s") as lastE from WarehouseItem WHERE idCompany=?',[ req.params.idCompany], function(error, result) {
      if (error) throw error;
      console.log("warehouse fetched");     
      res.send(result)  
    });
  });   
});

// display detailed information from warehouseitem, include editor name and last edit time to results
app.get(`/warehouseinfo2/:idCompany`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('select WarehouseItem.row1, WarehouseItem.floor, WarehouseItem.place, WarehouseItem.description, date_format(lastEdited, "%d.%m.%Y : %H.%i.%s") as lastEdit, User.firstname, User.lastname from WarehouseItem inner join User on WarehouseItem.idUser=User.idUser where WarehouseItem.idCompany=?',[ req.params.idCompany], function(error, result) {
      if (error) throw error;
      console.log("warehouse fetched");     
      res.send(result)  
    });
  });   
});

  //Display user information
app.get(`/user/:idUser`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM User WHERE idUser=?',[req.body.idUser], function(error, result) {
      if (error) throw error;
      console.log("userinfo fetched");     
      res.send(result)  
    });
  });   
});

// get user information
app.get(`/useri`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM User WHERE idUser = ?',[req.body.idUser], function(error, result) {
      if (error) throw error;
      console.log("userinfo fetched");     
      res.send(result)  
    });
  });   
});

// Add new itemslot to warehouse
  app.post(`/addslot/:idCompany`, function(req, res) {
    dbConn.getConnection(function () {      
       dbConn.query('INSERT INTO WarehouseItem (row1, floor, place, description, idCompany, idUser) VALUES ( ?, ?, ?, ?, ?, ?)',
      [ req.body.row1, req.body.floor, req.body.place, req.body.description, req.params.idCompany, req.body.idUser],
       function(error, result) {
        if (error) throw error;
        console.log("Itemslot created");
        res.send(result)  
      });
    });   
  });

//Display one itemslot
app.get(`/warehouseitem/:idItem`, function(req, res) { 
  dbConn.getConnection(function () {
    dbConn.query('SELECT * FROM WarehouseItem WHERE idItem=?',[req.body.idItem], function(error, result) {
      if (error) throw error;
      console.log("warehouse fetched");     
      res.send(result)  
    });
  });   
});

// Update warehouseitemslot with new description
  app.post(`/edititem/:idItem`, function(req, res) {   
    dbConn.getConnection(function () {      
      dbConn.query('UPDATE WarehouseItem SET description = ?, idCompany = ? , idUser = ? WHERE idItem = ?',
       [ req.body.description, req.body.idCompany, req.body.idUser, req.params.idItem ],
      function(error, result) {
        if (error) throw error;
        console.log("Itemslot updated");
        res.send(result)  
      });
    });   
  });

  // Get last entry from company warehouse slots
  app.get(`/lastslot/:idCompany`, function(req, res) {
    dbConn.getConnection(function () {
      dbConn.query('select * from WarehouseItem where idCompany = ? order by idItem desc limit 1',
      [ req.params.idCompany ],
      function(error, result){
        if (error) throw error;
        console.log("Last itemslot info");
        res.send(result)
      })
    })
  })

app.listen(PORT, () => 
    console.log(`Server is listening on port ${PORT}...`)
);
