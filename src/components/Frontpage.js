import React from 'react'

import { Link } from 'react-router-dom';

export default function Frontpage(props) {


    

/*    const [wh, setWh] = useState([]);

    useEffect(async () => {
      const mywh = await fetch('http://localhost:5000/warehouseitem').then((res) =>
        res.json()
      )
  
      console.log(mywh)
      setWh(mywh)
    }, []);
*/
    return (<div className=''>
        
        <div><h1>Login to your warehouse</h1></div>
                <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
            
        <div><h1>Create new user</h1></div>
        <Link to={`/CreateUser`} ><button className='loginBox'type='submit'>Create user</button></Link>
   
    </div>
            
    )
}

//<Link to={`/Test`}><button type='submit'>test</button></Link>
//<Link to={`/add/:companyId`}><button type='submit'>Add item</button></Link>