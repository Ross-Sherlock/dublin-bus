import "./App.css";
import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Sidebar from "./components/sidebar/Sidebar";
import NavbarNew from "./components/navbar/NavbarNew";
import About from "./components/AboutPage/About";
import Map from "./components/map/Map";
import NewsTwitter from "./components/NewsPage/NewsTwitter";
import FavouritesPage from "./components/floatingWindow/FavouritesPage";

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
    
            <Route path="/News" element={<NewsTwitter/>} />
            <Route path="/Favourites" element={<FavouritesPage/>} />
            <Route path="/About" element={<About />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
