import React, {useState} from "react";
import "./Weather.css";
import Axios from "axios";
import { WiDaySunny, WiDayCloudy, WiCloudy, WiCloud , WiHail, WiDayRainMix, WiDayStormShowers, WiDaySnowWind, WiFog} from "react-icons/wi";
import Icon from "./Icon";

const Weather = () => {
  
  const [ready, setReady] = useState(false);  
  const [weatherData, setWeatherData] = useState({});
    function handleResponse(response){
        console.log(response.data);
        console.log(response.data[0].temp);
        console.log(response.data[0].main);
        console.log(response.data[0].description);
        console.log(response.data[0].icon)
        setReady(true);

        setWeatherData ({
          temparature: response.data[0].temp,
          icon: response.data[0].icon,
          description: response.data[0].description
        })
      } 

 
  let icon = weatherData.icon; 

if (ready) {
  return (
    <div className="weather-card">
      <div className="weather-icon"> 
        <Icon oldimg={icon} />
      </div>
      <div className="weather-text">
        <div className="temperature-container">{Math.round(weatherData.temparature)+ "°C"}</div>
        <div className="weather-desc">{weatherData.description}</div>

       
      </div> 
    </div>


  );
  } else {

    let apiUrl = "http://137.43.49.23:8000/weather/"
    Axios.get(apiUrl).then(handleResponse);

    return "Loading..."
  }

};

export default Weather;
