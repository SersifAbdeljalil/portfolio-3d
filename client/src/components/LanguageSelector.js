import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === 'ar') {
      document.body.setAttribute('dir', 'rtl');
      document.documentElement.classList.add('rtl');
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.documentElement.classList.remove('rtl');
    }
  };

  return (
    <div className="language-selector">
      <div className="language-selector-toggle">
        <Globe size={20} />
      </div>
      <div className="language-options">
        <span>{t('language.select')}</span>
        <button 
          className={`language-option ${i18n.language === 'fr' ? 'active' : ''}`} 
          onClick={() => changeLanguage('fr')}
        >
          FR
        </button>
        <button 
          className={`language-option ${i18n.language === 'en' ? 'active' : ''}`} 
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`language-option ${i18n.language === 'ar' ? 'active' : ''}`} 
          onClick={() => changeLanguage('ar')}
        >
          العربية
        </button>
      </div>
      
      <style jsx>{`
        .language-selector {
          position: relative;
          margin-left: 1rem;
        }

        .language-selector-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .language-selector-toggle:hover {
          background-color: rgba(139, 92, 246, 0.2);
        }

        .language-options {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 150px;
          background-color: rgba(30, 30, 60, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 10px;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.2);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .language-selector:hover .language-options {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .language-options span {
          display: block;
          font-size: 0.8rem;
          color: #a5b4fc;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          padding-bottom: 5px;
        }

        .language-option {
          display: block;
          width: 100%;
          padding: 8px 10px;
          margin: 5px 0;
          text-align: left;
          background-color: transparent;
          border: none;
          border-radius: 5px;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-option:hover {
          background-color: rgba(139, 92, 246, 0.2);
        }

        .language-option.active {
          background-color: #8b5cf6;
          color: white;
        }

        :global(.rtl) .language-options {
          right: auto;
          left: 0;
          text-align: right;
        }

        :global(.rtl) .language-option {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

export default LanguageSelector;