import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function AddSlot(props){

    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }
    let navigate = useNavigate();
   
    const [row1, setRow1] = useState('');
    const [floor, setFloor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const {companyId} = useParams('');
    const [item, setItem] = useState([]);
    const [message, setMessage] = useState();
 

    let addSlot = async (e) => {
        e.preventDefault();
        
        try {
            let res = await fetch(`http://localhost:2000/addslot/${decoded.idCompany}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + props.userJwt
                },
                body: JSON.stringify({
                    row1: row1,
                    floor: floor,
                    place: place,
                    description: description,
                    idUser: decoded.idUser
                }),
              }).then((res) =>
                res.json());
                //navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                
              if (res.status === 200) {
                setRow1('');
                setFloor('');
                setPlace('');
                setDescription('');
        
                setMessage('Error occured');
              } else {
                
                setMessage("New item space added");
                navigate(`/empty`);
                setTimeout(() => {
                  navigate(`/addslot/${decoded.idCompany}`, { replace: true });
                }  
              )}
            } catch (err) {
              console.log(err);
        
            }
          };


          useEffect(() => {
            const storage = async () => {
                const response = await axios.get(
                    `http://localhost:2000/lastslot/${decoded.idCompany}`);
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
        <div className="">
            <h1>Add Itemslot</h1>
            <form className="addSlot" onSubmit={addSlot}>
            <input type="text" value = { row1 } placeholder='Row' className="addItemBox" 
            onChange={(e) => { setRow1(e.target.value) }}/>

            <input type="text" value = { floor } placeholder='Floor' className="addItemBox" 
            onChange={(e) => { setFloor(e.target.value) }}/>

            <input type="text" value = { place } placeholder='Place' className="addItemBox"
            onChange={(e) => { setPlace(e.target.value) }}/>

            <input type="text" value = { description } placeholder='Description' className="addItemBoxDesc" 
            onChange={(e) => { setDescription(e.target.value) }}/>
            <button className='appButton'type='submit'>Create new item slot</button>
            
            <div className="message">{message} </div>
            
            </form>
            {item.map((item) => (
        <div>
            <div key={item.idUser} className='addSlot'>
            <div className='formflex2' > Last inserted itemslot for your warehouse</div>
            <div className='formflex' >Row Floor Place Content</div>
              <div className='formflex' >
              <div className='formbox' ><div className='App' >{item.row1 }</div></div>
              <div className='formbox' >{item.floor} </div>
              <div className='formbox' >{item.place}</div>
              <div className='formboxdesc' >{item.description} </div>
               </div>
                </div></div>
                
          )) }
        </div>
        
    )
}
export default AddSlot;
