import './App.css';
import './components/navbar/Navbar'
import Navbar from './components/navbar/Navbar';
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1>Map goes here</h1>
    </div>
  );
}

export default App;
