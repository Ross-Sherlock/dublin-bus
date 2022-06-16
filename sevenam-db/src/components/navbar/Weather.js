import Card from "../UI/Card";
import "./Weather.css";

const Weather = () => {
  // Temporary variables until we connect with back end
  let temp = 20;
  let desc = "Cloudy";
  let icon = "http://openweathermap.org/img/wn/10d@2x.png";
  return (
    <div className="weather-card">
      <div className="weather-icon">
        <img src={icon}/>
      </div>
      <div className="weather-text">
        <h1>{temp + "°"}</h1>
        <p1>{desc}</p1>
      </div>
    </div>
  );
};

export default Weather;
