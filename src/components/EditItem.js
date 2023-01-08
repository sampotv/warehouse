
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function UpdateItem(props) {

    const { userJwt } = props
    if (userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }

    const [description, setDescription] = useState('');    
    const [item, setItem] = useState('');
    let navigate = useNavigate();

    const [message, setMessage] = useState();
    

    let updateItem = async (e) => {
        e.preventDefault();
        
        try {
            let res = await fetch(`http://localhost:2000/edititem/${decoded.idItem}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + props.userJwt
                },
                body: JSON.stringify({

                    description: description,
                    idCompany: decoded.idCompany,
                    idUser: decoded.idUser,
                    
                }),
              }).then((res) =>
                res.json());
              
              console.log(res)
              if (res.status === 200) {

                setDescription('');
        
                setMessage('Error occured');
              } else {
                
                navigate(`/WarehouseView`, { replace: true });
              }
            } catch (err) {
              console.log(err);
        
            }
          };

          useEffect(() => {
            const storage = async () => {
                const response = await axios.get(
                    `http://localhost:2000/warehouseitem/${decoded.idItem}`);
                    setItem(response.data);  }
                    storage()
        }, []);
          
        if (userJwt == null){
            return (
                <div><h2>You are logged out.</h2>
                <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
                </div>
            )}
    return (
        <div><h1 className="App">Edit Itemslot</h1>
        <div className="addSlot">
            
            <div className='formflex' >Row Floor Place Current content</div>
            {item.map((item) => (
        <div>
            <div key={item.idItem} className=''>
              <div className='formflex' >
              <div className='formbox' ><div className='App' >{item.row1 }</div></div>
              <div className='formbox' >{item.floor} </div>
              <div className='formbox' >{item.place}</div>
              <div className='formboxdesc' >{item.description} </div>
              </div></div></div>
                
          )) }
            
            <form onSubmit={updateItem}>
            <input type="text" value={description} placeholder='Description' className="addItemBoxDesc"
                onChange={(e) => { setDescription(e.target.value) }} />
                
            
            <button className='appButton' >Update place content</button>
            
            <div className="message">{ message }</div>
            </form>
            

        </div> </div>
)
}
export default UpdateItem;