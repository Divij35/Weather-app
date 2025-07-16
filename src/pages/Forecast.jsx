import React, { useState, useEffect } from "react";
import useWeatherStore from "../store/weatherStore";

function Forecast({ appid }) {
  const [city, setCity] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  
  const {
    data: weatherData,
    currentWeather,
    forecast,
    loading,
    error,
    savedCities,
    units,
    setData,
    setCurrentWeather,
    setForecast,
    setLoading,
    setError,
    addSavedCity,
    removeSavedCity,
    clearError
  } = useWeatherStore();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      clearError();
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
          } catch (error) {
            setError("Failed to get weather for current location");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Location access denied. Please search for a city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`;
      
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error("Weather data not available");
      }

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setData(forecastData);
    } catch (error) {
      setError("Failed to fetch weather data");
    }
  };
  
  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      clearError();
      
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=${units}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appid}&units=${units}`;
      
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found. Please check the spelling.");
      }

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setData(forecastData);
      
      setSearchHistory(prev => {
        const newHistory = [cityName, ...prev.filter(item => item !== cityName)].slice(0, 5);
        return newHistory;
      });
      
      setCity("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city.trim()) {
      await fetchWeatherByCity(city.trim());
    }
  };

  const handleSaveCity = () => {
    if (currentWeather) {
      addSavedCity({
        name: currentWeather.name,
        country: currentWeather.sys.country,
        temp: currentWeather.main.temp,
        weather: currentWeather.weather[0].main
      });
    }
  };

  const handleRemoveSavedCity = (cityName) => {
    removeSavedCity(cityName);
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTemperatureUnit = () => units === 'metric' ? '°C' : '°F';
  const getSpeedUnit = () => units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Weather Forecast
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get real-time weather information for any city
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900 transition-all duration-200"
                    placeholder="Enter city name..." 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !city.trim()}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <button 
              type="button" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
              onClick={getCurrentLocation}
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Use Current Location
            </button>
          </div>

          {searchHistory.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Recent searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {searchHistory.map((cityName, index) => (
                  <button
                    key={index}
                    onClick={() => fetchWeatherByCity(cityName)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 transition-all duration-200 text-sm font-medium"
                    disabled={loading}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 font-medium">{error}</span>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  onClick={clearError}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentWeather && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {currentWeather.name}, {currentWeather.sys.country}
                    </h2>
                    <p className="text-xl opacity-90 mb-1">
                      {formatDate(currentWeather.dt)} • {formatTime(currentWeather.dt)}
                    </p>
                    <p className="text-lg opacity-90 capitalize">
                      {currentWeather.weather[0].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl md:text-7xl font-bold mb-2">
                      {Math.round(currentWeather.main.temp)}{getTemperatureUnit()}
                    </div>
                    <div className="text-xl opacity-90">
                      Feels like {Math.round(currentWeather.main.feels_like)}{getTemperatureUnit()}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row justify-between items-center mt-8 gap-6">
                  <img
                    src={getWeatherIcon(currentWeather.weather[0].icon)}
                    alt={currentWeather.weather[0].description}
                    className="w-24 h-24 weather-icon"
                  />
                  <div className="flex gap-8 text-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentWeather.main.humidity}%</div>
                      <div className="text-sm opacity-90">Humidity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentWeather.wind.speed} {getSpeedUnit()}</div>
                      <div className="text-sm opacity-90">Wind Speed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentWeather.main.pressure} hPa</div>
                      <div className="text-sm opacity-90">Pressure</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button 
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
                    onClick={handleSaveCity}
                  >
                    💾 Save City
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {forecast && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                5-Day Forecast
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {forecast.list.filter((item, index) => index % 8 === 0).map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{formatDate(item.dt)}</h4>
                    <img
                      src={getWeatherIcon(item.weather[0].icon)}
                      alt={item.weather[0].description}
                      className="w-16 h-16 mx-auto mb-3 weather-icon"
                    />
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {Math.round(item.main.temp)}{getTemperatureUnit()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 capitalize mb-2">
                      {item.weather[0].description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(item.main.humidity)}% humidity
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {savedCities.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                Saved Cities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCities.map((city, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-lg">{city.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{city.country}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveSavedCity(city.name)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {city.temp}{getTemperatureUnit()}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mb-4">
                      {city.weather}
                    </p>
                    <button
                      onClick={() => fetchWeatherByCity(city.name)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                      disabled={loading}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!currentWeather && !loading && !error && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌤️</div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to WeatherApp
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Search for a city or use your current location to get weather information
            </p>
            <button 
              onClick={getCurrentLocation}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              📍 Get Current Location Weather
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
