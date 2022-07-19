import "./App.css";
import "./components/navbar/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MobileApp from "./components/MobileApp";
import HomePage from "./components/HomePage";
import AllRoutes from "./components/AllRoutes";
import News from "./components/News";

function App() {
 return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path ="/MobileApp" element={<MobileApp />}/>
        <Route path="/AllRoutes" element={<AllRoutes/>}/>
        <Route path="/News" element={<News/>}/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;


