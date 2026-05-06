import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { to: '/',         hash: '#home',         icon: 'uil-estate',         label: 'Accueil'     },
  { to: '/',         hash: '#about',        icon: 'uil-user',           label: 'À propos'    },
  { to: '/',         hash: '#skills',       icon: 'uil-brackets-curly', label: 'Compétences' },
  { to: '/',         hash: '#services',     icon: 'uil-briefcase-alt',  label: 'Services'    },
  { to: '/',         hash: '#testimonials', icon: 'uil-chat',           label: 'Avis'        },
  { to: '/portfolio',hash: '',              icon: 'uil-scenery',        label: 'Portfolio'   },
  { to: '/blog',     hash: '',              icon: 'uil-newspaper',      label: 'Blog'        },
  { to: '/contact',  hash: '',              icon: 'uil-message',        label: 'Contact'     },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeHash,  setActiveHash]  = useState('#home');
  const [scrolled,    setScrolled]    = useState(false);

  /* Active section on scroll (only on home) */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >= 80);
      if (location.pathname !== '/') return;
      const sectionIds = navLinks.filter(l => l.to === '/' && l.hash).map(l => l.hash.slice(1));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveHash(`#${sectionIds[i]}`);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openMenu  = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (link) => {
    if (link.to === '/portfolio') return location.pathname === '/portfolio';
    if (link.to === '/blog')      return location.pathname === '/blog';
    if (link.to === '/contact')   return location.pathname === '/contact';
    return location.pathname === '/' && activeHash === link.hash;
  };

  const handleSectionClick = (e, hash) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHash(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <>
      {menuOpen && (
        <div
          className="nav__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className={`header${scrolled ? ' scroll-header' : ''}`}>
        <nav className="nav container">

          <Link to="/" className="nav__logo" onClick={closeMenu}>
            Darryck <span className="nav__logo-dot" />
          </Link>

          <div className={`nav__menu${menuOpen ? ' show-menu nav__menuf' : ''}`}>

            <button
              type="button"
              className="nav__close"
              onClick={closeMenu}
              aria-label="Fermer le menu"
            >
              <i className="uil uil-times" />
            </button>

            <ul className="nav__list">
              {navLinks.map((link) => {
                const active = isActive(link);
                const className = `nav__link${active ? ' active-link' : ''}`;
                const iconEl = <i className={`uil ${link.icon} nav__icon`} />;
                const labelEl = <span className="nav__label">{link.label}</span>;

                if (link.hash) {
                  // Section anchor on home
                  return (
                    <li key={link.label} className="nav__item">
                      <a
                        href={`${link.to === '/' ? '' : link.to}${link.hash}`}
                        onClick={(e) => handleSectionClick(e, link.hash)}
                        className={className}
                      >
                        {iconEl}{labelEl}
                      </a>
                    </li>
                  );
                }

                // Dedicated route (Blog, Contact)
                return (
                  <li key={link.label} className="nav__item">
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className={className}
                    >
                      {iconEl}{labelEl}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="nav__toggle"
            onClick={openMenu}
            aria-label="Ouvrir le menu"
          >
            <i className="uil uil-apps" />
          </button>

        </nav>
      </header>
    </>
  );
};

export default Header;
