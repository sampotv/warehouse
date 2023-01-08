import React from 'react';
import { Link } from 'react-router-dom'

export default function TopBar() {

   
    function logout(){
        window.location.reload()
    }
    return (
        <div className='topBar'>
            <div className=''>
                <div className=''>Warehouse Maintenance Tool</div>
                <div className='topBarFlex'>                
                <div className='topBarElements'><Link to = "/">Frontpage</Link></div>
                <div className='topBarElements'><Link to ="/choose">Edit</Link></div>
                <div className='topBarElements'><Link to ="/WarehouseView">Warehouse view</Link></div>
                <div className='topBarElements'><Link onClick={logout} to ="/">Logout</Link></div>
                </div>
            </div>
        </div>
        
    )
}