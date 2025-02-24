import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
// import UserAuth from './context/user-authentication';
// import ModalContext from './context/modals';
// import Projects from './context/protfolio-data';
// import LoginPortal from "./components/login-portal"
import NavBar from "./components/navbar";
// import Modals from './components/modals';
// import Footer from "./components/footer";
import './App.css';
import { UserProvider } from "./UserContext";

function App() {
  // "useLocation() is used to get information on which route the user currently is in"
  const location = useLocation();
  // Making a condition to see if user is in '/', which is the default route "index.js/intro.
  // If user is in Intro page, then "hideNavBar" is set to true"
  const hideNavBar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    // Wrapping "Navbar" and "App"s children (i.e outlet) inside "UserProvider" to make user data is accessible globally
    <div className="App">
        {/*The NavBar component is only rendered on the webpage IF and ONLY IF "hideNavBar" is false
        meaning if the user is not in the Intro page*/}
        {!hideNavBar && <NavBar/>} {/*This line will run only if both sides are true. <NavBar> is always true, so depends on "hideNavBar"*/}
        <div className="page-content">
            <Outlet />
          {/* The <Outlet> tag will render the child route components of the parent route, which in this case is this page's component, "<App>".
          "<App>" is defined as the root route in "src/index.js" */}
        </div>
        {/* <Footer/> */}
    </div>
  );
}

export default App;