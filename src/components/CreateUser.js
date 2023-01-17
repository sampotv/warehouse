import React, { useState  } from 'react'
import { Link,  } from 'react-router-dom';

export default function CreateUser(props) {

    const { userJwt } = props;
    console.log (userJwt);

    const [ username, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstname, setFirstName ] = useState('');
    const [ lastname, setLastName ] = useState('');
    const [ idCompany, setIdCompany ] = useState('');
    const [ msg, setMsg ] = useState('');

let addUser = async (e) => {
    e.preventDefault();

try {
    let res = await fetch(`http://localhost:2000/user`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify( {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            idCompany: idCompany,            
        }),
    }).then((res) =>
    res.json());
    if (res.status === 200) {
        setUserName('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setIdCompany('');
        setMsg('User added');
    } else {
        setMsg("Error");
    }
} catch(err){
    console.log(err);
}

};

return (
    <div className=''>
        <p>Create a new user</p>
        <form onSubmit={ addUser }>
            <div className=''>Give username:
            <input type="text" 
            value = {username} placeholder='Username' className='slidetextright2' onChange = {(e) => setUserName(e.target.value)}></input>
            </div>
            <div className='up'>Give password:
            <input type="text" 
            value = {password} placeholder='Password' className='slidetextright2' onChange = {(e) => setPassword(e.target.value)}></input>
            </div>
            <div className='up'>Give firstname:
            <input type="text" 
            value = {firstname} placeholder='Firstname' className='slidetextright2' onChange = {(e) => setFirstName(e.target.value)}></input>
            </div>
            <div className='up'>Give lastname:
            <input type="text" 
            value = {lastname} placeholder='Lastname' className='slidetextright2' onChange = {(e) => setLastName(e.target.value)}></input>
            </div>
            <div className='up'>Company:
            <select className='slidetextright'
            type="text"
            value = {idCompany}
            onChange = {(e) => setIdCompany(e.target.value)}>
                <option value="0"></option>
                <option value="1">Onkia</option>
                <option value="2">Samasun</option>
                <option value="3">Omena</option>
            </select>
            </div>
            <div>
                <button className='' type='submit'>Create user</button>
                </div>
                <div className=''>{msg ? <p>User created 
                    <Link to={`/Login`} ><button className='loginBox'type='submit'>Login</button></Link>
                </p> : null}</div> 
                

        </form>
    </div>
)





}