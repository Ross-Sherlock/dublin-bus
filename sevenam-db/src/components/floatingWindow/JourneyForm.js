import "./JourneyForm.css";
import Card from "../UI/Card";
import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";


const JourneyForm = (props) => {
  const [enteredStart, setEnteredStart] = useState("");
  const startChangeHandler = (event) => {
    setEnteredStart(event.target.value);
  };

  const [enteredDest, setEnteredDest] = useState("");
  const destChangeHandler = (event) => {
    setEnteredDest(event.target.value);
  };

  const [enteredDate, setEnteredDate] = useState("");
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

  const journeyData = {
    start: enteredStart,
    dest: enteredDest,
    date: new Date(enteredDate)
  }

  props.onSubmitJourneyData(journeyData);
  setEnteredStart("");
  setEnteredDest("");
  setEnteredDate("");

  };

  const map = props.map;
  const setMap = props.setMap;
  const centre = props.centre;

  const submitRecentre = () => {
    map.panTo(centre);
  }



  return (
    <form onSubmit={submitHandler}>
      <div className="window-container">
        <div className="journey-input">
          <label>From</label>
          <Autocomplete>
          <input
            type="text"
            value={enteredStart}
            onChange={startChangeHandler}
          />
          </Autocomplete>
        </div>
        <div className="journey-input">
          <label>To</label>
          <Autocomplete>
          <input type="text" value={enteredDest} onChange={destChangeHandler} />
          </Autocomplete>
        </div>
        <div className="journey-input">
          <label>Date</label>
          <input type="date" onChange={dateChangeHandler} value={enteredDate} />
        </div>
        <div className="journey-submit">
        <button className='recentre' onClick={submitRecentre}><img src="https://cdn1.iconfinder.com/data/icons/ios-edge-line-6/25/Location-Arrow-Crcle-512.png" width="40" height="auto" alt="submit" /></button>
          <button type="submit" class="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
};

export default JourneyForm;
