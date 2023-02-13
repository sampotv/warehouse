/*import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

function Test(props){

    let navigate = useNavigate();
    const { userJwt } = props
    if(userJwt != null) {
        var decoded = jwt_decode(userJwt);
        navigate(`/addslot/${decoded.idCompany}`, { replace: true });
    }



}
export default Test

//import { Link } from 'react-router-dom';

export default function Test(props) {

    const { userJwt } = props
    if(userJwt != null) { 
        var decoded = jwt_decode(userJwt);
}
    const [ storages, setStorage ] = useState([]);

    useEffect(() => {
        const storage = async () => {
            const response = await axios.get(
                `https://warehouse1.herokuapp.com/test/`);
                setStorage(response.data);  }
                storage();
}, []);
return (
    <div className=''>
        TEST1
        { storages.map(sto =>
            <div>
                { sto.row } {sto.place } { sto.floor } { sto.description }
                
            </div>
                )}
    </div>
)
}

//<Link to={"/update/"+item.idWarehouseItem}>Update</Link>

   /* const { userJwt } = props;
    console.log (userJwt);
    
    if(userJwt != null) {
    
        var decoded = jwt_decode(userJwt);
    }

    const [ storages, setStorage ] = useState([]);

   useEffect(async () => {
        const storage = await fetch(`https://warehouse1.herokuapp.com/test`)
        .then((res) =>
            res.json()
        )
        console.log(storage)
        setStorage(storage)
    }, []); 

    return (
        <div className=''>
            TEST
            { storages.map(sto =>
                <div>
                    { sto.row }
                </div>
                    )}
        </div>
    )
} */

/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function updateItem(props) {

    const { userJwt } = props
    if (userJwt != null) {
        var decoded = jwt_decode(userJwt);
    }
    const [row1, setRow1] = useState('');
    const [floor, setFloor] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, [])

    const getItems = async () => {
        console.warn(params)
        let res = await fetch(`https://warehouse1.herokuapp.com/warehouse/${params.idCompany}`);
        res = await res.json();
        console.warn(res);
        setRow1(res.row1);
        setFloor(res.floor);
        setPlace(res.place);
        setDescription(res.description);
    }
    const updateItem = async () => {
        console.warn(row1, floor, place, description)
        let res = await fetch(`https://warehouse1.herokuapp.com/warehouse/${params.idCompany}`, {
            method: 'Put',
            body: JSON.stringify({ row1, floor, place, description }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        res = await res.json()
        console.warn(res)
        if (res) {
            navigate('/WarehouseView')
        }

    }


    return (
        <div className="addSlot">
            <h1>Edit Itemslot</h1>

            <input type="text" value={row1} placeholder='Row' className="addItemBox"
                onChange={(e) => { setRow1(e.target.value) }} />

            <input type="text" value={floor} placeholder='Floor' className="addItemBox"
                onChange={(e) => { setFloor(e.target.value) }} />

            <input type="text" value={place} placeholder='Place' className="addItemBox"
                onChange={(e) => { setPlace(e.target.value) }} />

            <input type="text" value={description} placeholder='Description' className="addItemBoxDesc"
                onChange={(e) => { setDescription(e.target.value) }} />

            <button onClick={updateItem} className='appButton' type="submit">Create new item slot</button>
           

        </div>
    )
}
export default AddSlot;
*/