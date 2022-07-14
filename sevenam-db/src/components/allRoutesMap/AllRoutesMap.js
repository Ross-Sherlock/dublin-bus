import {
    useJsApiLoader,
    GoogleMap,
    Marker,
  } from "@react-google-maps/api";
  import React, {useState} from "react";
  import RoutesForm from "./RoutesForm";
  
  /*=====================start script=====================*/
  const centre = { lat: 53.343, lng: -6.256 };

  const AllRoutesMap = () => {
    const [libraries] = useState(["places"]);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_KEY,
      libraries,
    });
  
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
        </GoogleMap>

        <RoutesForm></RoutesForm>
      </div>
    );
  };
  
  export default AllRoutesMap;