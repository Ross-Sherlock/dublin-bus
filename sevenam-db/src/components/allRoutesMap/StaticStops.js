export class StaticStops{
    //constructor
    constructor(data){
        this.static_stops = data
        console.log("FROM CLASS:", this.static_stops)
    };

    //method to get a route number array
    get_route_number() {
        let route_number = []
        for (let i = 0; i<this.static_stops.length; i++) {
            if (! route_number.includes(this.static_stops[i].route_name)) {
                route_number.push(this.static_stops[i].route_name)
            }
        }
        return route_number
    }

    //method to get different routes under a single route number
    get_route_description(route_number) {
        let route_description = []
        for (let i = 0; i<this.static_stops.length; i++) {
            if (this.static_stops[i].route_name == route_number) {
                route_description.push(this.static_stops[i].route_description)
            }
        }
        return route_description
    }

}