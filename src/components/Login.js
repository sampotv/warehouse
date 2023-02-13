import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  
    const [ username, setUsername ] = useState('');
      const [ password, setPassword ] = useState('');  
     
 
     let navigate = useNavigate();

     const [ loginProcessState, setLoginProcessState ] = useState("idle");
     
     

     const onSubmit = async (event) => {
       event.preventDefault();
       setLoginProcessState("processing");
       try {
         const response = await fetch(`https://warehouse1.herokuapp.com/login` , {
                method: 'POST',
                headers: {"Content-Type": "application/json",
          },
           body: JSON.stringify({
             username: username,
             password: password
           })
         })
         if (response.status !== 200) {
           throw new Error("cannot fetch data");
         }
          await response.json()
         .then( (data) => {
           props.setUserJwt(data.token)
           //var decoded = jwt_decode(userJwt);
           
           navigate(`/choose`, { replace: true });
          console.log(data)
         })
          
         
       } catch (error) {
         console.error(error.message);
         setLoginProcessState("error");
         setTimeout(() => setLoginProcessState("idle"), 1500);
       }
     }

     let loginUIControls = null;
     switch(loginProcessState) {
       case "idle":
         loginUIControls = <button type="submit">Login</button>
         break;
   
       case "processing":
         loginUIControls = <span style={{color: 'blue'}}>Processing login...</span>
         break;
   
       case "success":
         loginUIControls = <span style={{color: 'green'}}>Login successful</span>
         break;
   
       case "error":
         loginUIControls = <span style={{color: 'red'}}>Error</span>
         break;
   
       default:
         loginUIControls = <button type="submit">Login</button>
     }

     return (
        <div>
          <h1>Login</h1>
          <form onSubmit={ onSubmit }>
          <div><input type="text" value={username} placeholder='Username' className='loginInsertBox' onChange={(e) => setUsername(e.target.value)}>
               </input></div>
             <div><input type="password" value={password} placeholder='Password' className='loginInsertBox' onChange={(e) => setPassword(e.target.value)}>
               </input></div>
            <div>
              { loginUIControls }
            </div>
          </form>
        </div>
      )
    }
