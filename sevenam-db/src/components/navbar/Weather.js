import React, {useState} from "react";
import Card from "../UI/Card";
import "./Weather.css";
import Axios from "axios";


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


 
  
  let icon = `http://openweathermap.org/img/wn/${weatherData.icon}.png`;
    
  if (ready) {
  return (
    <div className="weather-card">
      <div className="weather-icon"> 
        <img src={icon}/>
      </div>
      <div className="weather-text">
        <h1>{Math.round(weatherData.temparature)+ "°"}</h1>
        <p>{weatherData.description}</p>
      </div>
    </div>
  );
  } else {
    let apiUrl = "http://127.0.0.1:8000/weather/"
    Axios.get(apiUrl).then(handleResponse);

    return "Loading..."
  }

};

export default Weather;
