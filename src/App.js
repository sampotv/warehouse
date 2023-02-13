import './App.css';
import Login from './components/Login';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';
import TopBar from './components/TopBar';
import CreateUser from './components/CreateUser';
import WarehouseView from './components/WarehouseView';
import Choose from './components/Choose';
import EditItem from './components/EditItem';
import EditInfo from './components/EditInfo';
import AddSlot from './components/AddSlot';

const jwtFromStorage = window.localStorage.getItem('appAuthData');

function App() {

  const [ userJwt, setUserJwt ] = useState(jwtFromStorage);

  /*
  let authRoutes = <>
  <Route path="/login" element = { <Login login={(token) => {
        window.localStorage.setItem('appAuthData', token);
        setUserJwt(token);
      }} /> } />                 
  </>
*/


  return (
    <div className="App">
      <div>Authentication status: { userJwt != null ? "Logged in" : "Not logged in" } </div>
     <BrowserRouter>
        <TopBar />
          <Routes>
            <Route path="/login" element = { <Login setUserJwt={ setUserJwt } />} />
            <Route path="/" element = { <Frontpage/> } />
            <Route path="/CreateUser" element = {<CreateUser userJwt={ userJwt } />} />      
            <Route path="/WarehouseView" element = { <WarehouseView userJwt={ userJwt } />} />
            <Route path="/addslot/:companyId" element={<AddSlot userJwt={ userJwt } /> }/>
            <Route path="/Choose" element={<Choose userJwt={ userJwt} /> } />
            <Route path="/edititem/:idItem" element={<EditItem userJwt={ userJwt } /> } />
            <Route path="/editinfo" element = { <EditInfo userJwt={ userJwt } /> } />
          </Routes>
      
          
    </BrowserRouter>
    </div>
  );
}

export default App;
