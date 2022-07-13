import React, { useState } from "react";
import AllRoutesMap from "./allRoutesMap/AllRoutesMap";
import Navbar from "./navbar/Navbar"; 

function AllRoutes() {
      const centre = { lat: 53.343, lng: -6.256 };
 
  return (
      <div>
    <Navbar />
    <div className="map-form-container">
      <AllRoutesMap/>
    </div>
  </div>
  );
}

export default AllRoutes;
