import React, { useState} from "react";
import "./JourneyForm.css";
import { Autocomplete } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Favourite from "./Favourite";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoHeartSharp } from "react-icons/io5";


const JourneyForm = (props) => {
  const api_url = process.env.REACT_APP_DJANGO_API;
  const calcRoute = props.calcRoute;
  const clearRoute = props.clearRoute;
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;
  const date = props.date;
  const setDate = props.setDate;
  const month = props.month;
  const day = props.day;
  const hour = props.hour;
  const start_lat = props.start_lat;
  const start_lng = props.start_lng;
  const end_lat = props.end_lat;
  const end_lng = props.end_lng;
  const route_number = props.route_number;
  const start_stopid = props.start_stopid;
  const end_stopid = props.end_stopid;
  const n_stops = props.n_stops;
  const response = props.response;

  let favouritesObj = [];
  if (localStorage.getItem("favourites") != null) {
    favouritesObj = JSON.parse(localStorage.getItem("favourites"));
  }
  const [fav, setFav] = useState(favouritesObj);

  function setSearch(org, dst) {
    originRef.current.value = org;
    destinationRef.current.value = dst;
  }

  function favRoute() {
    let dest = response.request.destination.query;
    let origin = response.request.origin.query;
    let insert = { origin: origin, dest: dest };
    if (duplicateCheck(insert)) {
      favouritesObj.push(insert);
      localStorage.setItem("favourites", JSON.stringify(favouritesObj));
      setFav(favouritesObj);
    } else {
    }
  }

  function duplicateCheck(insert) {
    for (const element of favouritesObj) {
      if (JSON.stringify(insert) == JSON.stringify(element)) {
        return false;
      }
    }
    return true;
  }

  function dynamicFavourites() {
    const arr = [];
    if (favouritesObj.length > 0) {
      for (const [index, element] of favouritesObj.entries()) {
        arr.push(
          <Favourite
            key={element.origin + element.dest}
            index={index}
            origin={element.origin}
            dest={element.dest}
            setFav={setFav}
            // originRef={originRef}
            // destRef={destinationRef}
            setSearch={setSearch}
          ></Favourite>
        );
      }
      return arr;
    }
  }

  let jsxFavourites = dynamicFavourites();

  return (
    <div className="window-container" id="window">
      <div className="journey-input">
        <Typography variant="h6" gutterBottom component="div">
          From
        </Typography>
        <Autocomplete
          onPlaceChanged={() => console.log()}
          options={{
            componentRestrictions: { country: "ie" },
          }}
        >
          <input className="origin-input" type="text" ref={originRef} />
        </Autocomplete>
      </div>

      <div className="journey-input">
        <Typography variant="h6" gutterBottom component="div">
          To
        </Typography>
        <Autocomplete
          label="Departure Time"
          options={{
            componentRestrictions: { country: "ie" },
          }}
        >
          <input className="des-input" type="text" ref={destinationRef} />
        </Autocomplete>
      </div>
      <div className="date-selector">
        <Typography variant="h6" gutterBottom component="div">
          Time
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Departure Time"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="journey-submit">
        <Button
          className="journey-search"
          variant="contained"
          color="secondary"
          onClick={calcRoute}
          style={{backgroundColor:"#388697"}}
        >
          Search
        </Button>
        <Button
          className="Journey-cancel"
          variant="contained"
          color="error"
          onClick={clearRoute}
          style={{backgroundColor:"#FA8334"}}
          
          
        >
          Clear
        </Button>
        <Button
          className="Journey-save"
          variant="contained"
          color="success"
          onClick={favRoute}
          style={{backgroundColor:"#FFE882"}}

          
        >
  <IoHeartSharp />

        </Button>
      </div>
      <div className="favourites">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          ><Typography>Favourites</Typography></AccordionSummary>
          <div>{jsxFavourites}</div>
        </Accordion>
      </div>
      <div id="direction-steps"></div>
    </div>
  );
};

export default JourneyForm;