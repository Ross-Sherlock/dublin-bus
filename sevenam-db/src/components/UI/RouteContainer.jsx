import React, { useState } from "react";
/*
import { AccordionDetails } from "@mui/material";
import { FaBus, FaWalking } from "react-icons/fa";
import { IconContext } from "react-icons"; */
import RouteSummary from "./RouteSummary";
import "./RouteContainer.css";
import { Fragment } from "react";

const RouteContainer = (props) => {
  const response = props.response;
  const setRouteIndex = props.setRouteIndex;
  const [expanded, setExpanded] = useState(null);
  let month;
  let day;
  let hour;

  function getMDH(departure_time) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[departure_time.getMonth()];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[departure_time.getDay()];

    let hour = departure_time.getHours();
    return [month,day,hour]
  }

  if(response) {
  let departure_time = response.request.transitOptions.departureTime;
  let MDH = getMDH(departure_time); //get month day hour
  month = MDH[0]
  day = MDH[1]
  hour = MDH[2]
  }

  return (
    <div className="route-container">
      {response && (
        <div className="route-container">
          {response.routes.map((route, i) => (
            <Fragment key={i}>
              <RouteSummary key={route.overview_polyline}
                route={route}
                index={i}
                setRouteIndex={setRouteIndex}
                expanded = {expanded}
                setExpanded={setExpanded}
                month = {month}
                day = {day}
                hour = {hour}
              ></RouteSummary>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteContainer;
