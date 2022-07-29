import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JourneyPlanner from "./components/JourneyPlanner";
import HomePage from "./components/HomePage";
import AllRoutes from "./components/AllRoutes";
import News from "./components/News";
import Sidebar from "./components/sidebar/Sidebar";
import NavbarNew from "./components/navbar/NavbarNew";

function App() {
 return (
    <div className="App">
     <Router>
       <NavbarNew/>
         <Sidebar>
           <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/JourneyPlanner" element={<JourneyPlanner />} />
             <Route path="/AllRoutes" element={<AllRoutes />} />
             <Route path="/News" element={<News />} />
           </Routes>
         </Sidebar>
    </Router>

    </div>
  );
}

export default App;