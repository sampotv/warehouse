import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import axios from "axios";


//import { Link } from 'react-router-dom';

export default function Test(props) {

    const [company, setCompany] = useState([]);

    const { userJwt } = props
    if(userJwt != null) { 
        var decoded = jwt_decode(userJwt);
}

    useEffect(() => {
        const comp = async () => {
            const response = await axios.get(
                `http://localhost:2000/company/${decoded.idCompany}`);
                setCompany(response.data);  }
                comp();
    }, []);

if (userJwt == null){
    return (
        <div><h2> You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
return (
    <div className=''>
        <h1>{company.map((company) => (
        <div>
            <div key={company.idCompany} className=''>
            {company.company_name } Warehouse
                </div></div>
                
          )) }</h1>
        
       <Link to={"/WarehouseView"}><button className='loginBox'type='submit'>Display warehouse</button></Link>
       
       <div className='App'></div>
       <Link to={`/addslot/${decoded.idCompany}`}><button className='loginBox'type='submit'>Edit warehouse</button></Link>

    </div>
)
}
