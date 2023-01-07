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
  //const {userId} = useParams();

    /*
  useEffect(async () => {
    const user = await fetch(`http://localhost:2000/warehouse/${decoded.idCompany}`)
    .then((res) =>
      res.json()
    )
    setItems(user)
    console.log(user)

  }, []);
  */

  useEffect(() => {
    const storage = async () => {
        const response = await axios.get(
            `http://localhost:2000/warehouse/${decoded.idCompany}`);
            setItem(response.data);  }
            storage();
}, []);
 
if (userJwt == null){
    return (
        <div><h2>You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
  return (
    <div><h3>Warehouse status</h3>
     <div className='formflex' >Row Floor Place Content
     <div className='formRight'><Link to={`/editinfo`}><button>Show detailed update information</button></Link></div></div>
        {item.map((item) => (
        <div>
            <div key={item.idUser} className=''>
              <div className='formflex' >
              <div className='formbox' ><div className='App' >{item.row1 }</div></div>
              <div className='formbox' >{item.floor} </div>
              <div className='formbox' >{item.place}</div>
              <div className='formboxdesc' >{item.description} </div>
              <Link to ={`/edititem/${item.idItem}`}><button>Edit content</button></Link> </div>
                </div></div>
                
          )) }
          
    </div>
  )}
  