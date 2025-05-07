import React, { useState, useEffect } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Récupérer le thème du localStorage ou utiliser les préférences système par défaut
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });
  
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
    return <LoadingScreen />;
  }
  
  return (
    <Router>
      <div className="app">
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
  );
}

export default App;