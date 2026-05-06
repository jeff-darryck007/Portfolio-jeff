import React from 'react';
const skills = [
  { name: 'Vue.js',     pct: 65 },
  { name: 'Symfony',    pct: 70 },
  { name: 'JavaScript',  pct: 70 },
  { name: 'HTML5/CSS3',  pct: 95 },
  { name: 'Bootstrap',   pct: 90 },
];
const Frontend = () => (
  <div className="skills__content reveal-scale d1">
    <h3 className="skills__title"><i className="uil uil-brackets-curly skills__title-icon" />Frontend</h3>
    {skills.map(({ name, pct }) => (
      <div key={name} className="skills__item">
        <div className="skills__info">
          <span className="skills__name">{name}</span>
          <span className="skills__percentage">{pct}%</span>
        </div>
        <div className="skills__bar-bg"><div className="skills__bar" style={{ '--skill-pct': `${pct}%` }} /></div>
      </div>
    ))}
  </div>
);
export default Frontend;
