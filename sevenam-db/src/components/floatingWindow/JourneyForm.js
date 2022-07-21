import React from 'react';
import "./JourneyForm.css";
import Card from "../UI/Card";
import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const JourneyForm = (props) => {
  const calcRoute = props.calcRoute;
  const clearRoute = props.clearRoute;
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;

  const [enteredDate, setEnteredDate] = useState("");
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const map = props.map;
  // const setMap = props.setMap;
  const centre = props.centre;

  const submitRecentre = () => {
    map.panTo(centre);
  };

  return (
      <div className="window-container">
        <div className="journey-input">
          <label>From</label>
          <Autocomplete
            options={{
              componentRestrictions: { country: "ie" },
            }}
          >
            <input
              type="text"
              ref={originRef}
            />
          </Autocomplete>
        </div>
        <div className="journey-input">
          <label>To</label>
          <Autocomplete
            options={{
              componentRestrictions: { country: "ie" },
            }}
          >
            <input
              type="text"
              ref={destinationRef}
            />
          </Autocomplete>
        </div>
        <div className="journey-input">
          <label>Date</label>
          <input type="date"/>
        </div>
        <div className="journey-submit">
          <button className="recentre" onClick={submitRecentre}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/ios-edge-line-6/25/Location-Arrow-Crcle-512.png"
              width="40"
              height="auto"
              alt="submit"
            />
          </button>
          <button class="btn btn-primary" onClick={calcRoute}>
            Search
          </button>
          <button class="btn btn-secondary" onClick={clearRoute}>
            Cancel
          </button>
        </div>
        <div id="direction-steps"></div>
      </div>
  );
};

export default JourneyForm;
