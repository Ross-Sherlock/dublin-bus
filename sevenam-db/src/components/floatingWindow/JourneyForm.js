import React from "react";
import "./JourneyForm.css";
import { Autocomplete } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const JourneyForm = (props) => {
  const calcRoute = props.calcRoute;
  const clearRoute = props.clearRoute;
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;
  const date = props.date;
  const setDate = props.setDate;

  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // };
  const map = props.map;
  // const setMap = props.setMap;
  const centre = props.centre;

  const submitRecentre = () => {
    map.panTo(centre);
  };

  return (
    <div className="window-container">
      <div className="journey-input">
      <Typography variant="h6" gutterBottom component="div">From</Typography>
        <Autocomplete
          options={{
            componentRestrictions: { country: "ie" },
          }}
        >
          <input className="origin-input" type="text" ref={originRef} />
        </Autocomplete>
      </div>

      <div className="journey-input">
        <Typography variant="h6" gutterBottom component="div">To</Typography>
        <Autocomplete
          options={{
            componentRestrictions: { country: "ie" },
          }}
        >
          <input className="des-input" type="text" ref={destinationRef} />
        </Autocomplete>
      </div>
        {/* <label>Date</label> */}
        {/* <input type="datetime-local" value={new Date().getDate()} /> */}
      <div className="date-selector">
        <Typography variant="h6" gutterBottom component="div">Time</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Departure Time"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              console.log(date)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="journey-submit">
        <Button className="journey-search" variant="contained" color="secondary" onClick={calcRoute}>Search</Button>
        <Button className="Journey-cancel" variant="contained" color="error" onClick={clearRoute}>Clear</Button>
        <Button className="Journey-save" variant="contained" color="success">Favourite</Button>
      </div>
      <div id="direction-steps"></div>
    </div>
  );
};

export default JourneyForm;