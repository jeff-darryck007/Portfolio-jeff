import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* ─── COMPOSANT : Placeholder (Pour éviter la répétition) ─── */
const ImagePlaceholder = ({ className }) => (
  <div className={className + " work__img-placeholder"}>
    <i className="uil uil-image-v placeholder-icon" />
    <span className="placeholder-text">Aperçu non disponible</span>
  </div>
);

/* ─── COMPOSANT : ProjectModal ────────────────────────────── */
const ProjectModal = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden'; // Bloque le scroll arrière
    
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-detail" onClick={(e) => e.stopPropagation()}>
        {/* Bouton de fermeture */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <i className="uil uil-times" />
        </button>

        {/* IMAGE OU PLACEHOLDER */}
        {item.image ? (
          <img src={item.image} alt={item.title} className="modal-image" />
        ) : (
          <div className="modal-img-placeholder">
             <i className="uil uil-image-v placeholder-icon" />
          </div>
        )}

        <div className="modal-info">
          <div className="modal-info__top">
            <div>
              <span className="work__category-tag">{item.category}</span>
              <h3 className="modal-info__title">{item.title}</h3>
            </div>
          </div>

          <p className="modal-info__desc">{item.desc}</p>

          {item.tech && (
            <div className="work__tech">
              {item.tech.map(t => (
                <span key={t} className="work__tech-tag">{t}</span>
              ))}
            </div>
          )}

          <div className="modal-info__actions">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="button button--accent button--flex"
              >
                <i className="uil uil-external-link-alt" /> Voir le site
              </a>
            ) : (
              <Link to="/contact" onClick={onClose} className="button button--ghost button--flex">
                <i className="uil uil-message" /> Me contacter
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─── COMPOSANT PRINCIPAL : Workitems ─────────────────────── */
const Workitems = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="work__card reveal-scale">
        {/* Header de la carte : Image + Overlay */}
        <div className="work__img-wrap">
          {item.image ? (
            <img src={item.image} alt={item.title} className="work__img" loading="lazy" />
          ) : (
            <div className="work__img-placeholder">
               <i className="uil uil-android placeholder-icon" />
            </div>
          )}
          
          <div className="work__overlay">
            <button className="work__overlay-btn" onClick={() => setOpen(true)}>
              <i className="uil uil-expand-arrows-alt" /> Détails
            </button>
            
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="work__overlay-btn work__overlay-btn--secondary"
              >
                <i className="uil uil-external-link-alt" /> Voir
              </a>
            )}
          </div>
        </div>

        {/* Corps de la carte */}
        <div className="work__body">
          <div className="work__body-top">
            <div>
              <h3 className="work__title">{item.title}</h3>
              <span className="work__category-tag">{item.category}</span>
            </div>
            
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="work__link-btn"
                title="Voir le site"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="uil uil-external-link-alt" />
              </a>
            )}
          </div>

          {item.desc && <p className="work__desc">{item.desc}</p>}

          {item.tech && (
            <div className="work__tech">
              {item.tech.slice(0, 3).map(t => (
                <span key={t} className="work__tech-tag">{t}</span>
              ))}
              {item.tech.length > 3 && (
                <span className="work__tech-tag work__tech-tag--more">+{item.tech.length - 3}</span>
              )}
            </div>
          )}

          <button className="work__details-btn" onClick={() => setOpen(true)}>
            Voir les détails <i className="uil uil-arrow-right" />
          </button>
        </div>
      </div>

      {/* Modal rendue via Portail */}
      <ProjectModal item={open ? item : null} onClose={() => setOpen(false)} />
    </>
  );
};

export default Workitems;