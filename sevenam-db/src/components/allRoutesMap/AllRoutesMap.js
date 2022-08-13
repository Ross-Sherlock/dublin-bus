import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import { StaticStops } from "../map/StaticStops";
import axios from "axios";
import "./AllRoutesMap.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import ToggleVisibility from "../UI/ToggleVisibility";

/*=====================start script=====================*/
const AllRoutesMap = () => {
  /*=====================toggel extend fucntion=====================*/
  const [isExtended, setIsExtended] = useState(true);
  const setExtend = () => {
    setIsExtended(!isExtended);
  };
  /*=====================Get marker list part=====================*/
  //get all data through API call
  const api_url = process.env.REACT_APP_API;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(api_url + "/static_stops/")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  //new a class instance from "StaticStops.js" class
  const staticstops = new StaticStops(data);

  //get route numbers list
  let route_numbers = staticstops.get_route_number();
  route_numbers.splice(0, 0, "------Select------");

  //get corresponding route description
  let [route_descriptions, setRoute_descriptions] = useState([]);

  //handleSelectChange1 function to get corresponding route description
  function handleSelectChange1(event) {
    let selected_route_number = event.target.value;
    setRoute_descriptions(() => {
      let temp_route_description = staticstops.get_route_descriptions(
        selected_route_number
      );
      temp_route_description.splice(0, 0, "------Select------");
      return temp_route_description;
    });
  }

  //get corresponding stops list on the selected route
  const [stops_list, setStops_list] = useState([]);

  //handleSelectChange2 function to get corresponding stops list
  function handleSelectChange2(event) {
    let selected_route_description = event.target.value;
    setStops_list(() => {
      let temp_stops_list = staticstops.get_stops_list(
        selected_route_description
      );
      return temp_stops_list;
    });
  }

  /*=====================Markers part=====================*/
  let [markers, setMarkers] = useState([]);

  function handleSubmit() {
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
    setMarkers(temp_markers);
  }
  /*=====================Google Map part=====================*/
  const centre = { lat: 53.343, lng: -6.256 };
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  /*=====================Return part=====================*/
  if (!isLoaded) {
    return <h1>Website is under construction...</h1>;
  }

  return (
    <div className="allroutesmap-container">
 
      <ToggleVisibility content="side-panel">
        <div id="side">
          <div className="side-panel">
            <div className="route_number_input">
              <Typography variant="h6" gutterBottom component="div">
                Select a bus number
              </Typography>
              <FormControl>
                <InputLabel id="select-helper-label">Route number</InputLabel>
                <Select
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
                <InputLabel id="select-helper-label">
                  Route description
                </InputLabel>
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
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="submit-button">
              <Button variant="contained" onClick={handleSubmit} > 
                Search
              </Button>
            </div>
          </div>
        </div>
      </ToggleVisibility>

  

      <GoogleMap
        center={centre}
        zoom={11}
        mapContainerStyle={{ height: "100%", width: "100%" }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onLoad={handleSubmit}
          >
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default AllRoutesMap;
