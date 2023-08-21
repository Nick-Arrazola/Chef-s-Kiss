import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from "react-router-dom";
// import UserAuth from './context/user-authentication';
// import ModalContext from './context/modals';
// import Projects from './context/protfolio-data';
// import LoginPortal from "./components/login-portal"
import NavBar from "./components/navbar";
// import Modals from './components/modals';
// import Footer from "./components/footer";
import './App.css';

function App() {

  return (
    <div className="App">
        <NavBar />
        <div className="page-content">
          <Outlet />
        </div>
        {/* <Footer/> */}
    </div>
  );
}

export default App;