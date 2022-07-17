import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import React, {useState, useEffect} from "react";
import {StaticStops} from "./StaticStops";
import axios from 'axios';
  
/*=====================start script=====================*/
  const AllRoutesMap = () => {
/*=====================Get marker list part=====================*/ 
    //get all data through API call
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/static_stops/")
        .then(response => setData(response.data))
        .catch(err => console.log(err));
    }, [])
    console.log("DATA IS:", data)

    //new a class instance from "StaticStops.js" class
    const staticstops = new StaticStops(data)

    //get route numbers list
    let route_numbers = staticstops.get_route_number()
    route_numbers.splice(0,0, "------Select------")
    console.log("ROUTE NUMBERS :", route_numbers)

    //get corresponding route description
    let [route_descriptions, setRoute_descriptions] = useState([]);

    //handleSelectChange1 function to get corresponding route description
    function handleSelectChange1(event) {
      let selected_route_number = event.target.value
      console.log("SELECTED NUMBER:", selected_route_number)
      setRoute_descriptions(()=>{
        let temp_route_description = staticstops.get_route_descriptions(selected_route_number)
        temp_route_description.splice(0,0, "------Select------")
        return temp_route_description
      })
      console.log("ROUTE DESCRIPTIONS:", route_descriptions)
    }

    //get corresponding stops list on the selected route
    const [stops_list, setStops_list] = useState([]);

    //handleSelectChange2 function to get corresponding stops list
    function handleSelectChange2(event) {
      let selected_route_description = event.target.value
      console.log("SELECTED ROUTE DESCRIPTION:", selected_route_description)
      setStops_list(()=>{
        let temp_stops_list = staticstops.get_stops_list(selected_route_description)
        return temp_stops_list
      })
    }

/*=====================Markers part=====================*/ 
    let [markers, setMarkers] = useState([]);
  
    function handleSubmit() {
      console.log("button clicked...")
      let temp_markers = []
      for (const stop in stops_list) {
        let temp_dict = {}
        temp_dict.name = stop
        temp_dict.plate_code = parseInt(stops_list[stop].plate_code)
        temp_dict.route_data = stops_list[stop].route_data
        temp_dict.stop_sequence = parseInt(stops_list[stop].stop_sequence)
        temp_dict.position = {lat: parseFloat(stops_list[stop].latitude), lng: parseFloat(stops_list[stop].longitude)}
        temp_markers.push(temp_dict)
      }
      console.log("TEMP_MARKERS",temp_markers)
      setMarkers(temp_markers)
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
      <div className="map-container">
        <GoogleMap
          center={centre}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
        
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            onLoad={handleSubmit}
          >
            {console.log("MARKERS ARE:", markers)}
          </Marker>
        ))}
    
        </GoogleMap>

        <div className="window-container">
          <label>Route numbers</label>
          <div className="route-input">
            <select style={{ width: "200px" }} onChange={handleSelectChange1}>
              {route_numbers.map(route_number => (
                <option key={route_number} value={route_number}>
                  {route_number}
                </option>
              ))}
            </select>
          </div>

          <lable>Route descriptions</lable>
          <div className="route-input">
            <select style={{ width: "200px" }} onChange={handleSelectChange2}>
              {route_descriptions.map(route_description => (
                <option key={route_description} value={route_description}>
                  {route_description}
                  {console.log("CORRESPONDING STOPS LIST:", stops_list)}
                </option>
              ))}
            </select>
          </div>
          
        <div className="journey-submit">
          <button className="submit" onClick={handleSubmit}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/ios-edge-line-6/25/Location-Arrow-Crcle-512.png"
              width="40"
              height="40"
              alt="submit"
            />
          </button>
        </div>

        </div>

      </div>
    );
  };
  
  export default AllRoutesMap;