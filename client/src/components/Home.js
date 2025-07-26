import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Code, PenTool, Brain } from 'lucide-react';
import './Home.css';

// Enhanced Background Component - VERSION STABILISÉE
function EnhancedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // Fonction stable pour gérer le mouvement de la souris
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  // Particules avec positions fixes (seed déterministe)
  const particles = useMemo(() => {
    const fixedParticles = [
      { id: 0, x: 20, y: 30, size: 6, delay: 0, duration: 6 },
      { id: 1, x: 80, y: 20, size: 4, delay: 0.5, duration: 7 },
      { id: 2, x: 60, y: 70, size: 5, delay: 1, duration: 5 },
      { id: 3, x: 30, y: 80, size: 3, delay: 1.5, duration: 8 },
      { id: 4, x: 90, y: 60, size: 7, delay: 2, duration: 6 },
      { id: 5, x: 10, y: 50, size: 4, delay: 0.8, duration: 7 },
      { id: 6, x: 70, y: 10, size: 5, delay: 1.2, duration: 5 },
      { id: 7, x: 40, y: 40, size: 6, delay: 1.8, duration: 6 },
      { id: 8, x: 85, y: 85, size: 3, delay: 0.3, duration: 8 },
      { id: 9, x: 15, y: 15, size: 5, delay: 2.5, duration: 7 },
      { id: 10, x: 55, y: 25, size: 4, delay: 0.7, duration: 6 },
      { id: 11, x: 75, y: 90, size: 6, delay: 1.4, duration: 5 },
      { id: 12, x: 25, y: 60, size: 3, delay: 2.1, duration: 8 },
      { id: 13, x: 95, y: 35, size: 5, delay: 0.9, duration: 7 },
      { id: 14, x: 35, y: 5, size: 4, delay: 1.6, duration: 6 },
      { id: 15, x: 65, y: 55, size: 6, delay: 2.3, duration: 5 },
      { id: 16, x: 5, y: 75, size: 3, delay: 0.4, duration: 8 },
      { id: 17, x: 85, y: 45, size: 5, delay: 1.1, duration: 7 },
      { id: 18, x: 45, y: 85, size: 4, delay: 1.7, duration: 6 },
      { id: 19, x: 75, y: 35, size: 6, delay: 2.4, duration: 5 }
    ];
    return fixedParticles;
  }, []);

  return (
    <div ref={containerRef} className="enhanced-background">
      {/* Interactive gradient orb that follows mouse */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />
      
      {/* Central animated sphere */}
      <div className="central-sphere">
        <div className="sphere-inner">
          <div className="sphere-core"></div>
          <div className="sphere-ring ring-1"></div>
          <div className="sphere-ring ring-2"></div>
          <div className="sphere-ring ring-3"></div>
        </div>
      </div>

      {/* Floating particles - maintenant complètement stables */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Geometric shapes */}
      <div className="geometric-shapes">
        <div className="shape triangle"></div>
        <div className="shape hexagon"></div>
        <div className="shape circle"></div>
      </div>
    </div>
  );
}

// Enhanced Skill Card with hover effects
function SkillCard({ icon: Icon, title, description, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="highlight-card"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <div className="card-icon">
          <Icon size={28} />
          {isHovered && <div className="icon-glow"></div>}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-background"></div>
    </div>
  );
}

// Composant TypingAnimation corrigé - Version stable
function TypingAnimation({ texts, speed = 100, loop = false, pauseTime = 2000 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted && !loop) return;

    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          if (loop) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          } else {
            setIsCompleted(true);
          }
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, loop, pauseTime, isCompleted]);

  return (
    <span className="typing-text">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
}

// Composant principal Home - VERSION FINALE
function Home() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Stabiliser les skills pour éviter les re-renders
  const skills = useMemo(() => {
    const skillsData = t('home.skills', { returnObjects: true });
    return Array.isArray(skillsData) ? skillsData : ['Web Development', 'AI Solutions', 'UI/UX Design'];
  }, [t]);
  
  useEffect(() => {
    // Animation d'entrée initiale
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Gestion du scroll pour les cartes
    const handleScroll = () => {
      const highlightCards = document.querySelectorAll('.highlight-card');
      const triggerPoint = window.innerHeight * 0.8;
      
      highlightCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerPoint && !card.classList.contains('fade-in')) {
          setTimeout(() => {
            card.classList.add('fade-in');
          }, index * 150);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier immédiatement
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="home">
      <EnhancedBackground />
      
      <div className="container">
        <div className={`home-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="home-text">
            <h1 className="title fade-in">
              {t('home.title')}
            </h1>
            
            <h2 className="subtitle fade-in delay-1">
              <span>{t('home.subtitle')}</span>
              <TypingAnimation texts={skills} speed={100} loop={false} />
            </h2>
            
            <p className="description fade-in delay-2">
              {t('home.description')}
            </p>
            
            <div className="cta-buttons fade-in delay-3">
              <Link to="/projects" className="btn btn-primary">
                <span>{t('home.viewProjects')}</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <span>{t('home.contactMe')}</span>
                <Mail size={20} />
              </Link>
            </div>
          </div>
          
          <div className="home-visual fade-in delay-2">
            {/* Visual content is now handled by EnhancedBackground */}
          </div>
        </div>
        
        <div className="highlight-cards">
          <SkillCard
            icon={Brain}
            title={t('home.highlights.ai.title')}
            description={t('home.highlights.ai.description')}
            delay={0.1}
          />
          
          <SkillCard
            icon={PenTool}
            title={t('home.highlights.freelance.title')}
            description={t('home.highlights.freelance.description')}
            delay={0.2}
          />
          
          <SkillCard
            icon={Code}
            title={t('home.highlights.communication.title')}
            description={t('home.highlights.communication.description')}
            delay={0.3}
          />
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