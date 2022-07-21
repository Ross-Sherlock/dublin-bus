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
const Map = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  const [date, setDate] = useState(new Date());

  // Render directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

   /** @type React.MutableRefObject<HTMLInputElement> */
  const dateRef = useRef();

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
        departureTime: date
      },
    });
    // Filter routes to only include Dublin Bus
    results.routes = results.routes.filter(checkRoute);
    console.log(results);
    setDirectionsResponse(results);
    //print routes details from google direction service
    // console.log("FROM calcRoute, results.routes:\n", results.routes);

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

  async function clearRoute() {
    setDirectionsResponse(null);
    setMap(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
    document.getElementById("direction-steps").innerHTML = "";
  }

  if (!isLoaded) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        center={centre}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} panel={ document.getElementById('direction-steps') }/>
        )}
      </GoogleMap>

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
      ></JourneyForm>
    </div>
  );
};

export default Map;
