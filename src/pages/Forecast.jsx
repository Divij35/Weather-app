import React, { useState } from 'react';

function CityForm({ appid }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://api.openweathermap.org/data/2.5/forecast';

    try {
      const response = await fetch(`${url}?q=${city}&appid=${appid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>Error: {error}</p>}
      {weatherData ? (
        <div>
          <h2>Weather Forecast for {weatherData.city.name}</h2>
          <p>description {weatherData.list[0].weather[0].description}</p>
        </div>
      ):(<div>
      <p>Data not found</p>
      <p>Try another name</p>
      </div>)
      }
    </div>
  );
}

export default CityForm;
