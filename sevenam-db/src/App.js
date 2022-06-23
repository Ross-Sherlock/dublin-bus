import "./App.css";
import "./components/navbar/Navbar";
import Navbar from "./components/navbar/Navbar";
import React, { useState } from "react";
import JourneyForm from "./components/floatingWindow/JourneyForm";
import ReactDOM from "react-dom";
import Map from "./components/map/Map";

function App() {
  const submitJourneyDataHandler = (enteredJourneyData) => {
    console.log(enteredJourneyData);
  };

  const centre = { lat: 53.343, lng: -6.256 };

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const submitRecentre = () => {
    map.panTo(centre);
  }

  return (
    <div className="App">
      <Navbar />
      <div className="map-form-container">
        <Map map={map} setMap={setMap}></Map>
      </div>
    </div>
  );
}

export default App;
