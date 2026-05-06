import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home           from '../components/home/Home';
import About          from '../components/about/About';
import Skills         from '../components/skills/Skills';
import Services       from '../components/services/Services';
import Qualifications from '../components/qualifications/Qualifications';
import Testimonial    from '../components/testimonials/Testimonial';

const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);

  return (
    <>
      <Home />
      <About />
      <Skills />
      <Services />
      <Qualifications />
      <Testimonial />
    </>
  );
};

export default HomePage;
