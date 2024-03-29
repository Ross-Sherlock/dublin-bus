import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";
import React, { useState, useRef } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";
import ToggleVisability from "../UI/ToggleVisibility"
import RouteContainer from "../UI/RouteContainer";
import AllRoutes from "../floatingWindow/AllRoutes";


/*=====================start script=====================*/
const centre = { lat: 53.343, lng: -6.256 };
const Map = (props) => {
  const [isExtended, setIsExtended] = useState(true);
  const setExtend = () => {
    setIsExtended(!isExtended);
  }
  /*=====================prediction parameters=====================*/
  let month;
  let day;
  let hour;
  let start_lat;
  let end_lat;
  let start_lng;
  let end_lng;
  let route_numner;
  let start_stopid;
  let end_stopid;
  let n_stops;
  const [routeIndex, setRouteIndex] = useState(0);


const journeyPlan = props.journeyPlan;
  const map = props.map;
  const setMap = props.setMap;
  const markers = props.markers;
  const setMarkers = props.setMarkers;
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  const [date, setDate] = useState(new Date());

  // Render directions
  const directionsResponse = props.directionsResponse;
  const setDirectionsResponse = props.setDirectionsResponse;

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  let resultCheck = false;

  const [responseJSON, setResponseJSON] = useState({});

  async function calcRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.TRANSIT,
      provideRouteAlternatives: true,
      transitOptions: {
        modes: ["BUS"],
        departureTime: date,
      },
    });
    // Filter routes to only include Dublin Bus
    results.routes = results.routes.filter(checkRoute);
    // testingRef.current.value = results;
    setResponseJSON(results);
    setDirectionsResponse(results);

    function checkRoute(route_results) {
      for (const element of route_results.legs) {
        for (const step of element.steps) {
          if (
            step.travel_mode == "TRANSIT" &&
            step.transit.line.agencies[0].name != "Dublin Bus"
          ) {
            return false;
          }
        }
      }
      return true;
    }

    function getMDH(departure_time) {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      month = months[departure_time.getMonth()];
      // setMonth(month);

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      day = days[departure_time.getDay()];
      // setDay(day);

      hour = departure_time.getHours();
      // setHour(hour);
    }
    let departure_time = results.request.transitOptions.departureTime;
    getMDH(departure_time); //get month day hour

    function getDynamicParams(steps) {
      let transit = steps.transit;
      let arrival_stop = transit.arrival_stop;
      let departure_stop = transit.departure_stop;
      let line = transit.line;
      start_lat = (departure_stop.location.lat)();
      n_stops = transit.num_stops;
      start_lng = (departure_stop.location.lng)();
      end_lat = (arrival_stop.location.lat)();
      end_lng = (arrival_stop.location.lng)();
      let route_number = line.short_name;

      function check_stop_code(name) {
        if (name.includes(", stop ")) {
          let loc_index = name.indexOf(", stop ");
          loc_index = loc_index + 7;
          let code = name.slice(loc_index, name.length);
          return parseInt(code)
        } else {
          return null;
        }
      }
      start_stopid = check_stop_code(departure_stop.name);
      // setStart_stopid(start_stopid);
      end_stopid = check_stop_code(arrival_stop.name);
      // setEnd_stopid(end_stopid);
    }

    function get_steps_list(all_steps) {
      let steps_list = [];
      for (const step in all_steps) {
        if (all_steps[step].travel_mode == "TRANSIT") {
          steps_list.push(all_steps[step]);
        } else {
          continue;
        }
      }
      return steps_list;
    }

    let all_steps = results.routes[routeIndex].legs[0].steps;
    getDynamicParams(get_steps_list(all_steps)[0]);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    // setMap(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
    document.getElementById("direction-steps").innerHTML = "";
  }

  async function favRoute() {
    if (directionsResponse) {
      localStorage.setItem("fav", JSON.stringify(responseJSON));
    }
  }








  

/*=====================Markers part=====================*/


  if (!isLoaded) {
    return <h1>Loading</h1>;
  }

  let currentDisplay;

  if(!journeyPlan)  {
  currentDisplay = <AllRoutes setMarkers={setMarkers}></AllRoutes>
  }


else {
 currentDisplay = (<div className="side-panel">
<JourneyForm
  map={map}
  setMap={setMap}
  centre={centre}
  clearRoute={clearRoute}
  calcRoute={calcRoute}
  originRef={originRef}
  destinationRef={destinationRef}
  date={date}
  setDate={setDate}
  favRoute={favRoute}
  response={responseJSON}
  month={month}
  day={day}
  hour={hour}
  start_lat={start_lat}
  start_lng={start_lng}
  end_lat={end_lat}
  end_lng={end_lng}
  route_number={route_numner}
  start_stopid={start_stopid}
  end_stopid={end_stopid}
  n_stops={n_stops}
></JourneyForm>
<RouteContainer response={directionsResponse} setRouteIndex={setRouteIndex}></RouteContainer>
</div>)
}

  return (
    <div className="content-container">
      <ToggleVisability content="side-panel">
        {currentDisplay}
      </ToggleVisability>

      <GoogleMap
        center={centre}
        zoom={11}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            routeIndex={routeIndex}
            
          />
        )}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            // onLoad={handleSubmit}
          >
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;