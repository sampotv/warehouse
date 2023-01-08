import React from 'react'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';


//import { Link } from 'react-router-dom';

export default function Test(props) {

    const { userJwt } = props
    if(userJwt != null) { 
        var decoded = jwt_decode(userJwt);
}
/*
    const [ storages, setStorage ] = useState([]);
    //const { companyId } = useParams('');

    useEffect(() => {
        const storage = async () => {
            const response = await axios.get(
                `http://localhost:2000/warehouse/${decoded.idCompany}`);
                setStorage(response.data);  }
                storage();
    }, []);
    */


if (userJwt == null){
    return (
        <div><h2>You are logged out.</h2>
        <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
        </div>
    )}
return (
    <div className=''>
        <h1>Warehouse</h1>
       <Link to={"/WarehouseView"}><button className='loginBox'type='submit'>Display warehouse</button></Link>
       <h1></h1>

       <Link to={`/addslot/${decoded.idCompany}`}><button className='loginBox'type='submit'>Edit warehouse</button></Link>

    </div>
)
}
/*
    useEffect(() => {
        async function fetch(){ 
            const storage = await fetch(
                `http://localhost:2000/warehouse/${decoded.idUser}`)
                .then((res) =>
      res.json()
                )
                setStorage(storage)}
}, []);
return (
    <div className=''>
        choose
        { storages.map(sto => (
            <div key={storages.idCompany}>            
            
                { sto.row } {sto.place } { sto.floor } { sto.description }
                {storages.map((storages) => (
        <div key={storages.idCompany} >
        <div><Link to={`/addslot/${storages.idCompany}`}><button className='loginBox'type='submit'>Edit warehouse</button></Link></div></div>
       ))}
            </div>
              )  )}
    </div>
)
}
*/