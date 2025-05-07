import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { Menu, X } from 'lucide-react';
import logoDark from './assets/images/logo.png';
import logoLight from './assets/images/logo-claire.png';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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

  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      setIsDarkMode(matchDark.matches || document.documentElement.classList.contains('dark'));
    };
    matchDark.addEventListener('change', updateTheme);
    updateTheme();
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
              <li className={isActive('/') ? 'active' : ''}><Link to="/">{t('nav.home')}</Link></li>
              <li className={isActive('/about') ? 'active' : ''}><Link to="/about">{t('nav.about')}</Link></li>
              <li className={isActive('/skills') ? 'active' : ''}><Link to="/skills">{t('nav.skills')}</Link></li>
              <li className={isActive('/projects') ? 'active' : ''}><Link to="/projects">{t('nav.projects')}</Link></li>
              <li className={isActive('/contact') ? 'active' : ''}><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <LanguageSelector />
            <ThemeToggle />
          </div>

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
              <li className={isActive('/') ? 'active' : ''}><Link to="/">{t('nav.home')}</Link></li>
              <li className={isActive('/about') ? 'active' : ''}><Link to="/about">{t('nav.about')}</Link></li>
              <li className={isActive('/skills') ? 'active' : ''}><Link to="/skills">{t('nav.skills')}</Link></li>
              <li className={isActive('/projects') ? 'active' : ''}><Link to="/projects">{t('nav.projects')}</Link></li>
              <li className={isActive('/contact') ? 'active' : ''}><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
            <div className="mobile-actions">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
      {/* Style intégré */}
      <style jsx>{`
        .logo-image {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: filter 0.3s ease;
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
        }
        
        .mobile-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
      `}</style>
    </header>
  );
}

export default Navigation;