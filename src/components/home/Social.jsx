import React from 'react';
import ThemeToggle from './ThemeToggle';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/jeff-tchinda-223088404?utm_source=share_via&utm_content=profile&utm_medium=member_ios', icon: 'uil-linkedin-alt', label: 'LinkedIn' },
  { href: 'https://wa.me/32465573136?text=Salut%20Darryck', icon: 'uil-whatsapp', label: 'WhatsApp' },
  { href: 'mailto:jeffdarryck@gmail.com', icon: 'uil-envelope', label: 'Email' },
  { href: 'https://github.com/jeff-darryck007', icon: 'uil-github-alt', label: 'GitHub' },
  { href: 'tel:+32465573136', icon: 'uil-phone', label: 'Téléphone' },
];

const Social = () => (
  <div className="home__social">
    {socialLinks.map(({ href, icon, label }) => (
      <a key={href} href={href} target="_blank" rel="noreferrer" className="home__social-icon" aria-label={label}>
        <i className={`uil ${icon}`} />
      </a>
    ))}
    <ThemeToggle />
  </div>
);
export default Social;
