import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

function Footer() {
  const { t } = useTranslation(); // ✅ Utilisation du vrai hook de traduction
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check theme
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                     document.documentElement.classList.contains('dark') ||
                     (!document.documentElement.getAttribute('data-theme') && 
                      !document.documentElement.classList.contains('light') &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
    };

    // Check on load
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme', 'class'] 
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  // Theme-based colors
  const footerBg = isDarkMode 
    ? `linear-gradient(135deg, 
        rgba(30, 30, 60, 0.95) 0%, 
        rgba(25, 25, 50, 0.98) 50%,
        rgba(20, 20, 45, 1) 100%)`
    : `linear-gradient(135deg, 
        rgba(248, 250, 252, 0.95) 0%, 
        rgba(241, 245, 249, 0.98) 50%,
        rgba(226, 232, 240, 1) 100%)`;

  const borderColor = isDarkMode 
    ? 'rgba(139, 92, 246, 0.2)' 
    : 'rgba(139, 92, 246, 0.3)';

  const overlayBg = isDarkMode
    ? `radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
       radial-gradient(circle at 70% 80%, rgba(159, 122, 234, 0.08) 0%, transparent 50%)`
    : `radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
       radial-gradient(circle at 70% 80%, rgba(159, 122, 234, 0.03) 0%, transparent 50%)`;

  const logoColor = isDarkMode ? '#8b5cf6' : '#7c3aed';
  const logoHoverColor = isDarkMode ? '#9f7aea' : '#8b5cf6';
  const textColor = isDarkMode ? '#c4b5fd' : '#64748b';
  const titleColor = isDarkMode ? '#9f7aea' : '#7c3aed';
  const linkHoverColor = isDarkMode ? '#9f7aea' : '#8b5cf6';
  const iconBg = isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)';
  const iconHoverBg = isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)';
  const iconColor = isDarkMode ? '#8b5cf6' : '#7c3aed';
  const socialBorderColor = isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.4)';
  const socialHoverBorderColor = isDarkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.6)';

  return (
    <footer className="footer" itemScope itemType="https://schema.org/Person">
      <div className="footer-background">
        <div className="footer-overlay"></div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <Link to="/" className="footer-logo" itemProp="name">
                <div className="logo-container">
                  <span className="logo-text">Ibtissame Jabir</span>
                  <div className="logo-underline"></div>
                </div>
              </Link>
              <p className="footer-description" itemProp="description">
                {t('footer.description')}
              </p>
            </div>

            <div className="footer-section footer-links">
              <h3 className="section-title">
                <span className="title-text">{t('footer.navigation')}</span>
                <div className="title-accent"></div>
              </h3>
              <ul className="links-list">
                <li className="link-item">
                  <Link to="/" className="footer-link">
                    <span className="link-text">{t('nav.home')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/about" className="footer-link">
                    <span className="link-text">{t('nav.about')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/projects" className="footer-link">
                    <span className="link-text">{t('nav.projects')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/skills" className="footer-link">
                    <span className="link-text">{t('nav.skills')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/contact" className="footer-link">
                    <span className="link-text">{t('nav.contact')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-section footer-contact">
              <h3 className="section-title">
                <span className="title-text">{t('footer.contact')}</span>
                <div className="title-accent"></div>
              </h3>
              <ul className="contact-list">
                <li className="contact-item" itemProp="email">
                  <a href="mailto:ibtissamjabir7@gmail.com" 
                     className="contact-link"
                     aria-label="Envoyer un email à Ibtissame Jabir">
                    <div className="contact-icon-wrapper">
                      <Mail size={16} className="contact-icon" />
                    </div>
                    <span className="contact-text">ibtissamjabir7@gmail.com</span>
                    <div className="contact-hover"></div>
                  </a>
                </li>
                <li className="contact-item" itemProp="telephone">
                  <a href="tel:+8613052375253" 
                     className="contact-link"
                     aria-label="Appeler Ibtissame Jabir">
                    <div className="contact-icon-wrapper">
                      <Phone size={16} className="contact-icon" />
                    </div>
                    <span className="contact-text">+86 13052375253</span>
                    <div className="contact-hover"></div>
                  </a>
                </li>
                <li className="contact-item" itemProp="address">
                  <div className="contact-link">
                    <div className="contact-icon-wrapper">
                      <MapPin size={16} className="contact-icon" />
                    </div>
                    <span className="contact-text">Shanghai, China</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="footer-section footer-social">
              <h3 className="section-title">
                <span className="title-text">{t('footer.socialNetworks')}</span>
                <div className="title-accent"></div>
              </h3>
              <div className="social-links">
                <a href="https://github.com/ibtissamejabir"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="social-link"
                   aria-label="GitHub">
                  <div className="social-icon-wrapper">
                    <Github size={20} />
                    <div className="social-ripple"></div>
                  </div>
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/ibtissame-jabir-5486aa336/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="social-link"
                   aria-label="LinkedIn">
                  <div className="social-icon-wrapper">
                    <Linkedin size={20} />
                    <div className="social-ripple"></div>
                  </div>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="footer-section footer-resources">
              <h3 className="section-title">
                <span className="title-text">{t('footer.resources')}</span>
                <div className="title-accent"></div>
              </h3>
              <ul className="links-list">
                <li className="link-item">
                  <a href="/cv.pdf" download className="footer-link">
                    <span className="link-text">{t('footer.downloadCV')}</span>
                    <div className="link-hover"></div>
                  </a>
                </li>
                <li className="link-item">
                  <Link to="/projects" className="footer-link">
                    <span className="link-text">{t('footer.projects')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/services" className="footer-link">
                    <span className="link-text">{t('footer.services')}</span>
                    <div className="link-hover"></div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="bottom-content">
              <p className="copyright">
                © {currentYear} Ibtissame Jabir. {t('footer.allRightsReserved')}
              </p>
              <p className="privacy">
                <Link to="/privacy" className="privacy-link">
                  <span className="privacy-text">{t('footer.privacyPolicy')}</span>
                  <div className="privacy-hover"></div>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          margin-top: 4rem;
          transition: all 0.3s ease;
        }

        .footer-background {
          background: ${footerBg};
          backdrop-filter: blur(20px);
          border-top: 1px solid ${borderColor};
          position: relative;
          overflow: hidden;
        }

        .footer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${overlayBg};
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 1.5rem;
          position: relative;
          z-index: 1;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .footer-info {
          grid-column: span 1;
        }

        .footer-logo {
          display: inline-block;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .logo-container {
          position: relative;
        }

        .logo-text {
          color: ${logoColor};
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          transition: all 0.3s ease;
        }

        .logo-underline {
          height: 2px;
          width: 0;
          background: ${isDarkMode 
            ? 'linear-gradient(90deg, #8b5cf6, #9f7aea)'
            : 'linear-gradient(90deg, #7c3aed, #8b5cf6)'
          };
          margin-top: 0.25rem;
          border-radius: 1px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-logo:hover .logo-text {
          color: ${logoHoverColor};
          text-shadow: 0 0 8px ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'};
        }

        .footer-logo:hover .logo-underline {
          width: 100%;
        }

        .footer-description {
          color: ${textColor};
          line-height: 1.6;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .footer-section {
          position: relative;
        }

        .section-title {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .title-text {
          color: ${titleColor};
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }

        .title-accent {
          height: 2px;
          width: 30px;
          background: ${isDarkMode 
            ? 'linear-gradient(90deg, #8b5cf6, transparent)'
            : 'linear-gradient(90deg, #7c3aed, transparent)'
          };
          margin-top: 0.5rem;
          border-radius: 1px;
        }

        .links-list, .contact-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .link-item, .contact-item {
          position: relative;
        }

        .footer-link, .contact-link {
          position: relative;
          display: flex;
          align-items: center;
          color: ${textColor};
          text-decoration: none;
          padding: 0.5rem 0;
          border-radius: 0.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .link-text, .contact-text {
          position: relative;
          z-index: 2;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .link-hover, .contact-hover {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: ${isDarkMode 
            ? 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.08), transparent)'
          };
          transition: left 0.5s ease;
        }

        .footer-link:hover, .contact-link:hover {
          color: ${linkHoverColor};
          transform: translateX(0.25rem);
        }

        .footer-link:hover .link-hover,
        .contact-link:hover .contact-hover {
          left: 100%;
        }

        .contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: ${iconBg};
          border-radius: 0.5rem;
          margin-right: 0.75rem;
          transition: all 0.3s ease;
        }

        .contact-icon {
          color: ${iconColor};
          transition: all 0.3s ease;
        }

        .contact-link:hover .contact-icon-wrapper {
          background: ${iconHoverBg};
          transform: scale(1.05);
        }

        .contact-link:hover .contact-icon {
          color: ${linkHoverColor};
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          color: ${textColor};
          border: 1px solid ${socialBorderColor};
          border-radius: 1rem;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .social-icon-wrapper {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .social-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: ${isDarkMode 
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)'
          };
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          color: ${iconColor};
          border-color: ${socialHoverBorderColor};
          transform: translateY(-2px);
          box-shadow: 0 8px 25px ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'};
        }

        .social-link:hover .social-ripple {
          width: 120%;
          height: 120%;
        }

        .social-link:hover .social-icon-wrapper {
          transform: scale(1.1);
        }

        .footer-bottom {
          position: relative;
        }

        .footer-divider {
          height: 1px;
          background: ${isDarkMode 
            ? `linear-gradient(90deg, 
                transparent 0%, 
                rgba(139, 92, 246, 0.3) 20%, 
                rgba(139, 92, 246, 0.3) 80%, 
                transparent 100%)`
            : `linear-gradient(90deg, 
                transparent 0%, 
                rgba(139, 92, 246, 0.4) 20%, 
                rgba(139, 92, 246, 0.4) 80%, 
                transparent 100%)`
          };
          margin-bottom: 1.5rem;
        }

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright, .privacy {
          color: ${textColor};
          font-size: 0.85rem;
          opacity: 0.8;
          margin: 0;
        }

        .privacy-link {
          position: relative;
          color: inherit;
          text-decoration: none;
          padding: 0.25rem 0;
          overflow: hidden;
        }

        .privacy-text {
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .privacy-hover {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: ${iconColor};
          transition: width 0.3s ease;
        }

        .privacy-link:hover .privacy-text {
          color: ${iconColor};
        }

        .privacy-link:hover .privacy-hover {
          width: 100%;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 2rem;
          }

          .footer-social {
            grid-column: span 1;
          }

          .footer-resources {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 2rem 1rem 1rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-info {
            text-align: center;
            grid-column: span 1;
          }

          .social-links {
            justify-content: center;
          }

          .bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 1.5rem 1rem 1rem;
          }

          .footer-content {
            gap: 1.5rem;
          }

          .logo-text {
            font-size: 1.25rem;
          }

          .social-link {
            width: 2.5rem;
            height: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;