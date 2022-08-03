import { React } from "react";
import { Accordion, AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { FaBus, FaWalking } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./RouteSummary.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";

const RouteSummary = (props) => {
  const route = props.route;
  const steps = route.legs[0].steps;
  const index = props.index;
  const setRouteIndex = props.setRouteIndex;
  const expanded = props.expanded;
  const setExpanded = props.setExpanded;

  const icons = steps.map(function (item, index, array) {
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

  const time = route.legs[0].duration.text;

  const setRoute = () => {
    setRouteIndex(index);
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const expandedBool = () => {
    if (expanded == index) {
      return true;
    } else {
      return false;
    }
  };

  const iconSelect = (step) => {
    if (step.travel_mode == "WALKING") return <FaWalking />;
    else if(step.travel_mode == "TRANSIT") {
      return (
        <span>
          <FaBus />
          <span className="bus-number-box">{step.transit.line.short_name}</span>
        </span>
      );
    }
  };

  let stepsMap = steps.map((step) => [
    <div className="step-container">
      <span className="step-icon">{iconSelect(step)}</span>
      <span className="step-instruct">{step.instructions}</span>
      <span className="step-dur">{step.duration.text}</span>
    </div>,
  ]);

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
        {route && (
          <span className="icon-container">
            <span className="icons">{icons}</span>
            <span className="time">
              <text>{time}</text>
            </span>
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <span>{stepsMap}</span>
      </AccordionDetails>
    </Accordion>
  );
};
export default RouteSummary;