import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import React, { useState } from "react";
import "./Map.css";
import JourneyForm from "../floatingWindow/JourneyForm";

const centre = { lat: 53.343, lng: -6.256 };
const Map = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries: ["places"],
  });

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
      ></GoogleMap>
      <JourneyForm map={map} setMap={setMap} centre={centre}></JourneyForm>
    </div>
  );
};

export default Map;
