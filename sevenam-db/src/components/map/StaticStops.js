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
    get_route_descriptions(route_number) {
        let route_descriptions = []
        for (let i = 0; i<this.static_stops.length; i++) {
            if (this.static_stops[i].route_name == route_number) {
                route_descriptions.push(this.static_stops[i].route_description)
            }
        }
        return route_descriptions
    }

    //method to get corresponding stops list
    get_stops_list(route_description) {
      let stops_list
      for (let i = 0; i < this.static_stops.length; i++) {
        if (this.static_stops[i].route_description == route_description) {
          stops_list = this.static_stops[i].stops
          break
        }
      }
      return stops_list
    }

}