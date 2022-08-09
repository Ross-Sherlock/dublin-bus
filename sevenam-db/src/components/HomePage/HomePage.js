import {
  useJsApiLoader,
  GoogleMap,
} from "@react-google-maps/api";
import React, { useState} from "react";



/*=====================start script=====================*/
const centre = { lat: 53.343, lng: -6.256 };
const HomePage = () => {
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
      <GoogleMap
        center={centre}
        zoom={11}
        mapContainerStyle={{height: "100%", width: "100%"}}
        onLoad={(map) => setMap(map)}
      >

      </GoogleMap>
  );
};



export default HomePage;