import axios from "axios";

// a function returns all stops with lat&lng with a given google direction service route result

const StopMarkers = function (resultsRoutes){
    let positions_list = []; //an empty list to store all stops coordinate

    /* read the object from google direction service results return */
    const legs = resultsRoutes[0].legs[0];
    console.log("FROM StopMarkers.js, legs is:\n", legs)
    const steps = legs.steps;
    console.log("FROM StopMarkers.js, steps is:\n", steps)
    function get_bus_step(steps) {
        let return_value = "Could not find bus step"
        console.log("step length:", steps.length)
        for (let i = 0; i<steps.length; i++) {
            if (steps[i].travel_mode == "TRANSIT"){
                console.log("FROM StopMarkers.js, target step is:\n", steps[i])
                return_value = steps[i]
                break
            }
        }
        return return_value
    };
    const bus_step = get_bus_step(steps)
    console.log("FROM StopMarkers.js, bus_step is:\n", bus_step)
    const transit = bus_step.transit;
    const headsign = transit.headsign;

    function get_startpoint(transit) {
        const name = transit.line.name
        const sep = name.indexOf("-")
        const startpoint = name.substring(0, sep-1)
        return startpoint
    };
    const startpoint = get_startpoint(transit)
    const short_name = transit.line.short_name;
    
    /*Next call static_stops API to get all stops & routes info, and match the results from google to it*/ 
    const get_static_stops = async () => {
        const static_stops = await (await axios.get("http://127.0.0.1:8000/static_stops/")).data
        console.log(static_stops)

        function get_matched_route() {
            let matched_route = "Can not match any routes!"
            for (let i = 0; i<static_stops.length; i++) {
                if (static_stops[i].route_name == short_name && 
                    (static_stops[i].startpoint.toLowerCase().includes(startpoint.toLowerCase()) || static_stops[i].headsign.toLowerCase().includes(headsign.toLowerCase())) ){         // need to be improved here
                    console.log("Found matched route in static stops database!")
                    matched_route = static_stops[i]
                    break
                }
            }
            return matched_route
        }
        console.log("Matched route is:\n",get_matched_route())

        const stops_on_route = get_matched_route().stops;
        console.log("Stops on the routes are:\n", stops_on_route)

        for (const stop in stops_on_route){
            // console.log(stops_on_route[stop])
            let stop_info = {
                stop_sequence: parseInt(stops_on_route[stop].stop_sequence),
                plate_code: parseInt(stops_on_route[stop].plate_code),
                position: {lat: parseFloat(stops_on_route[stop].latitude), lng: parseFloat(stops_on_route[stop].longitude)}
            }
            positions_list.push(stop_info)
        }

        console.log("FROM StopMarkers.js, stop list found:\n", positions_list)
    }

    get_static_stops()

    return positions_list;
} 

export default StopMarkers;