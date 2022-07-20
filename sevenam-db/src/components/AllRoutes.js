import React, { useState } from "react";
import AllRoutesMap from "./allRoutesMap/AllRoutesMap";
import Navbar from "./navbar/Navbar"; 

function AllRoutes() {
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
