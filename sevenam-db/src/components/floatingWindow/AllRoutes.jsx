import React, { useState, useEffect } from "react";
import "./AllRoutes.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";


const AllRoutes = (props) => {
    const setMarkers = props.setMarkers;

    /*=====================Get marker list part=====================*/
    let route_numbers = ['1', '11', '116', '118', '120', '122', '123', '13', '130', '14', '140', '142', '145', '15', '150', '151', '155', '15A', '15B', '15D', '16', '25', '25A', '25B', '25X', '26', '27', '27A', '27B', '27X', '29A', '31', '31A', '31B', '32', '32X', '33', '33B', '33X', '37', '38', '38B', '39', '39A', '4', '40', '40B', '40D', '40E', '41', '41B', '41C', '41D', '41X', '42', '43', '44', '44B', '46A', '46E', '47', '49', '51D', '53', '54A', '56A', '61', '65', '65B', '66', '66A', '66B', '66X', '67', '67X', '68', '68A', '69', '7', '70', '77A', '77X', '79', '79A', '7A', '7B', '7D', '83', '84', '84A', '84X', '9'];
    //get corresponding route description
    let [route_descriptions, setRoute_descriptions] = useState(['select']);

    async function get_route_descriptions(route_name) {
        let descriptions=[];
        let url = process.env.REACT_APP_API + "/static_stops/?route_name=" + route_name;
        await fetch(url)
            .then((response) => response.json())
            .then((result) => {
                Object.entries(result).map(des => {
                    descriptions.push(des[1])
                })
            });
        setRoute_descriptions(descriptions);
    }

    //handleSelectChange1 function to get corresponding route description
    function handleSelectChange1(event) {
        let selected_route_number = event.target.value;
        get_route_descriptions(selected_route_number);
    }

    //get corresponding stops list on the selected route
    const [stops_list, setStops_list] = useState([]);

    //method to get corresponding stops list
    async function get_stops_list(route_description) {
        let url = process.env.REACT_APP_API + "/static_stops/?route_des=" + route_description;
        let all_stops;
        await fetch(url)
            .then((response) => response.json())
            .then((result) => {
                all_stops = result
            });
        setStops_list(all_stops);
    }

    //handleSelectChange2 function to get corresponding stops list
    function handleSelectChange2(event) {
        let selected_route_description = event.target.value;
        get_stops_list(selected_route_description);
    }

    /*=====================Markers part=====================*/

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
                                    onChange={handleSelectChange1}
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
                            inputProps={{ "aria-label": "Without label" }}
                        >
                            {route_descriptions.map((route_des) => (
                                <MenuItem
                                    key={route_des}
                                    value={route_des}
                                    divider={true}
                                >
                                    {route_des}
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
