import React from 'react';
const skills = [
  { name: 'Symfony',     pct: 70 },
  { name: 'PHP',  pct: 85 },
  { name: 'SQL',  pct: 80 },
  { name: 'Vue.js',  pct: 65 },
  { name: 'API REST',  pct: 65 },
  { name: 'PostgreSQL',  pct: 70 },

];
const Backend = () => (
  <div className="skills__content reveal-scale d2">
    <h3 className="skills__title"><i className="uil uil-server skills__title-icon" />Backend & BDD</h3>
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
export default Backend;
