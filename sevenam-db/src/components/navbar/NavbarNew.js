import React from "react";
import "./NavbarNew.css";
import Weather from "./Weather";
import { Link } from "react-router-dom";


const NavbarNew = () => {


    return (
      <nav className="nav" id="navbar">
       <div className= "sevenAm"> 
         <Link class="site-title" to='/' style={{color:"#271033", textDecoration: 'none'}}>SevenAm</Link>
        </div>
        <div className="weather">
          <Weather/>
        </div>
      </nav>
    )
}

export default NavbarNew;