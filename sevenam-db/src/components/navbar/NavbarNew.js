import React from "react";
import "./NavbarNew.css";
import Weather from "./Weather";

const NavbarNew = () => {
  const logo = require("./logo.png");

    return (
      <nav className="nav" id="navbar">
        <div className="nav_logo">
          <a href="/">
            <img src={logo} alt="SevenAM" height={"55"}/>
          </a>
        </div>
        <div className="weather">
          <Weather/>
        </div>
      </nav>
    )
}

export default NavbarNew;