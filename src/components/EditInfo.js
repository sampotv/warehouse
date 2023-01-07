import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function WarehouseView(props) {
  const { userJwt } = props
  if(userJwt != null) { 
    var decoded = jwt_decode(userJwt);
}
  
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const storage = async () => {
        const response = await axios.get(
            `http://localhost:2000/warehouseinfo/${decoded.idCompany}`);
            setItem(response.data);  }
            storage();
}, []);
useEffect(() => {
    const useri = async () => {
        const response = await axios.get(
            `http://localhost:2000/user/${decoded.idUser}`);
            setUser(response.data);  }
            useri();
}, []);


if (userJwt == null){
    return (
        <div><h2>You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
    return (
        <div><h3>Warehouse detailed status</h3>
            <div className='formflex' >Row Floor Place Content
            <div className='formtopic'>Last edited</div><div>Last editor</div></div>
            {item.map((item) => (
                <div>
                    <div key={item.idUser} className=''>
                        <div className='formflex' >
                            <div className='formbox' ><div className='App' >{item.row1}</div></div>
                            <div className='formbox' >{item.floor} </div>
                            <div className='formbox' >{item.place}</div>
                            <div className='formboxdesc' >{item.description} </div>
                            <div className='formboxdesc' >{item.lastE}</div>
                            {user.map((user) => (
                <div>
                    <div key={user.idUser} className='formboxdesc'>
                        {user.firstname} {user.lastname}
                </div></div>
            ))}                          
                        </div></div></div>
            ))}
            
        </div>
    )
}
  