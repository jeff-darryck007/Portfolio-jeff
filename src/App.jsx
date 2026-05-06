import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Cursor          from './components/cursor/Cursor';
import Header          from './components/header/Header';
import Footer          from './components/footer/Footer';
import Scrollup        from './components/scrollup/Scrollup';
import HomePage        from './pages/HomePage';
import BlogPage        from './pages/BlogPage';
import ContactPage     from './pages/ContactPage';
import PortfolioPage   from './pages/PortfolioPage';
import useScrollReveal from './hooks/useScrollReveal';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

function App() {
  useScrollReveal();
  return (
    <>
      {/* Aurora background */}
      <div className="bg-aurora" aria-hidden="true">
        <div className="bg-aurora__gradient" />
        <div className="bg-aurora__dots" />
        <div className="bg-aurora__dots" />
        <div className="bg-aurora__dots" />
      </div>

      <Cursor />
      <Header />
      <ScrollToTop />

      <main className="main">
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog"      element={<BlogPage />} />
          <Route path="/contact"   element={<ContactPage />} />
          <Route path="*"          element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <Scrollup />
    </>
  );
}

export default App;
