import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Added for Link component
import { ArrowRight, Mail, Code, PenTool, Brain } from 'lucide-react';
import './Home.css'; // Assuming styles are moved to a separate CSS file

// Enhanced Background Component without Three.js
function EnhancedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Generate animated particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 4,
  }));

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

      {/* Floating particles */}
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
      className={`skill-card highlight-card`}
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

// Typing animation component
function TypingAnimation({ texts, speed = 100 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed]);

  return (
    <span className="typing-text">
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
}

function Home() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const skills = t('home.skills', { returnObjects: true }) || ['Web Development', 'AI Solutions', 'UI/UX Design'];
  
  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => {
      const highlightCards = document.querySelectorAll('.highlight-card');
      const triggerPoint = window.innerHeight * 0.8;
      
      highlightCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerPoint) {
          setTimeout(() => {
            card.classList.add('fade-in-up');
          }, index * 150);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
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
              <TypingAnimation texts={skills} />
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