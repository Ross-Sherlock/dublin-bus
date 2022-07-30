import React, { useState } from "react";




  
  const About = () => {
    const  generalInfo = [ 
        
        {name: "Estelle", 
        github: <a>hello</a> ,
        email: "estelle.reeveslong@ucdconnect.ie" },

        {name: "Zeyu", 
        github: <a> hello</a> ,
        email: "Zeyu.bai@ucdconnect.ie" },

        {name: "Yuan", 
        github: <a> hello</a> ,
        email: "Yuan.cheung@ucdconnect.ie" },

        {name: "Ross", 
        github: <a> hello</a> ,
        email: "Ross.sherlock@ucdconnect.ie" },
    ]

    const personalInfo = generalInfo.map(info => <h2> Name: {info.name} , github profile {info.github} and my email is {info.email}
    </h2>) 
       

    return (
      <div className="mainAbout">

{personalInfo}


      </div>
    );
  };
  
  export default About;

