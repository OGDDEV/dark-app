import React from 'react';
import './Hero.css';
import Filter from './Filter';

function Hero({ onSearch }) {
  return (
    <>
      <div className="hero-title">
        <p>
          Seeing the weather of the whole world
          <br />
          with <span>Dark Weather!</span>
        </p>
      </div>
      <div className="hero">
        <Filter onSearch={onSearch} />
      </div>
    </>
  );
}

export default Hero;
