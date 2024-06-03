import React, { useState } from "react";

function CityForm({ appid }) {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "https://api.openweathermap.org/data/2.5/forecast";

    try {
      const response = await fetch(`${url}?q=${city}&appid=${appid}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex justify-center mb-4">
        <div className="w-full max-w-md">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search City" value={city} onChange={((e)=>
            {
              setCity(e.target.value);
            })} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </form>
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>Error: {error}</span>
          </div>
        </div>
      )}
      {weatherData ? (
        <div className="card shadow-lg p-4">
          <h2 className="card-title text-center">{weatherData.city.name}</h2>
          <div className="flex justify-between">
            <div>
              <p>
                <strong>Temperature:</strong>{" "}
                {(weatherData.list[0].main.temp - 273.15).toFixed(2)} °C
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.list[0].main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.list[0].wind.speed}{" "}
                m/s
              </p>
            </div>
            <div>
              <p>
                <strong>Weather:</strong> {weatherData.list[0].weather[0].main}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {weatherData.list[0].weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
                alt="Weather icon"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No data found. Try another city name.</p>
        </div>
      )}
    </div>
  );
}

export default CityForm;
