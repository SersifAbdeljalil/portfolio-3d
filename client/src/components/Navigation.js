import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute('lang', lng);
    if (lng === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

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
          background: linear-gradient(135deg, rgba(30, 30, 60, 0.8) 0%, rgba(25, 25, 50, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 2rem;
          padding: 0.75rem 1.5rem;
          margin: 1rem;
          box-shadow: 
            0 8px 32px rgba(139, 92, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .navigation::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
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
          color: #c4b5fd;
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
          background: linear-gradient(90deg, #8b5cf6, #9f7aea);
          border-radius: 1px;
          margin-top: 0.25rem;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover .nav-text {
          color: #9f7aea;
          transform: translateY(-1px);
        }

        .nav-link:hover .nav-underline {
          width: 100%;
        }

        .nav-link:hover {
          background: rgba(139, 92, 246, 0.08);
        }

        .nav-link.active .nav-text {
          color: #8b5cf6;
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
        }

        .nav-link.active .nav-underline {
          width: 100%;
          background: linear-gradient(90deg, #8b5cf6, #a855f7);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
        }

        .nav-link.active {
          background: rgba(139, 92, 246, 0.12);
        }

        .nav-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .language-switcher {
          display: flex;
          gap: 0.25rem;
          background: rgba(139, 92, 246, 0.08);
          padding: 0.25rem;
          border-radius: 1rem;
          border: 1px solid rgba(139, 92, 246, 0.15);
        }

        .lang-btn {
          position: relative;
          background: transparent;
          border: none;
          color: #c4b5fd;
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
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .lang-btn:hover {
          background: rgba(139, 92, 246, 0.15);
          transform: translateY(-1px);
          color: #9f7aea;
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
          box-shadow: 0 0 0 2px rgba(196, 181, 253, 0.4);
        }

        .theme-wrapper {
          padding-left: 0.5rem;
          border-left: 1px solid rgba(139, 92, 246, 0.2);
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
            border-top: 1px solid rgba(139, 92, 246, 0.2);
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