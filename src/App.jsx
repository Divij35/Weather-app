import React from 'react';
import './App.css';
import CityForm from './pages/Forecast';

function App() {
  const appid = import.meta.env.VITE_WEATHER_API;

  return (
    <div className="App">
      <h1>Weather App</h1>
      <CityForm appid={appid} />
    </div>
  );
}

export default App;
