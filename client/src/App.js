import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import BackgroundScene from './components/BackgroundScene';

// Import pour i18n
import './i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Récupérer le thème du localStorage ou utiliser les préférences système par défaut
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
   
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });
 
  // Appliquer la direction RTL/LTR en fonction de la langue
  useEffect(() => {
    // Si la langue est arabe, appliquer le style RTL, sinon LTR
    if (i18n.language === 'ar') {
      document.body.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.documentElement.classList.remove('rtl');
    }
  }, [i18n.language]);
 
  // Simuler un chargement
  useEffect(() => {
    // Observer les changements de thème
    const handleThemeChange = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
   
    // Observer les changements d'attribut sur HTML
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true });
   
    // Simuler un temps de chargement pour l'écran de démarrage
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
   
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
 
  // Appliquer la classe appropriée au body basée sur le thème
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('with-3d-background');
    } else {
      document.body.classList.remove('with-3d-background');
    }
  }, [isDarkMode]);
 
  if (loading) {
    return (
      <Suspense fallback={<div>Chargement...</div>}>
        <LoadingScreen />
      </Suspense>
    );
  }
 
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Router>
        <div className={`app ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
          <BackgroundScene />
          <Navigation />
         
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
         
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;