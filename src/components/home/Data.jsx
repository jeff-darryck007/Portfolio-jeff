import React from 'react';
import { Link } from 'react-router-dom';

const techPills = ['Vue.js', 'SQL', 'Symfony', 'MongoDB', 'PHP'];

const Data = () => (
  <div className="home__data">
    <span className="home__greeting">
      <i className="uil uil-smile" /> Bonjour, je suis
    </span>
    <h1 className="home__title">
      <span className="home__name-accent">Tchinda</span> Jeff D.
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="home__hand">
        <path d="M25.4995 32.0305L31.3495 33.1555L36.1495 8.48051C36.4495 6.83051 35.3995 5.18051 33.8245 4.88051C32.1745 4.58051 30.5995 5.70551 30.2995 7.35551L25.4995 32.0305Z" fill="#cccccc"/>
        <path d="M19.4995 32.7802H26.5495V5.55518C26.5495 3.53018 24.9745 1.80518 23.0245 1.80518C21.1495 1.80518 19.4995 3.45518 19.4995 5.55518V32.7802Z" fill="#cccccc"/>
        <path d="M15.7495 32.7054L21.7495 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541C9.74948 4.35541 8.77448 6.08041 9.22448 7.80541L15.7495 32.7054Z" fill="#cccccc"/>
        <path d="M2.99937 10.355C1.57437 11.03 1.12437 12.83 1.87437 14.33L11.7744 34.055L16.7994 31.505L6.89937 11.78C6.14937 10.28 4.42437 9.68 2.99937 10.355Z" fill="#cccccc"/>
        <path d="M46.2744 22.2801C45.0744 19.9551 41.3244 20.1051 37.4994 24.3051C34.7994 27.2301 34.2744 28.2051 31.5744 28.1301V25.0551C31.5744 25.0551 25.7994 20.7801 14.3244 22.7301C14.3244 22.7301 7.79945 23.6301 7.79945 27.0801C7.79945 27.0801 6.67445 35.4051 8.99945 40.6551C12.4494 48.4551 30.1494 50.4801 35.6994 37.2051C36.8244 34.5801 39.0744 32.6301 41.0994 30.1551C43.4244 27.1551 47.5494 24.7551 46.2744 22.2801Z" fill="#cccccc"/>
      </svg>
    </h1><br />
    <h3 className="home__subtitle">Développeur Full Stack JS · Data · IA</h3>
    <p className="home__description">
      Je conçois des applications web et solutions digitales modernes.
      Disponible pour un stage académique dès février 2027 — passionné par l'IA,
      le code propre et les interfaces qui impressionnent.
    </p>
    <div className="home__tech">
      {techPills.map(t => <span key={t} className="home__tech-pill">{t}</span>)}
    </div>
    <div className="home__cta">
      <Link to="/contact" className="button button--flex">
        Dites Bonjour
        <i className="uil uil-message button__icon" />
      </Link>
      <Link to="/portfolio" className="button button--ghost button--flex">
        Voir mon travail <i className="uil uil-arrow-right button__icon" />
      </Link>
    </div>
  </div>
);

export default Data;
