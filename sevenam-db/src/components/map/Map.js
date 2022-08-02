import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState, useRef } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";
import ToggleVisability from "../UI/ToggleVisibility"
import RouteSummary from "../UI/RouteSummary"
import RouteContainer from "../UI/RouteContainer";

/*=====================start script=====================*/
const centre = { lat: 53.343, lng: -6.256 };
const Map = (props) => {
  const [isExtended, setIsExtended] = useState(true);
  const setExtend = () => {
    setIsExtended(!isExtended);
  }
  function getStyle() {
    let css;
    if (isExtended) {
      css = `
  .side-panel{
    display:block !important;
  }
  .side-panel-toggle{
    margin-left:19.4%;
  }
  `;
    } else {
      css = `
  .side-panel{
    display:none !important;
  }
  `;
    }
    return css;
  }
  function changeArrow() {
    let arrow;
    if (isExtended) {
      arrow = ["material-symbols-outlined", "arrow_left"]
    } else {
      arrow = ["material-symbols-outlined", "arrow_right"]
    }
    return arrow
  }
  /*=====================prediction parameters=====================*/
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [start_lat, setStart_lat] = useState(null);
  const [start_lng, setStart_lng] = useState(null);
  const [end_lat, setEnd_lat] = useState(null);
  const [end_lng, setEnd_lng] = useState(null);
  const [route_numner, setRoute_number] = useState(null);
  const [start_stopid, setStart_stopid] = useState(null);
  const [end_stopid, setEnd_stopid] = useState(null);
  const [n_stops, setN_stops] = useState(null);
  const [route_index, setRoute_index] = useState(0);

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  const [date, setDate] = useState(new Date());

  // Render directions
  const [directionsResponse, setDirectionsResponse] = useState(null);

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
    console.log(results);
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
      let month = months[departure_time.getMonth()];
      console.log("MONTH:", month)
      setMonth(month);

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[departure_time.getDay()];
      console.log("DAY", day)
      setDay(day);

      let hour = departure_time.getHours();
      console.log("HOUR:", hour)
      setHour(hour);
    }
    let departure_time = results.request.transitOptions.departureTime;
    getMDH(departure_time); //get month day hour

    function getDynamicParams(steps) {
      let transit = steps.transit;
      let arrival_stop = transit.arrival_stop;
      let departure_stop = transit.departure_stop;
      let line = transit.line;
      let start_lat = departure_stop.location.lat;
      let n_stops = transit.num_stops;
      console.log("START_LAT:", start_lat());
      setStart_lat(start_lat());
      let start_lng = departure_stop.location.lng;
      console.log("START_LNG:", start_lng());
      setStart_lng(start_lng());
      let end_lat = arrival_stop.location.lat;
      console.log("END_LAT:", end_lat());
      setEnd_lat(end_lat());
      let end_lng = arrival_stop.location.lng;
      console.log("END_LNG:", end_lng());
      setEnd_lng(end_lng());
      let route_number = line.short_name;
      console.log("ROUTE NUMBER:", route_number);
      setRoute_number(route_number);
      console.log("NUMBER OF STOPS", n_stops)
      setN_stops(n_stops)

      function check_stop_code(name) {
        if (name.includes(", stop ")) {
          let loc_index = name.indexOf(", stop ");
          loc_index = loc_index + 7;
          let code = name.slice(loc_index, name.length);
          console.log("FOUND STOP CODE PROVIDED:", code)
          return parseInt(code)
        } else {
          return null;
        }
      }
      let start_stopid = check_stop_code(departure_stop.name);
      setStart_stopid(start_stopid);
      let end_stopid = check_stop_code(arrival_stop.name);
      setEnd_stopid(end_stopid);
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
      console.log("STEPS LIST:", steps_list);
      return steps_list;
    }

    console.log("ROUTE INDEX:", route_index);
    let all_steps = results.routes[route_index].legs[0].steps;
    console.log("ALL STEPS IN A ROUTE:", all_steps);
    getDynamicParams(get_steps_list(all_steps)[0]);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setMap(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
    document.getElementById("direction-steps").innerHTML = "";
  }

  if (!isLoaded) {
    return <h1>Loading</h1>;
  }

  async function favRoute() {
    if (directionsResponse) {
      localStorage.setItem("fav", JSON.stringify(responseJSON));
    }
  }

  return (
    <div className="content-container">
      <ToggleVisability content="side-panel">
        <div className="side-panel">
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
        <RouteContainer response={directionsResponse}></RouteContainer>
        </div>
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
            
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;