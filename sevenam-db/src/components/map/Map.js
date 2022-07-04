import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Marker
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
      transitOptions: {
        modes: ['BUS']
      },
    });
     //print routes details from google direction service
    console.log("routes:\n", results.routes)
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

const positions = [
    {position: {lat:53.30664370346626, lng:-6.2256166460317575}},
    {position: {lat:53.30880319311564, lng:-6.199756136341364}}
]
const onLoad = marker => {
    console.log('marker: ', marker)
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
                {positions.map(({position}) => (
                    <Marker
                        onLoad={onLoad}
                        position={position}
                    >
                    </Marker>
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
