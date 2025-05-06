import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <Link to="/" className="footer-logo">
              <span>VN</span>
            </Link>
            <p className="footer-description">
              Développeur Full Stack & 3D spécialisé en React.js, Three.js et Node.js.
              Je crée des expériences web interactives et immersives.
            </p>
          </div>
          
          <div className="footer-links">
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/projects">Projets</Link></li>
              <li><Link to="/skills">Compétences</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:votre.email@example.com">votre.email@example.com</a></li>
              <li><a href="tel:+33600000000">+33 6 00 00 00 00</a></li>
              <li>Votre ville, Pays</li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h3>Réseaux sociaux</h3>
            <div className="social-links">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fa fa-github"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Votre Nom. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;