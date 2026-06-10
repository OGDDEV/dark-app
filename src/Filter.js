import React, { useState } from 'react';
import './Filter.css';

function Filter({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(city);
    }
    setCity('');
  };

  return (
    <form className="filter-fieldset" onSubmit={handleSubmit}>
      <button type="submit">Search</button>
      <input
        autoComplete="off"
        type="text"
        name="city"
        placeholder="Enter a city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <select>
        <option value="weather rate">All weather</option>
        <option value="coldest">Coldest</option>
        <option value="hottest">Hottest</option>
      </select>
      <select>
        <option value="all temperature"> All temperature</option>
        <option value="10-20">10°C-20°C</option>
        <option value="20-30">20°C-30°C</option>
        <option value="30-40">30°C-40°C</option>
      </select>
      <select>
        <option value="All season">All condition</option>
        <option value="rainy">Rainy</option>
        <option value="cloudy">Cloudy</option>
        <option value="sunny">Sunny</option>
      </select>
    </form>
  );
}

export default Filter;
