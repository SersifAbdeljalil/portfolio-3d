import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
      title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
    >
      {isDarkMode ? (
        <Sun size={24} color="#c4b5fd" />
      ) : (
        <Moon size={24} color="#8b5cf6" />
      )}
      <style jsx>{`
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          background-color: rgba(139, 92, 246, 0.2);
          transform: scale(1.1);
        }
        .theme-toggle:focus {
          outline: 2px solid #c4b5fd;
          outline-offset: 2px;
        }
      `}</style>
    </button>
  );
}

export default ThemeToggle;