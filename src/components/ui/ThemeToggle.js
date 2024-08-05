'use client'

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.querySelector('html')?.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">☀️</div>
      <div className="swap-off">🌚</div>
    </label>
  );
};

export default ThemeToggle;
