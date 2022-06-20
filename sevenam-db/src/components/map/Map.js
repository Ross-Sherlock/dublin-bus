import "./Map.css"
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 53.3,
      lng: 6.22
    },
    zoom: 10
  };

  render () {
    return (
      <div className='map_container' >
        <GoogleMapReact
          googleApiKey={{ key: "AIzaSyAYnqeidmNvgeT33ff1NJOxUFaQV6oijDE" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map