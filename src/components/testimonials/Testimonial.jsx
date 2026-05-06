import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Testimonial.css';
import { Data } from './Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonial = () => {
  const formavis = useRef();
  const [status, setStatus] = useState({ message: '', type: '' });

  const sendEmail = (e) => {
    e.preventDefault();

    // === Génération de la date d'envoi ===
    const maintenant = new Date();
    const dateEnvoi = maintenant.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' à ' + maintenant.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Récupération des valeurs du formulaire
    const formData = new FormData(e.target);

    // Objet à envoyer à EmailJS (doit correspondre aux variables de ton template)
    const templateParams = {
      name: formData.get('name') || 'Anonyme',
      message: formData.get('message'),
      date: dateEnvoi,           // ← Variable pour la date
    };

    emailjs
      .send(
        'service_go7h6sw',      // ton Service ID
        'template_zrlkgyi',     // ton Template ID
        templateParams,
        'cOUmblfZl2n7AO-u7'     // ta Public Key
      )
      .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
        setStatus({ message: 'Merci pour votre avis ✅', type: 'success' });
        e.target.reset();       // Reset du formulaire
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi :', error);
        setStatus({ message: "Échec de l'envoi ❌. Réessayez.", type: 'error' });
      });

    // Reset du message de status après 4 secondes
    setTimeout(() => {
      setStatus({ message: '', type: '' });
    }, 4000);
  };

  return (
    <section className="testimonial section" id="testimonials">
      <span className="section__subtitle">Ce qu'ils disent</span>
      <h2 className="section__title reveal">Témoignages clients</h2>

      <div className="container">
        {/* Swiper des témoignages existants */}
        <Swiper
          className="testimonial__container reveal d2"
          loop
          grabCursor
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2, spaceBetween: 32 },
          }}
          modules={[Pagination, Autoplay]}
        >
          {Data.map(({ id, title, description }) => (
            <SwiperSlide className="testimonial__card" key={id}>
              <h3 className="testimonial__name">— {title}</h3>
              <p className="testimonial__description">{description}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Formulaire pour ajouter un avis */}
        <div className="testimonial__add reveal d3">
          <h3 className="testimonial__add-title">Laissez votre avis</h3>
          <span className="testimonial__add-sub">Votre retour compte énormément ✨</span>

          <form className="testimonial__form" ref={formavis} onSubmit={sendEmail}>
            <div className="testimonial__form-div">
              <label className="testimonial__form-tag">Nom</label>
              <input
                type="text"
                name="name"
                className="testimonial__form-input"
                placeholder="Votre prénom & nom..."
                required
              />
            </div>

            <div className="testimonial__form-div testimonial__form-div--area">
              <label className="testimonial__form-tag">Commentaire</label>
              <textarea
                name="message"
                className="testimonial__form-input"
                placeholder="Partagez votre expérience..."
                required
              />
            </div>

            <button
              type="submit"
              className="button button--accent button--flex"
              style={{ alignSelf: 'center' }}
            >
              Envoyer mon avis <i className="uil uil-message button__icon" />
            </button>
          </form>

          <p className="testimonial__note">
            Votre témoignage sera ajouté après validation. Merci !
          </p>
        </div>
      </div>

      {status.message && <div className={`toast ${status.type}`}>{status.message}</div>}
    </section>
  );
};

export default Testimonial;