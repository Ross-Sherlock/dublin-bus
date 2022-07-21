import React, { useState } from "react";
import Map from "./map/Map";

function HomePage() {

    const submitJourneyDataHandler = (enteredJourneyData) => {
        console.log(enteredJourneyData);
      };
    
      const centre = { lat: 53.343, lng: -6.256 };
 
  return (
    <div className="map-form-container">
      <Map/>
    </div>
  );
}

export default HomePage;
