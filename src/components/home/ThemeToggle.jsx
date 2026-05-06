import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  const handleClick = (e) => {
    const x = e.clientX, y = e.clientY;
    document.body.style.setProperty('--wave-x', `${x}px`);
    document.body.style.setProperty('--wave-y', `${y}px`);
    document.body.classList.add('animating');
    setTimeout(() => {
      setDark(d => !d);
      setTimeout(() => document.body.classList.remove('animating'), 600);
    }, 50);
  };
  return (
    <button onClick={handleClick} className="theme-toggle" aria-label="Toggle theme">
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          <i className={`uil ${dark ? 'uil-sun' : 'uil-moon'}`} />
        </span>
      </span>
    </button>
  );
};
export default ThemeToggle;
