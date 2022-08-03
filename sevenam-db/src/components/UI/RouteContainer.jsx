import React, { useState } from "react";
import { AccordionDetails } from "@mui/material";
import { FaBus, FaWalking } from "react-icons/fa";
import { IconContext } from "react-icons";
import RouteSummary from "./RouteSummary";
import "./RouteContainer.css";
import { Fragment } from "react";

const RouteContainer = (props) => {
  const response = props.response;
  const setRouteIndex = props.setRouteIndex;
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="route-container">
      {response && (
        <div className="route-container">
          {response.routes.map((route, i) => (
            <Fragment>
              <RouteSummary
                route={route}
                index={i}
                setRouteIndex={setRouteIndex}
                expanded = {expanded}
                setExpanded={setExpanded}
              ></RouteSummary>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteContainer;
