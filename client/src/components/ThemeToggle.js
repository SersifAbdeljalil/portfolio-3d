import React, { useState, useEffect } from 'react';

function ThemeToggle() {
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
      aria-label={isDarkMode ? "Passer au mode jour" : "Passer au mode nuit"}
    >
      {isDarkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
}

export default ThemeToggle;