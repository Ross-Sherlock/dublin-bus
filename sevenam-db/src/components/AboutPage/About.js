import React from "react";
import "./About.css";
import estelle from "../Images/estelle.png";
import ross from "../Images/ross.png";
import yuan from "../Images/yuan.png";
import zeyu from "../Images/zeyu.png";
import Info from "./info";


const  generalInfo = [ 
    {name: "Estelle", 
        github: "https://github.com/Estellerl",
        email: "estelle.reeveslong@ucdconnect.ie",
        linkin: "https://ie.linkedin.com/",
        role: "Coordinator Lead",
        img: estelle,
    }


    ,
    {name: "Ross", 
    github: "https://github.com/Ross-Sherlock",
    email: "ross.sherlock@ucdconnect.ie",
    linkin: "https://ie.linkedin.com/in/ross-s-2402a3191?trk=public_profile_browsemap",
    role: "Code Lead",
    img: ross,
    }
,
    {name: "Yuan", 
    github: "https://github.com/21201607",
    email: "yuan.cheng@ucdconnect.ie",
    linkin: "https://ie.linkedin.com/in/yuan-cheng-496358230",
    role: "Maintenance Lead",
    img: yuan,
    }
,
    {name: "Zeyu", 
    github: "https://github.com/ClarenceWhite",
    email: "zeyu.bai@ucdconnect.ie",
    linkin: "https://ie.linkedin.com/in/zeyu-bai-966bb1175?trk=public_profile_browsemap",
    role: "Customer Lead",
    img: zeyu,
    }


    ]



  

const About = () => {        
  
    const PersonInfo = generalInfo.map (info => 
        (
    
      <div className="info">    
    < Info name={info.name}  title={info.role} email={info.email} link={info.linkin} github={info.github} photo={info.img}/>    
        </div>
        ))   






return (

<div className="mainAbout">

<div className="intoduction">
<h1> Meet SevenAM </h1>
 <p className="description"> We are a group of <a href="https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=PROG&MAJR=T195" target="_blank">UCD Computer Science Masters Students </a> 
 who have created a Dublin Bus web application. This application allows users 
 to plan and organise a journey at any time and date and will give the user an approximate time estimation of the journey </p>
</div>

<div className="info"> 
{PersonInfo}
</div>

</div>


) ;



  }
 
  
  export default About;






