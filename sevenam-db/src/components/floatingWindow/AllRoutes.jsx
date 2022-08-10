import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import { StaticStops } from "../map/StaticStops";
import axios from "axios";
import "./AllRoutes.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
/*import ToggleVisibility from "../UI/ToggleVisibility"; */

const AllRoutes = (props) => {
  const setMarkers = props.setMarkers;

  /*=====================Get marker list part=====================*/
  //get all data through API call
  const api_url = process.env.REACT_APP_DJANGO_API;
  const [staticStopData, setStaticStopData] = useState([]);
  useEffect(() => {
    axios
      .get(api_url + "/static_stops/")
      .then((response) => setStaticStopData(response.data))
      .catch((err) => console.log(err));
  }, []);
  console.log("DATA IS:", staticStopData);

  //new a class instance from "StaticStops.js" class
  const staticstops = new StaticStops(staticStopData);

  //get route numbers list
  let route_numbers = staticstops.get_route_number();
  route_numbers.splice(0, 0, "------Select------");
  console.log("ROUTE NUMBERS :", route_numbers);

  //get corresponding route description
  let [route_descriptions, setRoute_descriptions] = useState([]);

  //handleSelectChange1 function to get corresponding route description
  function handleSelectChange1(event) {
    let selected_route_number = event.target.value;
    console.log("SELECTED NUMBER:", selected_route_number);
    setRoute_descriptions(() => {
      let temp_route_description = staticstops.get_route_descriptions(
        selected_route_number
      );
      temp_route_description.splice(0, 0, "------Select------");
      return temp_route_description;
    });
    console.log("ROUTE DESCRIPTIONS:", route_descriptions);
  }

  //get corresponding stops list on the selected route
  const [stops_list, setStops_list] = useState([]);

  //handleSelectChange2 function to get corresponding stops list
  function handleSelectChange2(event) {
    let selected_route_description = event.target.value;
    console.log("SELECTED ROUTE DESCRIPTION:", selected_route_description);
    setStops_list(() => {
      let temp_stops_list = staticstops.get_stops_list(
        selected_route_description
      );
      return temp_stops_list;
    });
  }

  /*=====================Markers part=====================*/

  function handleSubmit() {
    console.log("button clicked...");
    let temp_markers = [];
    for (const stop in stops_list) {
      let temp_dict = {};
      temp_dict.name = stop;
      temp_dict.plate_code = parseInt(stops_list[stop].plate_code);
      temp_dict.route_data = stops_list[stop].route_data;
      temp_dict.stop_sequence = parseInt(stops_list[stop].stop_sequence);
      temp_dict.position = {
        lat: parseFloat(stops_list[stop].latitude),
        lng: parseFloat(stops_list[stop].longitude),
      };
      temp_markers.push(temp_dict);
    }
    console.log("TEMP_MARKERS", temp_markers);
    setMarkers(temp_markers);
  }

  return (
    <div className="side-panel">
      <div className="window-container" id="window">
        <div className="route_number_input">
          <Typography variant="h6" gutterBottom component="div">
            Select a bus number
          </Typography>
          <FormControl>
            <InputLabel id="select-helper-label">Route number</InputLabel>
            <Select
              defaultValue=""
              style={{ width: "270px", height: "40px" }}
              onChange={handleSelectChange1}
            >
              {route_numbers.map((route_number) => (
                <MenuItem
                  key={route_number}
                  value={route_number}
                  divider={true}
                >
                  {route_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="route_des_input">
          <Typography variant="h6" gutterBottom component="div">
            Select a route
          </Typography>
          <FormControl>
            <InputLabel id="select-helper-label">Route description</InputLabel>
            <Select
              style={{ width: "270px", height: "40px" }}
              onChange={handleSelectChange2}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {route_descriptions.map((route_description) => (
                <MenuItem
                  key={route_description}
                  value={route_description}
                  divider={true}
                >
                  {route_description}
                  {console.log("CORRESPONDING STOPS LIST:", stops_list)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="submit-button">
          <Button variant="contained" onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllRoutes;
