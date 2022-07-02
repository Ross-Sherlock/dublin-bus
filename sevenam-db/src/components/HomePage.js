import React, { useState } from "react";
import Map from "./map/Map";
import Navbar from "./navbar/Navbar"; 




function HomePage() {

    const submitJourneyDataHandler = (enteredJourneyData) => {
        console.log(enteredJourneyData);
      };
    
      const centre = { lat: 53.343, lng: -6.256 };
 
  return (
      <div>
    <Navbar />
    <div className="map-form-container">
      <Map/>
    </div>
  </div>
  );
}

export default HomePage;
