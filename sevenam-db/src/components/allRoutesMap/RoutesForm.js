import React from 'react';
import { useState, useEffect} from "react";
import {StaticStops} from "./StaticStops"
import axios from 'axios';

const RoutesForm = () => {
  
  //get all data through API call
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/static_stops/")
    .then(response => setData(response.data))
    .catch(err => console.log(err));
  }, [])
  console.log("DATA IS:", data)

  //new a class instance from "StaticStops.js" class
  const staticstops = new StaticStops(data)

  //get route numbers list
  const route_numbers = staticstops.get_route_number()
  console.log("ROUTE NUMBERS :", route_numbers)

  //get corresponding route description
  const [route_descriptions, setRoute_descriptions] = useState([]);

  //handleSelectChange function
  function handleSelectChange(event) {
    let selected_route_number = event.target.value
    console.log("SELECTED NUMBER:", selected_route_number)
    setRoute_descriptions(staticstops.get_route_description(selected_route_number))
  }


  return (
    <div className="window-container">
      <label>Route numbers</label>
      <div className="route-input">
        <select style={{width:"200px"}} onChange={handleSelectChange}>
          {route_numbers.map(route_number => (
            <option value={route_number}>
              {route_number}
            </option>
          ))}
        </select>
      </div>

      <lable>Route descriptions</lable>
      <div className="route-input">
        <select style={{width:"200px"}}>
          {route_descriptions.map(route_description => (
            <option value={route_description}>
              {route_description}
            </option>
          ))}
        </select>
      </div>

      <div className="route-submit">
        {/* <button classNmae="" onClick={}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/ios-edge-line-6/25/Location-Arrow-Crcle-512.png"
            width="40"
            height="auto"
            alt="submit"
          />
        </button>
        <button class="btn btn-primary" onClick={}>
          Search
        </button> */}
      </div>

    </div>
  );  //return bracket
}; // render bracket
// export calss bracket

export default RoutesForm;