import React from "react";
import "./info.css";
import link from "../Images/link.png";
import github from "../Images/github.png";


const Info = (props) => {


return (
    <div className="mainContainer">
<div className="mainInfo"> 

<img className= "personalImage" src={props.photo} width={"140px"} height={"150px"}/> 


<ul className="text"> 
    <li className="name"> 
        {props.name}
    </li>
    <li className="title">
    {props.title}
    </li>

<li className="email">
           {props.email}
    </li>
        
    <li className="links">
        <a href={props.link} target="_blank"> <img src={link} width="10%" height={"10%"} /></a>
        <a href={props.github} target="_blank"> <img src={github} width="10%" height={"10%"} /></a>
    </li>
 

          </ul>



</div>
</div>

);

}

export default Info;
