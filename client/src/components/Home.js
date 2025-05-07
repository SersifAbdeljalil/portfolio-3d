import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { ArrowRight, Mail, Code, Server, Boxes } from 'lucide-react';

// Composant 3D pour l'arrière-plan
function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#6c63ff"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
    </Canvas>
  );
}

function Home() {
  const { t } = useTranslation();
  
  // Obtenir les compétences depuis les traductions
  const skills = t('home.skills', { returnObjects: true });
  
  // Animation au scroll
  useEffect(() => {
    const handleScroll = () => {
      const highlightCards = document.querySelectorAll('.highlight-card');
      
      highlightCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (cardTop < triggerPoint) {
          card.classList.add('fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier au chargement initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="home">
      <div className="container">
        <div className="home-content">
          <div className="home-text">
            <h1 className="title fade-in">{t('home.title')}</h1>
            
            <h2 className="subtitle fade-in delay-1">
              <span className="rotating-text">
                {t('home.subtitle')}
                <span className="skills-carousel">
                  {skills.map((skill, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.5}s` }}>
                      {skill}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
            
            <p className="description fade-in delay-2">
              {t('home.description')}
            </p>
            
            <div className="cta-buttons fade-in delay-3">
              <Link to="/projects" className="btn btn-primary btn-icon">
                <span>{t('home.viewProjects')}</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-icon">
                <span>{t('home.contactMe')}</span>
                <Mail size={20} />
              </Link>
            </div>
          </div>
          
          <div className="home-visual fade-in delay-2">
            <div className="three-container">
              <ThreeBackground />
            </div>
          </div>
        </div>
        
        <div className="highlight-cards">
          <div className="highlight-card">
            <div className="card-icon">
              <Code size={24} />
            </div>
            <h3>{t('home.highlights.frontend.title')}</h3>
            <p>{t('home.highlights.frontend.description')}</p>
          </div>
          
          <div className="highlight-card">
            <div className="card-icon">
              <Server size={24} />
            </div>
            <h3>{t('home.highlights.backend.title')}</h3>
            <p>{t('home.highlights.backend.description')}</p>
          </div>
          
          <div className="highlight-card">
            <div className="card-icon">
              <Boxes size={24} />
            </div>
            <h3>{t('home.highlights.animation.title')}</h3>
            <p>{t('home.highlights.animation.description')}</p>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default Home;