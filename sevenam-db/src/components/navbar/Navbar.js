import React, { useState } from "react";
import "./Navbar.css";
import Weather from "./Weather";
import { Navigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="nav" id="navbar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="nav-title">
        <a href="/" id="nav-title-text">
          SevenAM
        </a>
      </div>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <MenuIcon />
      </button>
      <div className={isNavExpanded ? "nav-menu.expanded" : "nav-menu"}>
        <ul>
          <li>
            <a href="/Allroutes">All Routes</a>
          </li>
          <li>
            <a href="/News">News</a>
          </li>
          <li>
            <a href="/About">About Us</a>
          </li>
          <div className="weather">
          <Weather />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
