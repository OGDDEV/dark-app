const weatherCodeToCondition = (code) => {
  if (code === 0) return 'Sunny';
  if ([1, 2].includes(code)) return 'Partly Cloudy';
  if (code === 3) return 'Cloudy';
  if ([45, 48].includes(code)) return 'Foggy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rainy';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy';
  if ([95, 96, 99].includes(code)) return 'Stormy';
  return 'Unknown';
};

export async function fetchWeather(cityName) {
  const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();

  if (!searchData.results || searchData.results.length === 0) {
    throw new Error('City not found. Please check the spelling and try again.');
  }

  const { latitude, longitude, name, country } = searchData.results[0];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  if (!weatherData.current_weather) {
    throw new Error('Weather information is unavailable for this location.');
  }

  const current = weatherData.current_weather;
  const dateObj = new Date(current.time);
  const dateLabel = dateObj.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeLabel = dateObj.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    city: country ? `${name}, ${country}` : name,
    temperature: Math.round(current.temperature),
    windSpeed: Math.round(current.windspeed),
    condition: weatherCodeToCondition(current.weathercode),
    dateLabel,
    timeLabel,
  };
}
