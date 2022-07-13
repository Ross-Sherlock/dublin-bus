import "./App.css";
import "./components/navbar/Navbar";
import Navbar from "./components/navbar/Navbar";
import React, { useState } from "react";
import JourneyForm from "./components/floatingWindow/JourneyForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Map from "./components/map/Map";
import MobileApp from "./components/MobileApp";
import HomePage from "./components/HomePage";
import AllRoutes from "./components/AllRoutes";

function App() {
 return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path ="/MobileApp" element={<MobileApp />}/>
        <Route path="/AllRoutes" element={<AllRoutes/>}/>
      </Routes>
    </Router>

    </div>



  );
}

export default App;


