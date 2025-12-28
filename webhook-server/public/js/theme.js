/**
 * Theme Toggle Functionality
 * Manages dark/light theme switching with system preference detection
 * and localStorage persistence.
 */
(function() {
  'use strict';

  const THEME_KEY = '1000pages-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  /**
   * Get the user's preferred theme from localStorage or system preference
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
  }

  /**
   * Apply the theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update body class for additional styling hooks
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(theme === DARK_THEME ? 'dark-mode' : 'light-mode');
  }

  /**
   * Save theme preference to localStorage
   */
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    applyTheme(newTheme);
    saveTheme(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    // Set up toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only update if user hasn't set a manual preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
