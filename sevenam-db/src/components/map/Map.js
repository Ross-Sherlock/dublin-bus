import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import React, { useState, useRef } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";
import StopMarkers from "../marker/StopMarkers";

/*=====================start script=====================*/
const centre = { lat: 53.343, lng: -6.256 };
const Map = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  // Render Markers
  let default_marker = [
    { plate_code: 0, stop_sequence: 0, position: { lat: 0, lng: 0 } },
  ];
  const [positions, setPositions] = useState(default_marker);
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  // Render directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

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
      },
    });
    // Filter routes to only include Dublin Bus
    results.routes = results.routes.filter(checkRoute);
    setDirectionsResponse(results);
    //print routes details from google direction service
    console.log("FROM calcRoute, results.routes:\n", results.routes);

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
    setPositions(StopMarkers(results.routes));
  }

  async function clearRoute() {
    setDirectionsResponse(null);
    setMap(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  console.log("from last line of map.js, cheking positions...", positions);

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
          <DirectionsRenderer directions={directionsResponse} />
        )}

        {positions.map(({ stop_sequence, plate_code, position }) => (
          <Marker
            key={stop_sequence}
            plate_code={plate_code}
            onLoad={onLoad}
            position={position}
          ></Marker>
        ))}
      </GoogleMap>

      <JourneyForm
        map={map}
        setMap={setMap}
        centre={centre}
        clearRoute={clearRoute}
        calcRoute={calcRoute}
        originRef={originRef}
        destinationRef={destinationRef}
      ></JourneyForm>
    </div>
  );
};

export default Map;
