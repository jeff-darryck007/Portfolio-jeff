import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const socials = [
  { href: 'mailto:jeffdarryck@gmail.com',                                                                                  icon: 'uil-envelope',     label: 'Email'    },
  { href: 'tel:+32465573136',                                                                                              icon: 'uil-phone',        label: 'Tél'      },
  { href: 'https://www.linkedin.com/in/jeff-tchinda-223088404?utm_source=share_via&utm_content=profile&utm_medium=member_ios', icon: 'uil-linkedin-alt', label: 'LinkedIn' },
  { href: 'https://wa.me/32465573136?text=Salut%20Darryck',                                                                icon: 'uil-whatsapp',     label: 'WhatsApp' },
  { href: 'https://github.com/jeff-darryck007',                                                                            icon: 'uil-github-alt',   label: 'GitHub'   },
];

const navItems = [
  { to: '/#about',        label: 'À propos'   },
  { to: '/portfolio',     label: 'Portfolio'  },
  { to: '/blog',          label: 'Blog'       },
  { to: '/#testimonials', label: 'Témoignages'},
  { to: '/contact',       label: 'Contact'    },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__container container">
      <Link to="/" className="footer__logo">Darryck<span className="footer__logo-dot" /></Link>
      <ul className="footer__list">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="footer__link">{label}</Link>
          </li>
        ))}
      </ul>
      <div className="footer__social">
        {socials.map(({ href, icon, label }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="footer__social-link" aria-label={label}>
            <i className={`uil ${icon}`} />
          </a>
        ))}
      </div>
      <span className="footer__copy">© <span>{new Date().getFullYear()}</span> Jeff Tchinda Darryck · Tous droits réservés</span>
    </div>
  </footer>
);
export default Footer;
