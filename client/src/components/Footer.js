import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from 'lucide-react';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <Link to="/" className="footer-logo">
              <span>Sersif Abdeljalil</span>
            </Link>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
         
          <div className="footer-links">
            <h3>{t('footer.navigation')}</h3>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/skills">{t('nav.skills')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
         
          <div className="footer-contact">
            <h3>{t('footer.contact')}</h3>
            <ul>
              <li>
                <a href="mailto:abdosarsif28@gmail.com">
                  <Mail size={16} className="contact-icon" />
                  <span>abdosarsif28@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+212 695489581">
                  <Phone size={16} className="contact-icon" />
                  <span>+212 695489581</span>
                </a>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Eljadida, Maroc</span>
              </li>
            </ul>
          </div>
         
          <div className="footer-social">
            <h3>{t('footer.socialNetworks')}</h3>
            <div className="social-links">
              <a href="https://github.com/SersifAbdeljalil" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/aabdeljalil-sersif-803624339/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://web.facebook.com/profile.php?id=100023069885044&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" aria-label="facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
       
        <div className="footer-bottom">
          <p>&copy; {currentYear} SeRsIf Abdeljalil. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;