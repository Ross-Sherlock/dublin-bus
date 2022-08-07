import React, { useState } from "react";
import "./info.css";
import link from "../About/link.png";
import github from "../About/github.png";


const Info = (props) => {

  /*  const [showInfo, setShowinfo] = useState(false);
    
    const handleShowOn = () => {
        setShowinfo(true);
      };
    

      const handleShowOff = () => {
        setShowinfo(false);
      }; */
    

return (
    <div className="mainContainer">
<div className="mainInfo"> 

<img className= "personalImage" src={props.photo} width={"150px"} height={"150px"}/> 


<ul className="text"> 
    <li className="name"> 
        {props.name}
    </li>
    <li className="title">
    {props.title}
    </li>
 {/* 
<button className="contact-btn" onMouseOver={handleShowOn} onClick={handleShowOff}>
    Contact Information
 </button> 
 
 </ul>


<div className="mobileApp"> 
<div className="mobileImage">  <img src={props.photo} width={"100px"} height={"100px"}/> </div>
<ul>
*/
}
<li className="email">
           {props.email}
    </li>
        
    <li className="links">
        <a href={props.link} target="_blank"> <img src={link} width="10%" height={"10%"} /></a>
        <a href={props.github} target="_blank"> <img src={github} width="10%" height={"10%"} /></a>
    </li>
 

          </ul>





{/*
{showInfo && (
        
         <ul className="hiddenforMobile">
           <li className="email">
           {props.email}
    </li>
    <li>
        <a href={props.link} target="_blank"> <img src={link} width="15%" height={"15%"} /></a>
        <a href={props.github} target="_blank"> <img src={github} width="15%" height={"15%"} /></a>
    </li>

          </ul>

)} */}

</div>
</div>

);

}

export default Info;
