import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState, useRef } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";

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
    } else{
      arrow = ["material-symbols-outlined", "arrow_right"] 
    }
    return arrow
  }

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
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
      <style>{getStyle()}</style>
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
        ></JourneyForm>
      </div>

      <button className="side-panel-toggle" id="side-panel-trigger" type="button" onClick={setExtend}>
        <span className={changeArrow()[0]}>{changeArrow()[1]}</span>
      </button>

      <GoogleMap
        center={centre}
        zoom={11}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            panel={document.getElementById("direction-steps")}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;