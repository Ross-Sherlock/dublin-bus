export class StaticStops{
    //constructor
    constructor(data){
        this.static_stops = data
        console.log("FROM CLASS:", this.static_stops)
    };

    //method to get a route number array
    get_route_number() {
        let route_number = ['1', '11', '116', '118', '120', '122', '123', '13', '130', '14', '140', '142', '145', '15', '150', '151', '155', '15A', '15B', '15D', '16', '25', '25A', '25B', '25X', '26', '27', '27A', '27B', '27X', '29A', '31', '31A', '31B', '32', '32X', '33', '33B', '33X', '37', '38', '38B', '39', '39A', '4', '40', '40B', '40D', '40E', '41', '41B', '41C', '41D', '41X', '42', '43', '44', '44B', '46A', '46E', '47', '49', '51D', '53', '54A', '56A', '61', '65', '65B', '66', '66A', '66B', '66X', '67', '67X', '68', '68A', '69', '7', '70', '77A', '77X', '79', '79A', '7A', '7B', '7D', '83', '84', '84A', '84X', '9'];
        return route_number;
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