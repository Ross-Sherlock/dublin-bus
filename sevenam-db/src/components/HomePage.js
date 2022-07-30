import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState} from "react";



/*=====================start script=====================*/
const centre = { lat: 53.343, lng: -6.256 };
const HomePage = () => {
  const mapContainerStyle = {
    height: "calc(100vh - 1.5cm)",
    width: "calc(100vw - 40px)",
  }
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  const [date, setDate] = useState(new Date());

  

  const [responseJSON, setResponseJSON] = useState({});


 
  if (!isLoaded) {
    return <h1>Loading</h1>;
  }


  return (
    <div className="map-container">

      <GoogleMap
        center={centre}
        zoom={11}
        mapContainerStyle={mapContainerStyle}
        onLoad={(map) => setMap(map)}
      >

      </GoogleMap>
    </div>
  );
};



export default HomePage;
