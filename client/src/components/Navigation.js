import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  const { t, i18n } = useTranslation(); // ✅ Utilisation du vrai hook de traduction
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute('lang', lng);
    if (lng === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  // Theme-based colors
  const navBg = isDarkMode 
    ? 'linear-gradient(135deg, rgba(30, 30, 60, 0.8) 0%, rgba(25, 25, 50, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)';
  
  const borderColor = isDarkMode 
    ? 'rgba(139, 92, 246, 0.15)' 
    : 'rgba(139, 92, 246, 0.2)';
  
  const shadowColor = isDarkMode 
    ? 'rgba(139, 92, 246, 0.1)' 
    : 'rgba(139, 92, 246, 0.15)';
  
  const textColor = isDarkMode ? '#c4b5fd' : '#6b46c1';
  const textHoverColor = isDarkMode ? '#9f7aea' : '#8b5cf6';
  const textActiveColor = isDarkMode ? '#8b5cf6' : '#7c3aed';
  
  const linkBgHover = isDarkMode 
    ? 'rgba(139, 92, 246, 0.08)' 
    : 'rgba(139, 92, 246, 0.12)';
  
  const linkBgActive = isDarkMode 
    ? 'rgba(139, 92, 246, 0.12)' 
    : 'rgba(139, 92, 246, 0.18)';

  const langSwitcherBg = isDarkMode 
    ? 'rgba(139, 92, 246, 0.08)' 
    : 'rgba(139, 92, 246, 0.06)';

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.home')}</span>
              <div className="nav-underline"></div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.about')}</span>
              <div className="nav-underline"></div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/skills" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.skills')}</span>
              <div className="nav-underline"></div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.projects')}</span>
              <div className="nav-underline"></div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.contact')}</span>
              <div className="nav-underline"></div>
            </NavLink>
          </li>
        </ul>

        <div className="nav-controls">
          <div className="language-switcher">
            {['en', 'fr', 'ar', 'zh'].map((lang) => (
              <button 
                key={lang}
                onClick={() => changeLanguage(lang)} 
                className="lang-btn"
                aria-label={`Switch to ${lang.toUpperCase()}`}
              >
                <span className="lang-text">{lang.toUpperCase()}</span>
                <div className="lang-ripple"></div>
              </button>
            ))}
          </div>
          <div className="theme-wrapper">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: relative;
          background: ${navBg};
          backdrop-filter: blur(20px);
          border: 1px solid ${borderColor};
          border-radius: 2rem;
          padding: 0.75rem 1.5rem;
          margin: 1rem;
          box-shadow: 
            0 8px 32px ${shadowColor},
            inset 0 1px 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
          transition: all 0.3s ease;
        }

        .navigation::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${isDarkMode 
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%)'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, transparent 50%)'
          };
          border-radius: inherit;
          pointer-events: none;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .nav-text {
          color: ${textColor};
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.025em;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .nav-underline {
          height: 2px;
          width: 0;
          background: ${isDarkMode 
            ? 'linear-gradient(90deg, #8b5cf6, #9f7aea)'
            : 'linear-gradient(90deg, #7c3aed, #8b5cf6)'
          };
          border-radius: 1px;
          margin-top: 0.25rem;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover .nav-text {
          color: ${textHoverColor};
          transform: translateY(-1px);
        }

        .nav-link:hover .nav-underline {
          width: 100%;
        }

        .nav-link:hover {
          background: ${linkBgHover};
        }

        .nav-link.active .nav-text {
          color: ${textActiveColor};
          text-shadow: 0 0 8px ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'};
        }

        .nav-link.active .nav-underline {
          width: 100%;
          background: ${isDarkMode 
            ? 'linear-gradient(90deg, #8b5cf6, #a855f7)'
            : 'linear-gradient(90deg, #7c3aed, #8b5cf6)'
          };
          box-shadow: 0 0 8px ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'};
        }

        .nav-link.active {
          background: ${linkBgActive};
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .language-switcher {
          display: flex;
          gap: 0.25rem;
          background: ${langSwitcherBg};
          padding: 0.25rem;
          border-radius: 1rem;
          border: 1px solid ${borderColor};
        }

        .lang-btn {
          position: relative;
          background: transparent;
          border: none;
          color: ${textColor};
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          font-family: 'Noto Serif SC', sans-serif;
        }

        .lang-text {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .lang-ripple {
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

        .lang-btn:hover {
          background: ${isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.12)'};
          transform: translateY(-1px);
          color: ${textHoverColor};
        }

        .lang-btn:hover .lang-ripple {
          width: 100%;
          height: 100%;
        }

        .lang-btn:active {
          transform: translateY(0);
        }

        .lang-btn:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${isDarkMode ? 'rgba(196, 181, 253, 0.4)' : 'rgba(139, 92, 246, 0.4)'};
        }

        .theme-wrapper {
          padding-left: 0.5rem;
          border-left: 1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'};
        }

        @media (max-width: 768px) {
          .navigation {
            margin: 0.5rem;
            padding: 1rem;
            border-radius: 1.5rem;
          }

          .nav-container {
            flex-direction: column;
            gap: 1.5rem;
          }

          .nav-list {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .nav-controls {
            gap: 1rem;
          }

          .theme-wrapper {
            padding-left: 0;
            border-left: none;
            padding-top: 0.5rem;
            border-top: 1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'};
          }
        }

        @media (max-width: 480px) {
          .nav-list {
            gap: 0.5rem;
          }

          .nav-link {
            padding: 0.4rem 0.8rem;
          }

          .nav-text {
            font-size: 0.85rem;
          }

          .language-switcher {
            gap: 0.125rem;
          }

          .lang-btn {
            padding: 0.4rem 0.6rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navigation;