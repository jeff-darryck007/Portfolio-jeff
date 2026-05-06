import React from 'react';
import './Skills.css';
import Frontend from './Frontend';
import Backend  from './Backend';
import Design   from './Design';

const Skills = () => (
  <section className="skills section" id="skills">
    <span className="section__subtitle">Ce que je maîtrise</span>
    <h2 className="section__title reveal">Mes Compétences</h2>
    <div className="skills__container container grid">
      <Frontend />
      <Backend  />
      <Design   />
    </div>
  </section>
);
export default Skills;
