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
 
  useEffect(() => {
    async function storage() {
        const response = await axios.get(
            `http://localhost:2000/warehouseinfo2/${decoded.idCompany}`);
            setItem(response.data);  }
            storage();

        }, [decoded.idCompany]);

const [whitem, setWhitem] = useState('');
const filter = (e) => {
  const key = e.target.value; 
  setWhitem(key);
};
let searchItems = item.filter(items => items.firstname.toLowerCase().includes(whitem.toLowerCase()) || items.lastname.toLowerCase().includes(whitem.toLowerCase()))

if (userJwt == null){
    return (
        <div><h2>You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
 
    return (
        <div><h3>Warehouse detailed status</h3>
        <div className="">
        <input
          type="search"
          value={whitem}
          onChange={filter}
          className=""
          placeholder="Search with editor name"/></div>
            <div className='formflex' >Row Floor Place Content
                <div className='formtopic'>Last edited</div><div>Last editor</div></div>
            {searchItems.length ? searchItems.map((item) => (
                    <div key={item.idUser} className=''>
                        <div className='formflex' >
                            <div className='formbox' ><div className='slidetextright' >{item.row1}</div></div>
                            <div className='formbox' ><div className='slidetextright'>{item.floor}</div></div>
                            <div className='formbox' ><div className='slidetextright'>{item.place}</div></div>
                            <div className='formboxdesc' ><div className='slidetextright'>{item.description} </div></div>
                            <div className='formboxdate' ><div className='slidetextright'>{item.lastEdit}</div></div>                
                            <div className='formboxeditor' ><div className='slidetextright'>{item.firstname} {item.lastname}</div></div>
                        </div></div>
            )): <div>No results, try other keyword</div>}

        </div>
    )
}

