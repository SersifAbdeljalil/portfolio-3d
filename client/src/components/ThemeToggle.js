import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { t } = useTranslation();
  
  // État initial basé sur les préférences de l'utilisateur
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Vérifier si le thème est déjà enregistré
    const savedTheme = localStorage.getItem('theme');
   
    // Vérifier les préférences système
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
   
    // Utiliser le thème enregistré ou les préférences système
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });
 
  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
 
  // Appliquer le thème à l'ensemble du document
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
    >
      {isDarkMode ? (
        <Sun size={24} />
      ) : (
        <Moon size={24} />
      )}
    </button>
  );
}

export default ThemeToggle;