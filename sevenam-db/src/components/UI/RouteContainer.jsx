import { React } from "react";
import { AccordionDetails } from "@mui/material";
import { FaBus, FaWalking } from "react-icons/fa";
import { IconContext } from "react-icons";
import RouteSummary from "./RouteSummary";
import "./RouteContainer.css";
import { Fragment } from "react";

const RouteContainer = (props) => {
  const response = props.response;

  return (
    <div className="route-container">
      {response && (
        <div className="route-container">
          {response.routes.map((route, i) => (
            <Fragment>
              <RouteSummary route={route}></RouteSummary>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteContainer;
