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
    <>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title fade-in">{t('about.title')}</h2>

          <div className="about-content fade-in-up delay-1">
            <div className="about-text">
          
              <p className="bio-text">{t('about.bio')}</p>

              <div className="about-details">
                <div className="skill-card about-detail delay-2">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon">
                      <div className="icon-glow"></div>
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="card-title">{t('about.education.title')}</h3>
                    <div className="card-description">
                      {renderDetails('about.education.items', 'education', 'No education details available')}
                    </div>
                  </div>
                </div>

                <div className="skill-card about-detail delay-3">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon">
                      <div className="icon-glow"></div>
                      <Briefcase size={24} />
                    </div>
                    <h3 className="card-title">{t('about.experience.title')}</h3>
                    <div className="card-description">
                      {renderDetails('about.experience.items', 'experience', 'No experience details available')}
                    </div>
                  </div>
                </div>

                <div className="skill-card about-detail delay-4">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon">
                      <div className="icon-glow"></div>
                      <Languages size={24} />
                    </div>
                    <h3 className="card-title">{t('about.languages.title', 'Languages')}</h3>
                    <div className="card-description">
                      <p>{t('about.languages.details', 'Arabic, English, French, Chinese')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-cta fade-in-up delay-5">
                <button onClick={handleDownloadCV} className="btn btn-primary">
                  <span>{t('about.downloadCV', 'Download CV')}</span>
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="about-visual fade-in-up delay-2">
              <div className="profile-image-container">
                <div className="profile-glow"></div>
                <div className="profile-border"></div>
                <img 
                  src={profileImg} 
                  alt="Ibtissame Jabir" 
                  className="profile-image" 
                />
                <div className="profile-overlay"></div>
              </div>
              <div className="profile-decoration">
                <div className="deco-circle deco-1"></div>
                <div className="deco-circle deco-2"></div>
                <div className="deco-circle deco-3"></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Import des variables CSS */
          .about-section {
            position: relative;
            padding: 6rem 0;
            min-height: 100vh;
            color: var(--text-color);
            z-index: 10;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
            position: relative;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, 
              var(--primary-light), 
              var(--secondary-light)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
          }

          .about-content {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 4rem;
            align-items: start;
          }

          .about-text {
            position: relative;
          }

          .intro-text, .bio-text {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: var(--text-color);
            opacity: 0.95;
          }

          .intro-text {
            font-weight: 500;
            color: var(--primary-light);
            text-shadow: 0 0 10px currentColor;
          }

          .about-details {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin: 3rem 0;
          }

          .about-detail {
            animation-fill-mode: both;
          }

          .detail-item {
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }

          .detail-item:last-child {
            margin-bottom: 0;
          }

          .detail-item strong {
            color: var(--primary-light);
            font-weight: 600;
          }

          .detail-desc {
            color: var(--text-secondary);
            font-style: italic;
            opacity: 0.9;
          }

          .about-cta {
            margin-top: 3rem;
            animation-fill-mode: both;
          }

          .about-visual {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            animation-fill-mode: both;
          }

          .profile-image-container {
            position: relative;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            overflow: hidden;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 2px solid var(--border-color);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .profile-image-container:hover {
            transform: scale(1.05) rotate(5deg);
            border-color: var(--primary-light);
            box-shadow: 
              0 20px 40px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              0 0 0 4px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 1.5));
          }

          .profile-glow {
            position: absolute;
            inset: -20px;
            background: radial-gradient(circle, 
              hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)), 
              transparent 70%
            );
            border-radius: 50%;
            animation: glow-pulse 2s ease-in-out infinite;
            z-index: -1;
          }

          .profile-border {
            position: absolute;
            inset: -4px;
            background: linear-gradient(45deg, 
              var(--primary-light), 
              var(--secondary-light), 
              var(--accent-color)
            );
            border-radius: 50%;
            z-index: -1;
            animation: rotate 10s linear infinite;
          }

          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease;
            position: relative;
            z-index: 2;
          }

          .profile-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, 
              hsla(var(--primary-hue), 80%, 65%, 0.1), 
              hsla(280, 70%, 60%, 0.1)
            );
            border-radius: 50%;
            transition: opacity 0.3s ease;
            z-index: 3;
          }

          .profile-image-container:hover .profile-overlay {
            opacity: 0.7;
          }

          .profile-decoration {
            position: absolute;
            inset: -60px;
            pointer-events: none;
          }

          .deco-circle {
            position: absolute;
            border: 2px solid var(--border-color);
            border-radius: 50%;
            opacity: calc(var(--particle-opacity) * 0.8);
          }

          .deco-1 {
            width: 100px;
            height: 100px;
            top: -20px;
            right: -20px;
            animation: ring-rotate 15s linear infinite;
            border-color: var(--primary-light);
          }

          .deco-2 {
            width: 80px;
            height: 80px;
            bottom: 20px;
            left: -40px;
            animation: ring-rotate 12s linear infinite reverse;
            border-color: var(--secondary-light);
          }

          .deco-3 {
            width: 60px;
            height: 60px;
            top: 50%;
            right: -80px;
            animation: ring-rotate 8s linear infinite;
            border-color: var(--accent-color);
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .about-content {
              grid-template-columns: 1fr;
              gap: 3rem;
              text-align: center;
            }
            
            .profile-image-container {
              width: 280px;
              height: 280px;
            }
          }

          @media (max-width: 768px) {
            .about-section {
              padding: 4rem 0;
            }

            .section-title {
              font-size: 2.5rem;
              margin-bottom: 3rem;
            }
            
            .about-content {
              gap: 2rem;
            }

            .profile-image-container {
              width: 240px;
              height: 240px;
            }

            .intro-text, .bio-text {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 2rem;
            }

            .profile-image-container {
              width: 200px;
              height: 200px;
            }

            .intro-text, .bio-text {
              font-size: 1rem;
            }

            .about-details {
              gap: 1.5rem;
            }
          }

          /* Animation delays */
          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }
          .delay-3 { animation-delay: 0.6s; }
          .delay-4 { animation-delay: 0.8s; }
          .delay-5 { animation-delay: 1s; }

          /* RTL Support */
          :global(.rtl) .about-text {
            text-align: right;
          }
          
          :global(.rtl) .card-content {
            text-align: right;
          }
          
          :global(.rtl) .btn {
            flex-direction: row-reverse;
          }
        `}</style>
      </section>
    </>
  );
}

export default About;