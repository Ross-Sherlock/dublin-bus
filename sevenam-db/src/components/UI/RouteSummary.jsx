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



  return (
    <Accordion disableGutters={true}>
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
    </Accordion>
  );
};
export default RouteSummary;
