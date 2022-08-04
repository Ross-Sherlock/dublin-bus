import React, {useState} from "react";
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
        <h3>{Math.round(weatherData.temparature)+ "℃"}</h3>
        <p>{weatherData.description}</p>
      </div>
    </div>
  );
  } else {
    const url = process.env.REACT_APP_DJANGO_API;
    let apiUrl = url+"/weather/";
    Axios.get(apiUrl).then(handleResponse);

    return "Loading..."
  }

};

export default Weather;
