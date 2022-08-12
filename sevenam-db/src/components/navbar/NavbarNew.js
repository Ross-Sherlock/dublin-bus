import React from "react";
import "./NavbarNew.css";
import Weather from "./Weather";
import {withRouter} from 'react-router-dom';
import { NavLink,Link } from "react-router-dom";


const NavbarNew = () => {


    return (
      <nav className="nav" id="navbar">
       <div className= "sevenAm"> 
         <Link className="site-title" to='/'>SevenAm</Link>
        </div>
        <div className="weather">
          <Weather/>
        </div>
      </nav>
    )
}

export default NavbarNew;