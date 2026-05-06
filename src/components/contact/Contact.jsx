import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const contactCards = [
  { icon: 'uil-envelope',    title: 'Email',    data: 'jeffdarryck@gmail.com', href: 'mailto:jeffdarryck@gmail.com', label: 'Écrire un email' },
  { icon: 'uil-whatsapp',    title: 'WhatsApp', data: '+32 465 57 31 36',                    href: 'https://wa.me/32465573136?text=Salut%20Darryck', label: 'Écrire sur WhatsApp' },
  { icon: 'uil-linkedin-alt',title: 'LinkedIn', data: 'Jeff Tchinda Darryck',               href: 'https://www.linkedin.com/in/jeff-tchinda-223088404?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'Voir le profil' },
];

const Contact = () => {
  const form = useRef();
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

    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),     
      date: dateEnvoi,                     
    };

    emailjs
      .send(
        'service_go7h6sw',      // Service ID
        'template_zrlkgyi',     // Template ID (celui du contact)
        templateParams,
        'cOUmblfZl2n7AO-u7'     // Public Key
      )
      .then((response) => {
        console.log('Message envoyé avec succès !', response.status, response.text);
        setStatus({ message: 'Message envoyé ✅', type: 'success' });
        e.target.reset();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi :', error);
        setStatus({ message: "Échec de l'envoi ❌. Réessayez.", type: 'error' });
      });

    setTimeout(() => {
      setStatus({ message: '', type: '' });
    }, 4000);
  };

  return (
    <section className="contact section" id="contact">
      <span className="section__subtitle">Travaillons ensemble</span>
      <h2 className="section__title reveal">Entrer en contact</h2>

      <div className="contact__container container grid">
        <div className="reveal-left d2">
          <h3 className="contact__title">Parlons de votre projet</h3>
          <div className="contact__info">
            {contactCards.map(({ icon, title, data, href, label }) => (
              <div key={title} className="contact__card">
                <div className="contact__card-icon-wrap">
                  <i className={`uil ${icon} contact__card-icon`} />
                </div>
                <div className="contact__card-body">
                  <h3 className="contact__card-title">{title}</h3>
                  <span className="contact__card-data">{data}</span>
                  <a href={href} target="_blank" rel="noreferrer" className="contact__button">
                    Contacter <i className="uil uil-arrow-right contact__button-icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-right d2">
          <h3 className="contact__title">Envoyez-moi un message</h3>
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Nom</label>
              <input
                type="text"
                name="name"
                className="contact__form-input"
                placeholder="Votre nom complet…"
                required
              />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Email</label>
              <input
                type="email"
                name="email"
                className="contact__form-input"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="contact__form-div contact__form-area">
              <label className="contact__form-tag">Message</label>
              <textarea
                name="message"
                className="contact__form-input"
                placeholder="Décrivez votre projet…"
                required
              />
            </div>

            <button type="submit" className="button button--flex">
              Envoyer le message <i className="uil uil-message button__icon" />
            </button>
          </form>
        </div>
      </div>

      {status.message && <div className={`toast ${status.type}`}>{status.message}</div>}
    </section>
  );
};

export default Contact;