import './App.css'
import './components/navbar/Navbar'
import Navbar from './components/navbar/Navbar'
import React from 'react'
import JourneyForm from './components/floatingWindow/JourneyForm'
import Map from './components/map/Map'
import ReactDOM from 'react-dom'

function App () {

  const submitJourneyDataHandler = (enteredJourneyData) => {
    console.log(enteredJourneyData)
  }

  return (
    <div className="App">
      <Navbar />
      <h1>Map goes here</h1>
      <Map />
      <JourneyForm onSubmitJourneyData={submitJourneyDataHandler} />
    </div>
  )
}

export default App
