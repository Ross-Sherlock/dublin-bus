import "./JourneyForm.css";
import Card from "../UI/Card";
import { useState } from "react";

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

  return (
    <form onSubmit={submitHandler}>
      <div className="window-container">
        <div className="journey-input">
          <label>From</label>
          <input
            type="text"
            value={enteredStart}
            onChange={startChangeHandler}
          />
        </div>
        <div className="journey-input">
          <label>To</label>
          <input type="text" value={enteredDest} onChange={destChangeHandler} />
        </div>
        <div className="journey-input">
          <label>Date</label>
          <input type="date" onChange={dateChangeHandler} value={enteredDate} />
        </div>
        <div className="journey__actions">
          <button type="submit">Search</button>
        </div>
      </div>
    </form>
  );
};

export default JourneyForm;
