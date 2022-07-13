import React, { useState } from 'react';
import "./Navbar.css";
import Weather from "./Weather";
import { Navigate } from "react-router-dom";


const Navbar = () => {
const [accessMobileApp, setaccessMobileApp] = React.useState(false)
if (accessMobileApp) {
  return <Navigate to="/MobileApp"/>;
}



  return (
    <nav className="nav">
      <div className="nav-title">
      <a href="/" id="nav-title-text">
        SevenAM
      </a>
      </div>
      <ul>
        <button onClick={() => {setaccessMobileApp(true)}}>
          Mobile Option
        </button>
        <li>
          <a href="/AllRoutes">All Routes</a>
        </li>
        <li>
          <a href="/placeholder">News</a>
        </li>
        <li>
        <a href="/about">About Us</a>
        </li>
      </ul>
      <Weather/>
    </nav>
  );
};

export default Navbar;
