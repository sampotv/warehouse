var mysql = require('mysql');

var dbConn = mysql.createPool({
	host:'localhost',
	user:'storageuser',
	password:'storagepass',
	database:'storagedb',
  acquireTimeout: 1000,
  connectionLimit: 100
});
dbConn.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('runrun');
	}
});
module.exports  = dbConn;