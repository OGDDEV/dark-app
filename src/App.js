import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import { fetchWeather } from './weather';
import tehranImage from './Images/Group 3.svg';
import qomImage from './Images/sun.svg';
import gilanImage from './Images/Group 3 (1).svg';

const now = new Date();
const defaultDateLabel = now.toLocaleDateString(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const defaultTimeLabel = now.toLocaleTimeString(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});

const defaultCities = [
  {
    id: 'tehran',
    city: 'Tehran',
    temperature: 35,
    windSpeed: 11,
    dateLabel: defaultDateLabel,
    timeLabel: defaultTimeLabel,
    condition: 'Cloudy',
    image: tehranImage,
  },
  {
    id: 'qom',
    city: 'Qom',
    temperature: 41,
    windSpeed: 5,
    dateLabel: defaultDateLabel,
    timeLabel: defaultTimeLabel,
    condition: 'Sunny',
    image: qomImage,
  },
  {
    id: 'gilan',
    city: 'Gilan',
    temperature: 23,
    windSpeed: 23,
    dateLabel: defaultDateLabel,
    timeLabel: defaultTimeLabel,
    condition: 'Rainy',
    image: gilanImage,
  },
];

const getImageForCondition = (condition) => {
  if (condition === 'Sunny') return qomImage;
  if (condition === 'Cloudy' || condition === 'Partly Cloudy') return tehranImage;
  if (condition === 'Rainy' || condition === 'Foggy' || condition === 'Stormy' || condition === 'Snowy') return gilanImage;
  return tehranImage;
};

function App() {
  const [weatherItems, setWeatherItems] = useState(defaultCities);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    const trimmedCity = city?.trim();

    if (!trimmedCity) {
      setWeatherItems(defaultCities);
      setError('');
      return;
    }

    setSearching(true);
    setError('');

    try {
      const weather = await fetchWeather(trimmedCity);
      setWeatherItems([
        {
          id: trimmedCity.toLowerCase(),
          ...weather,
          image: getImageForCondition(weather.condition),
        },
      ]);
    } catch (fetchError) {
      setWeatherItems([]);
      setError(fetchError.message || 'Unable to find weather for that city.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="main">
      <Navbar />
      <Hero onSearch={handleSearch} />
      {searching && (
        <div className="weather">
          <div>
            <p>Loading weather...</p>
          </div>
        </div>
      )}
      {!searching && error && (
        <div className="weather">
          <div>
            <p>{error}</p>
          </div>
        </div>
      )}
      {!searching && !error && (
        <div className="weather">
          {weatherItems.map((item) => (
            <div className="weather-card" key={item.id}>
              {item.image && (
                <img
                  className="weather-card-image"
                  src={item.image}
                  alt={`${item.city} weather`}
                />
              )}
              <div className="weather-card-content">
                <p>
                  <strong>{item.city}</strong> {item.temperature}°C
                </p>
                <p>wind speed: {item.windSpeed}km</p>
                <p>{item.dateLabel}{item.timeLabel ? ` - ${item.timeLabel}` : ''}</p>
                <p>{item.condition}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

