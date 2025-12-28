'use client';

import { useEffect, useState } from 'react';

const THEME_KEY = '1000pages-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(newTheme === DARK_THEME ? 'dark-mode' : 'light-mode');
    localStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    if (!mounted) return;

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        const theme = e.matches ? DARK_THEME : LIGHT_THEME;
        document.documentElement.setAttribute('data-theme', theme);
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(theme === DARK_THEME ? 'dark-mode' : 'light-mode');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [mounted]);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">1000pages</div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark/light theme"
          type="button"
        >
          <span className="theme-toggle-icon"></span>
        </button>
      </nav>
    </header>
  );
}
