import Axios from "axios";

// a function returns all stops with lat&lng with a given google direction service route result

const StopMarkers = function (resultsRoutes){
    const positions_list = {}; //an empty list to store all stops coordinate
    //onLoad parameter 
    const onLoad = marker => {
        console.log('marker: ', marker)
    };
    
    /* read the object from google direction service results return */
    const legs = resultsRoutes[0].legs[0];
    const steps = legs.steps;
    const bus_step = () => {
        for (const step in steps) {
            if (step.travel_mode == "TRANSIT"){
                return step
            }
        }
    };

    const transit = bus_step.transit;
    const headsign = transit.headsign;
    const startpoint = () => {
        const name = transit.line.name
        const sep = name.indexOf("-")
        const startpoint = name.substring(0, sep-1)
        return startpoint
    };
    
    const short_name = transit.line.short_name;
    
    /*Next call static_stops API to get all stops & routes info, and match the results from google to it*/ 


    return positions_list;
} 

export default StopMarkers;

