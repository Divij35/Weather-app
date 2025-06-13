import React, {useEffect, useState} from 'react';
import useWeatherStore from '../store/weatherStore';

const weatherTips = {
  Clear: 'It\'s a sunny day! Don\'t forget your sunscreen.',
  Rain: 'Carry an umbrella. It looks like rain today!',
  Clouds: 'Cloudy skies ahead. Enjoy the shade!',
  Snow: 'Dress warmly, snow is on the way!',
  Thunderstorm: 'Stay indoors during thunderstorms for safety.',
};

const Event = () => {
  const weatherData = useWeatherStore(state => state.data);
  const condition = weatherData?.list?.[0]?.weather?.[0]?.main;
  const city = weatherData?.city?.name;

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🌦️ Weather Tip for {city || 'your city'}</h2>
      {condition ? (
        <p className="text-lg">{weatherTips[condition] || 'Enjoy your day!'}</p>
      ) : (
        <p className="text-lg">No recent city searched. Please check the forecast page first.</p>
      )}
    </div>
  );
};

export default Event;
