import React, { useState, useEffect, useRef } from "react";
import { Accordion, AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { FaBus, FaWalking } from "react-icons/fa";
import "./RouteSummary.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const RouteSummary = (props) => {
  const route = props.route;
  const [steps, setSteps] = useState(props.route.legs[0].steps);
  const [loading, setLoading] = useState(true);
  const index = props.index;
  const setRouteIndex = props.setRouteIndex;
  const expanded = props.expanded;
  const setExpanded = props.setExpanded;
  const month = props.month;
  const day = props.day;
  const hour = props.hour;
  let data;
  let time = 0;
  let transit_steps_predicted = [];
  let transit_steps = 0;
  let [stepsUpdated, setStepsUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    data = getStepData();
    setLoading(false)
    setSteps(steps)
  }, [steps, data]);

  let icons = steps.map(function (item, index, array) {
    let arrow = (
      <KeyboardArrowRightIcon className="arrow"></KeyboardArrowRightIcon>
    );

    if (array.length - 1 === index) {
      arrow = <></>;
    }

    if (item.travel_mode == "WALKING") {
      return (
        <span>
          <FaWalking className="route-icon" />
          {arrow}
        </span>
      );
    } else {
      return (
        <span>
          <FaBus className="route-icon" />
          <span className="bus-number-box">{item.transit.line.short_name}</span>
          {arrow}
        </span>
      );
    }
  });

  const setRoute = () => {
    setRouteIndex(index);
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  async function getPrediction(
    step,
    month,
    day,
    hour,
    start_lat,
    start_lng,
    end_lat,
    end_lng,
    route_number,
    n_stops,
    start_stopid,
    end_stopid
  ) {
    let url = `/predict/?month=${month}&day=${day}&hour=${hour}&start_lat=${start_lat}&start_lng=${start_lng}&end_lat=${end_lat}&end_lng=${end_lng}&route_number=${route_number}&n_stops=${n_stops}`;
    if (start_stopid !== null && typeof start_stopid !== "undefined") {
      url = `/predict/?month=${month}&day=${day}&hour=${hour}&start_lat=${start_lat}&start_lng=${start_lng}&end_lat=${end_lat}&end_lng=${end_lng}&route_number=${route_number}&start_stopid=${start_stopid}&n_stops=${n_stops}`;
    }
    if (end_stopid !== null && typeof end_stopid !== "undefined") {
      url = `/predict/?month=${month}&day=${day}&hour=${hour}&start_lat=${start_lat}&start_lng=${start_lng}&end_lat=${end_lat}&end_lng=${end_lng}&route_number=${route_number}&end_stopid=${end_stopid}&n_stops=${n_stops}`;
    }
    try {
      await axios.get(process.env.REACT_APP_API + url).then((response) => {
        // If new route, just return googles estimate
        if (response.data !== "ERR") {
          step.duration.value = response.data * 60;
          step.duration.text = response.data + " mins";
        }
      });
    } catch (error) {
      return "ERROR";
    }
    transit_steps_predicted.push(step)
    console.log("TRANSIT STEPS PREDICTED", transit_steps_predicted.length)
    console.log("TRANSIT STEPS", transit_steps)
    if (transit_steps_predicted.length == transit_steps) {
      setLoading(false);
      setStepsUpdated(steps);
    }
  }

  function check_stop_code(name) {
    if (name.includes(", stop ")) {
      let loc_index = name.indexOf(", stop ");
      loc_index = loc_index + 7;
      let code = name.slice(loc_index, name.length);
      return parseInt(code);
    } else {
      return null;
    }
  }

  async function getNewSteps() {
    for(const step of steps) {
      if (step.travel_mode === "TRANSIT") {
        transit_steps += 1;
      }
    }
    for (const [index, step] of steps.entries()) {
      if (step.travel_mode === "TRANSIT") {
        let transit = step.transit;
        let start_lat = transit.departure_stop.location.lat;
        let start_lng = transit.departure_stop.location.lng;
        let end_lat = transit.arrival_stop.location.lat;
        let end_lng = transit.arrival_stop.location.lng;
        let route_number = transit.line.short_name;
        let n_stops = transit.num_stops;
        let start_stopid = check_stop_code(transit.departure_stop.name);
        let end_stopid = check_stop_code(transit.arrival_stop.name);
        await getPrediction(
          step,
          month,
          day,
          hour,
          start_lat(),
          start_lng(),
          end_lat(),
          end_lng(),
          route_number,
          n_stops,
          start_stopid,
          end_stopid
        )[0];
      }
    }
  }

  async function getStepData() {
    const newSteps = await getNewSteps()
      .then(() => {
        setSteps(steps);
      })
      .catch((x) => {
        console.log(x);
      });
  }

  const expandedBool = () => {
    if (expanded == index) {
      return true;
    } else {
      return false;
    }
  };

  const iconSelect = (step) => {
    if (step == null) {
      return;
    }
    if (step.travel_mode == "WALKING") return <FaWalking />;
    else if (step.travel_mode == "TRANSIT") {
      let busTime = step.transit.departure_time.text;
      return (
        <span>
          <FaBus />
          <span className="bus-number-box">{step.transit.line.short_name}</span>
          <div className="busTime-div">{busTime}</div>
        </span>
      );
    }
  };

  let stepsMap;

  if (stepsUpdated !== null & !loading) {
    time = 0;
    // Update total trip duration
    for (const step of stepsUpdated) {
      time += Math.round(step.duration.value / 60);
    }
    stepsMap = stepsUpdated.map(function (step) {
      return [
        <div className="step-container">
          <span className="step-icon">{iconSelect(step)}</span>
          <span className="step-instruct">{step.instructions}</span>
          <span className="step-dur">{step.duration.text}</span>
        </div>,
      ];
    });
  }

  if(stepsUpdated === null) {
    time = <CircularProgress size="1.4rem"/>
  }

  return (
    <Accordion
      expanded={expandedBool()}
      disableGutters={true}
      onClick={setRoute}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          justifyContent: "center",
        }}
      >
        {route && steps && !loading && (
          <span className="icon-container">
            <span className="icons">{icons}</span>
            <span className="time">
              {!loading && <div>{time} mins</div>}
              {loading && (
                <div>
                  <CircularProgress size="1.4rem" />
                </div>
              )}
            </span>
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {loading && <span>Loading prediction</span>}
        {!loading && stepsMap && <span>{stepsMap}</span>}
      </AccordionDetails>
    </Accordion>
  );
};
export default RouteSummary;
