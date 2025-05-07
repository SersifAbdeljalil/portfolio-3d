import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import logoDark from './assets/images/logo.png';       // Logo pour mode sombre
import logoLight from './assets/images/logo-claire.png'; // Logo pour mode clair

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // ✅ Détection du thème actif (dark / light)
  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      setIsDarkMode(matchDark.matches || document.documentElement.classList.contains('dark'));
    };

    matchDark.addEventListener('change', updateTheme);
    updateTheme(); // initial load

    return () => {
      matchDark.removeEventListener('change', updateTheme);
    };
  }, []);

  return (
    <header className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
       

          {/* Navigation Desktop */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li className={isActive('/') ? 'active' : ''}><Link to="/">Accueil</Link></li>
              <li className={isActive('/about') ? 'active' : ''}><Link to="/about">À propos</Link></li>
              <li className={isActive('/skills') ? 'active' : ''}><Link to="/skills">Compétences</Link></li>
              <li className={isActive('/projects') ? 'active' : ''}><Link to="/projects">Projets</Link></li>
              <li className={isActive('/contact') ? 'active' : ''}><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <ThemeToggle />

          {/* Menu Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Mobile */}
          <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li className={isActive('/') ? 'active' : ''}><Link to="/">Accueil</Link></li>
              <li className={isActive('/about') ? 'active' : ''}><Link to="/about">À propos</Link></li>
              <li className={isActive('/skills') ? 'active' : ''}><Link to="/skills">Compétences</Link></li>
              <li className={isActive('/projects') ? 'active' : ''}><Link to="/projects">Projets</Link></li>
              <li className={isActive('/contact') ? 'active' : ''}><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="mobile-theme-toggle"><ThemeToggle /></div>
          </nav>
        </div>
      </div>

      {/* ✅ Style intégré */}
      <style jsx>{`
        .logo-image {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: filter 0.3s ease;
        }
      `}</style>
    </header>
  );
}

export default Navigation;
