import React from "react";
import "./NavbarNew.css";
import Weather from "./Weather";


const NavbarNew = () => {
 

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