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
    const user = await fetch(`https://warehouse1.herokuapp.com/warehouse/${decoded.idCompany}`)
    .then((res) =>
      res.json()
    )
    setItems(user)
    console.log(user)

  }, []);
  */

  useEffect(() => {
    async function storage() {
        const response = await axios.get(
            `https://warehouse1.herokuapp.com/warehouse/${decoded.idCompany}`);
            setItem(response.data);  }
            storage();
          }, [decoded.idCompany]);
 
const [whitem, setWhitem] = useState('');
const filter = (e) => {
  const key = e.target.value; 
  setWhitem(key);
};
let searchItems = item.filter(items => items.description.toLowerCase().includes(whitem.toLowerCase()))


if (userJwt == null){
    return (
        <div><h2>You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
  return (
    <div><h3>Warehouse status</h3>
      <div className="">
        <input
          type="search"
          value={whitem}
          onChange={filter}
          className=""
          placeholder="Search from warehouse"/></div>

     <div className='formflex' >Row Floor Place Content
     <div className='formRight'><Link to={`/editinfo`}><button>Show detailed update information</button></Link></div></div>
        {searchItems.length ? searchItems.map((item) => (
        <div>
            <div key={item.idUser} className='up'>
              <div className='formflex' >
              <div className='formbox' ><div className='slidetextright' >{item.row1 }</div></div>
              <div className='formbox' ><div className='slidetextright'>{item.floor} </div></div>
              <div className='formbox' ><div className='slidetextright'>{item.place}</div></div>
              <div className='formboxdesc' ><div className='slidetextright'>{item.description} </div></div>
              <Link to ={`/edititem/${item.idItem}`}><button>Edit content</button></Link> </div>
                </div></div>
              
          )) : <div>No results, try other keyword</div> }
          
    </div>
  )}
  

  /*
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
  */