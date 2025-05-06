import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Navigation.css';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("/");
  
  const location = useLocation();
  const nav = useRef(null);
  const menuToggleRef = useRef(null);
  const navItemsRefs = useRef([]);
  
  // Mettre à jour l'élément actif de navigation
  useEffect(() => {
    setActiveNavItem(location.pathname);
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Écouter le défilement pour changer l'apparence de la navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation de l'indicateur de navigation
  useEffect(() => {
    const navItems = navItemsRefs.current;
    if (navItems.length === 0) return;
    
    // Trouver l'élément actif
    const activeItem = navItems.find(
      item => item && item.getAttribute('data-path') === activeNavItem
    );
    
    if (activeItem) {
      const indicator = document.querySelector('.nav-indicator');
      if (!indicator) return;
      
      // Obtenir la position de l'élément actif
      const rect = activeItem.getBoundingClientRect();
      const navRect = nav.current.getBoundingClientRect();
      
      // Animer l'indicateur vers l'élément actif
      gsap.to(indicator, {
        left: rect.left - navRect.left,
        width: rect.width,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [activeNavItem, mobileMenuOpen]);
  
  // Animation d'entrée de la navigation
  useEffect(() => {
    // Animation initiale
    const tl = gsap.timeline();
    
    tl.from(nav.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5
    })
    .from(navItemsRefs.current, {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4");
  }, []);
  
  // Gérer l'ouverture/fermeture du menu mobile
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Routes de navigation
  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/about", label: "À propos" },
    { path: "/projects", label: "Projets" },
    { path: "/skills", label: "Compétences" },
    { path: "/contact", label: "Contact" }
  ];
  
  return (
    <header 
      className={`navigation ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
      ref={nav}
    >
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <span className="logo-text">VN</span>
          </Link>

          {/* Navigation Bureau */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <div className="nav-indicator"></div>
              
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className={activeNavItem === item.path ? 'active' : ''}
                  ref={(el) => navItemsRefs.current[index] = el}
                  data-path={item.path}
                >
                  <Link to={item.path} className="nav-link">
                    <span className="nav-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bouton Menu Mobile */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            ref={menuToggleRef}
            aria-label="Menu de navigation"
          >
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </button>

          {/* Navigation Mobile */}
          <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-container">
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <li 
                    key={index} 
                    className={activeNavItem === item.path ? 'active' : ''}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mobile-nav-footer">
                <div className="social-links">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                
                <div className="mobile-contact">
                  <a href="mailto:votre.email@example.com">votre.email@example.com</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navigation;