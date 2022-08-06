import "./App.css";
import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JourneyPlanner from "./components/JourneyPlanner";
import HomePage from "./components/HomePage";
import AllRoutes from "./components/AllRoutes";
import News from "./components/News";
import Sidebar from "./components/sidebar/Sidebar";
import NavbarNew from "./components/navbar/NavbarNew";
import About from "./components/About/About";
import Map from "./components/map/Map";

function App() {
  const [journeyPlan, setJourneyPlan] = useState(true);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [markers, setMarkers] = useState([]);

  return (
    <div className="App">
      <Router>
        <NavbarNew />
        <Sidebar
          setJourneyPlan={setJourneyPlan}
          setMap={setMap}
          setDirectionsResponse={setDirectionsResponse}
          setMarkers={setMarkers}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/JourneyPlanner"
              element={
                <Map
                  journeyPlan={journeyPlan}
                  map={map}
                  setMap={setMap}
                  setDirectionsResponse={setDirectionsResponse}
                  directionsResponse={directionsResponse}
                  setMarkers={setMarkers}
                  markers ={markers}
                />
              }
            />
            <Route path="/AllRoutes" element={<AllRoutes />} />
            <Route path="/News" element={<News />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
