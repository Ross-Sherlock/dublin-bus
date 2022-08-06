import React from "react";
import "./NavbarNew.css";
import Weather from "./Weather";
import Icon from "./icon";

const NavbarNew = () => {
  const logo = require("./logo.png");

    return (
      <nav className="nav" id="navbar">
       <div className= "sevenAm"> 
        <h1> SevenAm </h1>
        </div>
        <div className="weather">
          <Weather/>
        </div>
      </nav>
    )
}

export default NavbarNew;