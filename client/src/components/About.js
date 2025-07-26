import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, GraduationCap, Briefcase, Languages } from 'lucide-react';
import profileImg from './assets/images/ibtissame-profile.jpg';
import cvFile from './assets/Documents/IBTISSAME_JABIR.pdf';
import { saveAs } from 'file-saver';

function About() {
  const { t, i18n } = useTranslation();

  const handleDownloadCV = () => {
    saveAs(cvFile, 'Ibtissame_Jabir_CV.pdf');
  };

  // Helper function to render details for education and experience arrays
  const renderDetails = (key, type, fallback) => {
    const details = t(key, { returnObjects: true });
    if (Array.isArray(details)) {
      if (type === 'education') {
        return details.map((item, index) => (
          <p key={index}>
            {item.degree} - {item.institution} ({item.year})<br />
            {item.description}
          </p>
        ));
      } else if (type === 'experience') {
        return details.map((item, index) => (
          <p key={index}>
            {item.role} at {item.company} ({item.year})<br />
            {item.description}
          </p>
        ));
      }
    }
    return <p>{t(key, fallback)}</p>;
  };

  // Debug: Log the current language and translation data
  console.log('Current language:', i18n.language);
  console.log('Education items:', t('about.education.items', { returnObjects: true }));
  console.log('Experience items:', t('about.experience.items', { returnObjects: true }));

  return (
    <section className="about section">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="about-content">
          <div className="about-text">
            <p>{t('about.intro')}</p>
            <p>{t('about.bio')}</p>

            <div className="about-details">
              <div className="about-detail">
                <h3>
                  <GraduationCap size={24} className="detail-icon" />
                  {t('about.education.title')}
                </h3>
                {renderDetails('about.education.items', 'education', 'No education details available')}
              </div>

              <div className="about-detail">
                <h3>
                  <Briefcase size={24} className="detail-icon" />
                  {t('about.experience.title')}
                </h3>
                {renderDetails('about.experience.items', 'experience', 'No experience details available')}
              </div>

              <div className="about-detail">
                <h3>
                  <Languages size={24} className="detail-icon" />
                  {t('about.languages.title', 'Languages')}
                </h3>
                <p>{t('about.languages.details', 'Arabic, English, French, Chinese')}</p>
              </div>
            </div>

            <div className="about-cta">
              <button onClick={handleDownloadCV} className="btn btn-secondary btn-icon">
                <span>{t('about.downloadCV', 'Download CV')}</span>
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="about-visual">
            <div className="profile-image-container">
              <img src={profileImg} alt="Ibtissame Jabir" className="profile-image" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about.section {
          padding: 4rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .container {
          width: 100%;
          padding: 0 1.5rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #8b5cf6;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .about-content {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2.5rem;
          align-items: center;
          background-color: rgba(30, 30, 60, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1rem;
          overflow: hidden;
          padding: 2rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.6s ease-out forwards;
        }

        .about-text {
          color: #e2e8f0;
          line-height: 1.6;
        }

        .about-text p {
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        .about-details {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-detail {
          background-color: rgba(30, 30, 45, 0.8);
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid rgba(139, 92, 246, 0.2);
          transition: all 0.3s ease;
        }

        .about-detail:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .about-detail h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          color: #c4b5fd;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .detail-icon {
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.2);
          padding: 0.5rem;
          border-radius: 50%;
        }

        .about-detail p {
          color: #e2e8f0;
          line-height: 1.6;
        }

        .about-cta {
          margin-top: 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          background-color: transparent;
          color: #c4b5fd;
          border: 1px solid #8b5cf6;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
          background-color: rgba(139, 92, 246, 0.1);
        }

        .about-visual {
          position: relative;
        }

        .profile-image-container {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          border: 3px solid rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.0.2);
          transform: perspective(800px) rotateY(-15deg);
          transition: all 0.5s ease;
        }

        .profile-image-container:hover {
          transform: perspective(800px) rotateY(0);
          border-color: #8b5cf6;
        }

        .profile-image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), transparent);
          z-index: 1;
          pointer-events: none;
          border-radius: 1rem;
        }

        .profile-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .profile-image-container:hover .profile-image {
          transform: scale(1.05);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .profile-image-container {
            max-width: 400px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.75rem;
          }
          
          .about-content {
            padding: 1.5rem;
          }
          
          .about-detail {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }
          
          .about-content {
            padding: 1rem;
          }
          
          .about-detail h3 {
            font-size: 1.1rem;
          }
          
          .btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }
        
        :global(.rtl) .about-text {
          text-align: right;
        }
        
        :global(.rtl) .about-detail h3 {
          flex-direction: row-reverse;
        }
        
        :global(.rtl) .btn {
          flex-direction: row-reverse;
        }
      `}</style>
    </section>
  );
}

export default About;