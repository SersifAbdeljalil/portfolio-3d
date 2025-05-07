import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Vérifier si le lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Détecter le scroll pour changer l'apparence de la navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Désactiver le défilement lorsque le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  return (
    <header className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <span className="logo-text">S-_-A</span>
          </Link>

          {/* Navigation Bureau */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li className={isActive('/') ? 'active' : ''}>
                <Link to="/">Accueil</Link>
              </li>
              <li className={isActive('/about') ? 'active' : ''}>
                <Link to="/about">À propos</Link>
              </li>
              <li className={isActive('/skills') ? 'active' : ''}>
                <Link to="/skills">Compétences</Link>
              </li>
              <li className={isActive('/projects') ? 'active' : ''}>
                <Link to="/projects">Projets</Link>
              </li>
              <li className={isActive('/contact') ? 'active' : ''}>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          
          {/* Bouton de basculement de thème */}
          <ThemeToggle />

          {/* Bouton Menu Mobile */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navigation"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>

          {/* Navigation Mobile */}
          <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li className={isActive('/') ? 'active' : ''}>
                <Link to="/">Accueil</Link>
              </li>
              <li className={isActive('/about') ? 'active' : ''}>
                <Link to="/about">À propos</Link>
              </li>
              <li className={isActive('/skills') ? 'active' : ''}>
                <Link to="/skills">Compétences</Link>
              </li>
              <li className={isActive('/projects') ? 'active' : ''}>
                <Link to="/projects">Projets</Link>
              </li>
              <li className={isActive('/contact') ? 'active' : ''}>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            
            {/* Version mobile du toggle de thème */}
            <div className="mobile-theme-toggle">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navigation;