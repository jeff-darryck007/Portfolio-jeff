import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './Services.css';

const servicesData = [
  {
    id: 1,
    icon: 'uil-monitor',
    color: '#7B61FF',
    title: 'Développement Web Full Stack',
    desc: 'Applications web complètes, de l\'interface utilisateur à l\'API, déploiement inclus.',
    modalDesc: 'Plus de 4 ans d\'expérience sur des projets variés : e-commerce, SaaS, dashboards. Je prends en charge l\'intégralité du cycle de développement.',
    items: [
      { icon: 'uil-react',    text: 'Interfaces modernes et réactives avec React, Next.js, TypeScript.' },
      { icon: 'uil-server',   text: 'APIs robustes et sécurisées avec Node.js, ExpressJS, NestJS.' },
      { icon: 'uil-database', text: 'Bases de données SQL et NoSQL : PostgreSQL, MongoDB, Supabase.' },
      { icon: 'uil-rocket',   text: 'Déploiement CI/CD, Vercel, optimisation des performances.' },
    ],
  },
  {
    id: 2,
    icon: 'uil-layers-alt',
    color: '#F59E0B',
    title: 'UI/UX Design & Intégration',
    desc: 'Interfaces modernes pixel-perfect, expérience utilisateur optimisée, prototypes interactifs.',
    modalDesc: 'Conception centrée utilisateur avec un fort sens du détail visuel. Je crée des maquettes et les intègre avec précision.',
    items: [
      { icon: 'uil-vector-square', text: 'Maquettes Figma et prototypes interactifs haute fidélité.' },
      { icon: 'uil-paint-tool',    text: 'Intégration responsive HTML5 / CSS3 / TailwindCSS pixel-perfect.' },
      { icon: 'uil-star',          text: 'Micro-animations et transitions fluides (Framer Motion).' },
      { icon: 'uil-search-alt',    text: 'Audit UX et amélioration d\'interfaces existantes.' },
    ],
  },
];

/* ── Modal component ── */
const ServiceModal = ({ service, onClose }) => {
  useEffect(() => {
    if (!service) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  if (!service) return null;

  return createPortal(
    <div
      className="svc-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="svc-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div className="svc-modal__header" style={{ '--svc-color': service.color }}>
          <i className={`uil ${service.icon} svc-modal__icon`} />
          <button
            type="button"
            className="svc-modal__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <i className="uil uil-times" />
          </button>
        </div>

        {/* Body */}
        <div className="svc-modal__body">
          <h3 className="svc-modal__title">{service.title}</h3>
          <p className="svc-modal__desc">{service.modalDesc}</p>

          <ul className="svc-modal__list">
            {service.items.map((item, i) => (
              <li key={i} className="svc-modal__item">
                <span className="svc-modal__item-icon" style={{ '--svc-color': service.color }}>
                  <i className={`uil ${item.icon}`} />
                </span>
                <span className="svc-modal__item-text">{item.text}</span>
              </li>
            ))}
          </ul>

          <Link to="/contact" onClick={onClose} className="button button--accent button--flex" style={{ marginTop: '1.5rem' }}>
            Me contacter <i className="uil uil-message button__icon" />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="services section" id="services">
      <span className="section__subtitle">Ce que j'offre</span>
      <h2 className="section__title reveal">Mes Services</h2>

      <div className="services__container container grid">
        {servicesData.map(({ id, icon, color, title, desc }, i) => (
          <div key={id} className={`services__card reveal d${i + 1}`}>
            {/* Top color bar */}
            <div className="services__card-bar" style={{ background: color }} />

            <div className="services__card-body">
              <span className="services__card-icon" style={{ '--svc-color': color }}>
                <i className={`uil ${icon}`} />
              </span>
              <h3 className="services__card-title">{title}</h3>
              <p className="services__card-desc">{desc}</p>

              <button
                type="button"
                className="services__card-btn"
                onClick={() => setActiveService(servicesData.find(s => s.id === id))}
              >
                Voir plus <i className="uil uil-arrow-right" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </section>
  );
};

export default Services;
