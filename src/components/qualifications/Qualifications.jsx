import React, { useState } from 'react';
import './Qualifications.css';

const education = [
  { title: '2eme Année Web Dev & 1ere Année bachelier informatique ( développement d\'applications)', sub: 'EAFC Namur-Cadets',                    dates: '2025 – 2026', side: 'left'  },
  { title: '1ere Année Web Dev', sub: 'EAFC Namur-Cadets',                    dates: '2024 – 2025', side: 'right'  },
  { title: 'BTS (Bac+2)',         sub: 'ICAB',                        dates: '2023 – 2024', side: 'left' },
  { title: 'Baccalauréat D',      sub: 'Collège Aloys Tapieméné-Mbouda',    dates: '2021 – 2022', side: 'right'  },
  { title: 'Probatoire D',        sub: 'Collège Aloys Tapieméné-Mbouda',    dates: '2020 – 2021', side: 'left' },
];
const experience = [
  { title: 'Formation sur les outils de design et developpement d\'applications', sub: 'Sm@rtDiso',                  dates: '2023 – 2024', side: 'right' },
  { title: 'Stage - Développement d\'applications',       sub: 'Univers Binaire - Cameroun',             dates: '3 mois', side: 'left' },
];

const TimelineItem = ({ item }) => {
  const isLeft = item.side === 'left';
  return (
    <div className="qualification__data">
      <div className={isLeft ? 'qualification__text-left' : ''}>
        {isLeft && <>
          <h3 className="qualification__title">{item.title}</h3>
          {item.sub && <span className="qualification__subtitle">{item.sub}</span>}
          <div className="qualification__calendar"><i className="uil uil-calendar-alt" /> {item.dates}</div>
        </>}
      </div>
      <div>
        <span className="qualification__rounder" />
        <span className="qualification__line" />
      </div>
      <div className={!isLeft ? 'qualification__text-right' : ''}>
        {!isLeft && <>
          <h3 className="qualification__title">{item.title}</h3>
          {item.sub && <span className="qualification__subtitle">{item.sub}</span>}
          <div className="qualification__calendar"><i className="uil uil-calendar-alt" /> {item.dates}</div>
        </>}
      </div>
    </div>
  );
};

const Qualifications = () => {
  const [tab, setTab] = useState(1);
  return (
    <section className="qualification section">
      <span className="section__subtitle">Mon parcours</span>
      <h2 className="section__title reveal">Mes Qualifications</h2>
      <div className="qualification__container container">
        <div className="qualification__tabs reveal d1">
          <button className={`qualification__button${tab===1?' qualification__active':''}`} onClick={()=>setTab(1)}>
            <i className="uil uil-graduation-cap qualification__icon" /> Éducation
          </button>
          <button className={`qualification__button${tab===2?' qualification__active':''}`} onClick={()=>setTab(2)}>
            <i className="uil uil-briefcase-alt qualification__icon" /> Expérience
          </button>
        </div>
        <div className="qualification__sections">
          <div className={`qualification__content${tab===1?' qualification__content-active':''}`}>
            {education.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
          <div className={`qualification__content${tab===2?' qualification__content-active':''}`}>
            {experience.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Qualifications;
