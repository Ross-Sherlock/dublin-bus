import React, { useState } from "react";
import "./About.css";
import estelle from "../About/estelle.png";
import ross from "../About/ross.png";
import yuan from "../About/yuan.png";
import zeyu from "../About/zeyu.png";

const  generalInfo = [ 
    {name: "Estelle", 
        github: "https://github.com/Estellerl",
        email: "estelle.reeveslong@ucdconnect.ie",
        linkin: "https://ie.linkedin.com/",
        role: "Coordinator",
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
    github: "https://github.com/",
    email: "yuan.cheng@ucdconnect.ie",
    linkin: "https://ie.linkedin.com/in/yuan-cheng-496358230",
    role: "Maintenance Lead",
    img: yuan,
    }
,
    {name: "Zeyu", 
    github: "https://github.com/",
    email: "zeyu.bai",
    linkin: "https://ie.linkedin.com/in/zeyu-bai-966bb1175?trk=public_profile_browsemap",
    role: "Customer Lead",
    img: zeyu,
    }




    ]



  
  const About = () => {

const PersonInfo = generalInfo.map (info => 
    (

  <div>      
<div className="image">
<img src={info.img} alt={info.name} width={"100px"} height={"100px"} />
<span>{info.name}</span>
</div>
        <ul>
        <li>
           <b>Role:</b>  {info.role}
        </li>
        <li> <b>Email:</b> {info.email} </li>
        <li>
            <a href={info.github} target={"blank"}> GitHub </a>
        </li>
        <li>
            <a href={info.linkin} target={"blank"}> Linked In </a> 
        </li>

    </ul>     
    </div>
    ))

  
   /*
    const [showInfo, setShowinfo] = useState(false);
    
    const handleShowOn = () => {
        setShowinfo(true);
      };
    
      const handleShowOff = () => {
        setShowinfo(false);
      };

{showInfo && (
          <ul>
              <li>
                 <b>Role:</b>  Coordinator 
              </li>
              <li> <b>Email:</b> estelle.reeveslong@ucdconnect.ie</li>
              <li>
                  <a href="https://github.com/Estellerl" target={"blank"}> GitHub </a>
              </li>
              <li>
                  <a href="https://ie.linkedin.com/" target={"blank"}> Linked In </a> 
              </li>

          </ul>
        )}


    */
        
    
    return (
      <div className="mainAbout">

<div className="intoduction">
<h1> Hello World </h1>
<p>
    Meet 7am 
    </p> 
</div>

<img source={''}/>

<div className="personalInfo"> 
{PersonInfo}
</div>




</div>
) 





  };
  
  export default About;

