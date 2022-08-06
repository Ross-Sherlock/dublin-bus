import React, {useState} from "react";
import "./Weather.css";
import Axios from "axios";
import { WiDaySunny, WiDayCloudy, WiCloudy, WiCloud , WiHail, WiDayRainMix, WiDayStormShowers, WiDaySnowWind, WiFog} from "react-icons/wi";


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


      const [showWeather, setShowweather] = useState(false);
    
      const handleOn = () => {
        setShowweather(true);
       
        setTimeout(() => {
          setShowweather(false);
        }, 20000); 
        };
      
  
        const handleOff = () => {
          setShowweather(false);
        };     

      

let icon = `http://openweathermap.org/img/wn/${weatherData.icon}.png`; 

if (ready) {
  return (
    <div className="weather-card">
      <div className="weather-icon"> 
      <img src={icon} onClick={handleOn} />
      </div>
     

      {showWeather && (
      <div className="weather-text" /*onClick={handleOff} */>
        <h3>{Math.round(weatherData.temparature)+ "℃"}</h3>
        <p>{weatherData.description}</p>
       
      </div> 
 )}
    </div>
  );
  } else {

    let apiUrl = "http://127.0.0.1:8000/weather/"
    Axios.get(apiUrl).then(handleResponse);

    return "Loading..."
  }

};

export default Weather;
