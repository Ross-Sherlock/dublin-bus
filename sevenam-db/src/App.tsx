import './App.css'
import './components/navbar/Navbar'
import Navbar from './components/navbar/Navbar'
import JourneyForm from './components/floatingWindow/JourneyForm'
import Map from './components/map/Map'
import Marker from './components/map/Marker'

import React from 'react'
import ReactDOM from 'react-dom'
import { Wrapper } from '@googlemaps/react-wrapper'

function App() {
  const center = { lat: 53.3498, lng: -6.2603 }
  const zoom = 12
  const positions = [{ lat: 53.3, lng: -6.2 }, center, { lat: 53.4, lng: -6.2 }]

  const submitJourneyDataHandler = (enteredJourneyData) => {
    console.log(enteredJourneyData)
  }

  return (
    <div className="App">
      <Navbar />

      <h1>Map goes here</h1>
      <Wrapper apiKey={''}>
        <Map center={center} zoom={zoom}>
          {positions.map((position) => (
            <Marker position={position} />
          ))}
        </Map>
      </Wrapper>

      <JourneyForm onSubmitJourneyData={submitJourneyDataHandler} />
    </div>
  )
}

export default App
