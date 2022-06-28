import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  dir,
} from "@react-google-maps/api";
import React, { useState, useRef } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";

const centre = { lat: 53.343, lng: -6.256 };
const Map = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

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
    });
    setDirectionsResponse(results);
  }

  async function clearRoute() {
    setDirectionsResponse(null);
    setMap(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
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
          <DirectionsRenderer directions={directionsResponse} />
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
      ></JourneyForm>
    </div>
  );
};

export default Map;
