import React, {useState} from 'react';
import "./MobileApp.css";
import Map  from './map/Map';
import Weather from "./navbar/Weather";


function MobileApp() {
 const [showMenu, setShowMenu] = React.useState(false)
 const [showWeather, setShowweather] = React.useState(false)

 if (showMenu){
   return (
    <div className="mobileNav">
    <ul>
      <li>
       <a> Journey Planner</a>
      </li>
      <li>
       <a> Main</a>
      </li>
      <li>
       <a> Bus Map</a>
      </li>
    </ul>
         </div>
   )
 }

if (showWeather){
  return (
    <Weather/> 
  )
}



  return (
    <div className="MobileApp">
      <div className="container">
    <div className='header'>  
     <button onClick={() => {setShowMenu(true)}}>
    SevenAm
     </button>
     <div className='weather'> 
     <a onClick={() => {setShowweather(true)}}><img src="https://windy.app//storage/posts/November2021/01-sunny-at-daytime-weather-symbol-windyapp1.jpg" width="25" height="25"/></a>
     </div>
</div>


      <div className="map-form-container">
<Map />
    </div> 

    
    
    </div>
    </div>
  );
}

export default MobileApp;
