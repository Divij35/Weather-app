import React from 'react';
import useWeatherStore from '../store/weatherStore';

const weatherTips = {
  Clear: {
    tip: 'It\'s a sunny day! Don\'t forget your sunscreen.',
    icon: '☀️',
    activities: ['Outdoor activities', 'Picnic', 'Hiking', 'Beach day']
  },
  Rain: {
    tip: 'Carry an umbrella. It looks like rain today!',
    icon: '🌧️',
    activities: ['Indoor activities', 'Reading', 'Movie day', 'Board games']
  },
  Clouds: {
    tip: 'Cloudy skies ahead. Enjoy the shade!',
    icon: '☁️',
    activities: ['Light outdoor activities', 'Photography', 'Walking', 'Gardening']
  },
  Snow: {
    tip: 'Dress warmly, snow is on the way!',
    icon: '❄️',
    activities: ['Snow activities', 'Skiing', 'Snowman building', 'Hot chocolate']
  },
  Thunderstorm: {
    tip: 'Stay indoors during thunderstorms for safety.',
    icon: '⛈️',
    activities: ['Indoor activities', 'Cooking', 'Puzzles', 'Music']
  },
  Drizzle: {
    tip: 'Light rain expected. A light jacket should do!',
    icon: '🌦️',
    activities: ['Indoor activities', 'Coffee shop visit', 'Shopping', 'Art']
  },
  Mist: {
    tip: 'Foggy conditions. Drive carefully!',
    icon: '🌫️',
    activities: ['Indoor activities', 'Yoga', 'Meditation', 'Reading']
  },
  Smoke: {
    tip: 'Poor air quality. Consider staying indoors.',
    icon: '💨',
    activities: ['Indoor activities', 'Air purifier on', 'Light exercise', 'Rest']
  },
  Haze: {
    tip: 'Hazy conditions. Limit outdoor activities.',
    icon: '😷',
    activities: ['Indoor activities', 'Air purifier on', 'Light exercise', 'Rest']
  },
  Dust: {
    tip: 'Dusty conditions. Consider wearing a mask.',
    icon: '💨',
    activities: ['Indoor activities', 'Cleaning', 'Indoor exercise', 'Rest']
  },
  Fog: {
    tip: 'Foggy weather. Drive with caution!',
    icon: '🌫️',
    activities: ['Indoor activities', 'Yoga', 'Meditation', 'Reading']
  },
  Sand: {
    tip: 'Sandy conditions. Protect your eyes and skin.',
    icon: '🏜️',
    activities: ['Indoor activities', 'Protective gear if outside', 'Indoor exercise', 'Rest']
  },
  Ash: {
    tip: 'Ash in the air. Stay indoors if possible.',
    icon: '🌋',
    activities: ['Indoor activities', 'Air purifier on', 'Rest', 'Emergency prep']
  },
  Squall: {
    tip: 'Strong winds expected. Secure loose objects!',
    icon: '💨',
    activities: ['Indoor activities', 'Secure outdoor items', 'Indoor exercise', 'Rest']
  },
  Tornado: {
    tip: 'Tornado warning! Seek shelter immediately.',
    icon: '🌪️',
    activities: ['Emergency shelter', 'Stay informed', 'Emergency prep', 'Safety first']
  }
};

const Event = () => {
  const { currentWeather, savedCities } = useWeatherStore();
  
  const condition = currentWeather?.weather?.[0]?.main;
  const city = currentWeather?.name;
  const country = currentWeather?.sys?.country;
  const temp = currentWeather?.main?.temp;
  const humidity = currentWeather?.main?.humidity;
  const windSpeed = currentWeather?.wind?.speed;

  const getWeatherInfo = () => {
    if (!condition) return null;
    
    const weatherInfo = weatherTips[condition] || {
      tip: 'Enjoy your day!',
      icon: '🌤️',
      activities: ['General activities', 'Outdoor fun', 'Indoor relaxation', 'Social time']
    };
    
    return weatherInfo;
  };

  const weatherInfo = getWeatherInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {weatherInfo?.icon} Weather Tips
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Personalized recommendations for {city ? `${city}, ${country}` : 'your location'}
          </p>
        </div>

        {currentWeather ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Current Weather Summary */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Current Weather in {city}
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Temperature:</span>
                    <span className="text-3xl font-bold">{Math.round(temp)}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Condition:</span>
                    <span className="text-lg capitalize">{currentWeather.weather[0].description}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Humidity:</span>
                    <span className="text-lg">{humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Wind Speed:</span>
                    <span className="text-lg">{windSpeed} m/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Today's Recommendation
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">{weatherInfo?.icon}</div>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 leading-relaxed">
                    {weatherInfo?.tip}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 text-lg">Suggested Activities:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {weatherInfo?.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-blue-500 text-lg">•</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌤️</div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              No Weather Data Available
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Please check the forecast page first to get personalized weather tips
            </p>
            <a 
              href="/" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Go to Forecast
            </a>
          </div>
        )}

        {savedCities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Your Saved Cities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCities.map((city, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white text-lg">{city.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{city.country}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {city.temp}°C
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mb-4">
                    {city.weather}
                  </p>
                  <div className="text-center">
                    <a 
                      href="/" 
                      className="inline-block w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
