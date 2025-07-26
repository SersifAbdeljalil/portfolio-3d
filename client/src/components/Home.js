import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Code, PenTool, Brain } from 'lucide-react';

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

// Enhanced Skill Card with hover effects - Même style que Contact
function SkillCard({ icon: Icon, title, description, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="skill-card"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-background"></div>
      <div className="card-content">
        <div className="card-icon">
          <div className="icon-glow"></div>
          <Icon size={28} />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
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

// Composant principal Home - VERSION FINALE avec style unifié
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
      const skillCards = document.querySelectorAll('.skill-card');
      const triggerPoint = window.innerHeight * 0.8;
      
      skillCards.forEach((card, index) => {
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
    <>
      <EnhancedBackground />
      
      <section className="home-section">
        <div className="container">
          <div className={`home-content ${isVisible ? 'fade-in' : ''}`}>
            <div className="home-text">
              <h1 className="section-title fade-in">
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
              {/* Animation similaire à celle du contact */}
              <div className="home-animation">
                <div className="animation-container">
                  {/* Animation centrale avec morphing */}
                  <div className="morph-container">
                    <div className="morph-shape shape-1"></div>
                    <div className="morph-shape shape-2"></div>
                    <div className="morph-shape shape-3"></div>
                  </div>
                  
                  {/* Orbites avec icônes flottantes */}
                  <div className="orbit orbit-1">
                    <div className="orbit-icon">
                      <Code size={20} />
                    </div>
                  </div>
                  
                  <div className="orbit orbit-2">
                    <div className="orbit-icon">
                      <PenTool size={18} />
                    </div>
                  </div>
                  
                  <div className="orbit orbit-3">
                    <div className="orbit-icon">
                      <Brain size={16} />
                    </div>
                  </div>
                  
                  {/* Vagues d'énergie */}
                  <div className="energy-wave wave-1"></div>
                  <div className="energy-wave wave-2"></div>
                  <div className="energy-wave wave-3"></div>
                  
                  {/* Particules flottantes */}
                  <div className="home-particles">
                    <div className="particle p-1"></div>
                    <div className="particle p-2"></div>
                    <div className="particle p-3"></div>
                    <div className="particle p-4"></div>
                    <div className="particle p-5"></div>
                    <div className="particle p-6"></div>
                  </div>
                  
                  {/* Texte central animé */}
                  <div className="central-text">
                    <div className="text-line">Welcome</div>
                    <div className="text-line typing-text">Portfolio</div>
                  </div>
                </div>
              </div>
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

        <style jsx>{`
          /* CSS Variables - Utilisées dans Contact aussi */
          :root {
            --primary-hue: 260;
            --secondary-hue: 320;
            --accent-hue: 200;
            
            --primary-light: hsl(var(--primary-hue), 80%, 65%);
            --secondary-light: hsl(var(--secondary-hue), 70%, 60%);
            --accent-color: hsl(var(--accent-hue), 75%, 55%);
            
            --text-color: #e2e8f0;
            --text-secondary: #94a3b8;
            --bg-primary: #0f0f23;
            --bg-secondary: #1a1a2e;
            
            --glass-bg: rgba(255, 255, 255, 0.05);
            --border-color: rgba(255, 255, 255, 0.1);
            
            --glow-intensity: 0.3;
            --particle-opacity: 0.6;
          }

          /* Section Home - Même structure que Contact */
          .home-section {
            position: relative;
            padding: 6rem 0;
            min-height: 100vh;
            color: var(--text-color);
            z-index: 10;
            display: flex;
            align-items: center;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
            position: relative;
            width: 100%;
          }

          .section-title {
            font-size: 4rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, 
              var(--primary-light), 
              var(--secondary-light)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
            animation-fill-mode: both;
          }

          .home-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            margin-bottom: 6rem;
            animation-fill-mode: both;
          }

          .home-text {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .subtitle {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--text-secondary);
            line-height: 1.4;
            animation-fill-mode: both;
          }

          .description {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--text-secondary);
            max-width: 600px;
            animation-fill-mode: both;
          }

          /* Boutons CTA - Style unifié avec Contact */
          .cta-buttons {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            animation-fill-mode: both;
          }

          .btn {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .btn-primary {
            background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
            color: white;
            box-shadow: 
              0 8px 25px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              0 0 0 1px hsla(var(--primary-hue), 80%, 65%, 0.3);
          }

          .btn-primary:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 
              0 15px 35px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 3)),
              0 0 0 2px hsla(var(--primary-hue), 80%, 65%, 0.5);
          }

          .btn-secondary {
            background: var(--glass-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
          }

          .btn-secondary:hover {
            transform: translateY(-3px) scale(1.02);
            border-color: var(--primary-light);
            color: var(--primary-light);
            box-shadow: 
              0 10px 25px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              0 0 0 2px hsla(var(--primary-hue), 80%, 65%, 0.3);
          }

          /* Animation Home - Même style que Contact */
          .home-visual {
            height: 400px;
            position: relative;
            animation-fill-mode: both;
          }

          .home-animation {
            width: 100%;
            height: 100%;
          }

          .animation-container {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            transition: all 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .animation-container:hover {
            transform: translateY(-10px);
            border-color: var(--primary-light);
            box-shadow: 0 20px 40px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
          }

          /* Formes morphing centrales - Identique à Contact */
          .morph-container {
            position: absolute;
            width: 120px;
            height: 120px;
            z-index: 1;
          }

          .morph-shape {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            opacity: 0.8;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .shape-1 {
            background: linear-gradient(45deg, var(--primary-light), transparent);
            animation: morph-1 4s infinite;
            transform-origin: center;
          }

          .shape-2 {
            background: linear-gradient(135deg, var(--secondary-light), transparent);
            animation: morph-2 6s infinite;
            animation-delay: -2s;
          }

          .shape-3 {
            background: linear-gradient(225deg, var(--accent-color), transparent);
            animation: morph-3 8s infinite;
            animation-delay: -4s;
          }

          /* Orbites avec icônes - Identique à Contact */
          .orbit {
            position: absolute;
            border: 1px solid var(--border-color);
            border-radius: 50%;
            opacity: calc(var(--particle-opacity) * 1.2);
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .orbit-1 {
            width: 180px;
            height: 180px;
            top: 50%;
            left: 50%;
            margin: -90px 0 0 -90px;
            animation: orbit-rotate 15s infinite;
          }

          .orbit-2 {
            width: 220px;
            height: 220px;
            top: 50%;
            left: 50%;
            margin: -110px 0 0 -110px;
            animation: orbit-rotate 20s infinite reverse;
          }

          .orbit-3 {
            width: 260px;
            height: 260px;
            top: 50%;
            left: 50%;
            margin: -130px 0 0 -130px;
            animation: orbit-rotate 25s infinite;
          }

          .orbit-icon {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 36px;
            height: 36px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--primary-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-light);
            animation: icon-counter-rotate 15s infinite linear;
            box-shadow: 0 0 20px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
          }

          .orbit-2 .orbit-icon {
            animation: icon-counter-rotate 20s infinite linear reverse;
            border-color: var(--secondary-light);
            color: var(--secondary-light);
          }

          .orbit-3 .orbit-icon {
            animation: icon-counter-rotate 25s infinite linear;
            border-color: var(--accent-color);
            color: var(--accent-color);
          }

          /* Vagues d'énergie - Identique à Contact */
          .energy-wave {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 2px solid var(--primary-light);
            border-radius: 50%;
            opacity: 0;
            animation: energy-pulse 3s infinite;
          }

          .wave-1 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 0s;
          }

          .wave-2 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 1s;
            border-color: var(--secondary-light);
          }

          .wave-3 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 2s;
            border-color: var(--accent-color);
          }

          /* Particules flottantes - Identique à Contact */
          .home-particles {
            position: absolute;
            inset: 0;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-light);
            border-radius: 50%;
            animation: particle-float 6s infinite ease-in-out;
            box-shadow: 0 0 10px currentColor;
          }

          .p-1 { top: 20%; left: 15%; animation-delay: 0s; }
          .p-2 { top: 80%; right: 20%; animation-delay: 1s; background: var(--secondary-light); }
          .p-3 { top: 30%; right: 10%; animation-delay: 2s; background: var(--accent-color); }
          .p-4 { bottom: 30%; left: 25%; animation-delay: 3s; }
          .p-5 { top: 60%; left: 80%; animation-delay: 4s; background: var(--secondary-light); }
          .p-6 { bottom: 20%; right: 30%; animation-delay: 5s; background: var(--accent-color); }

          /* Texte central - Identique à Contact */
          .central-text {
            position: absolute;
            text-align: center;
            z-index: 5;
            pointer-events: none;
          }

          .text-line {
            font-size: 1.2rem;
            font-weight: 700;
            line-height: 1.2;
            margin: 0.2rem 0;
          }

          .text-line:first-child {
            color: var(--text-color);
            opacity: 0.8;
          }

          /* Skill Cards - Même style que Contact */
          .highlight-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
          }

          .skill-card {
            position: relative;
            padding: 2.5rem;
            border-radius: 20px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            animation-fill-mode: both;
            opacity: 0;
            transform: translateY(50px);
          }

          .skill-card.fade-in {
            opacity: 1;
            transform: translateY(0);
          }

          .card-background {
            position: absolute;
            inset: 0;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            border-radius: inherit;
            transition: all 0.4s ease;
          }

          .skill-card:hover .card-background {
            border-color: var(--primary-light);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 
              0 20px 40px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .skill-card:hover {
            transform: translateY(-10px) scale(1.02);
          }

          .card-content {
            position: relative;
            z-index: 2;
            text-align: center;
          }

          .card-icon {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            margin-bottom: 1.5rem;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
            color: white;
            transition: all 0.4s ease;
          }

          .skill-card:hover .card-icon {
            transform: scale(1.1) rotateY(10deg);
            box-shadow: 0 15px 30px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 3));
          }

          .icon-glow {
            position: absolute;
            inset: -20px;
            background: radial-gradient(circle, 
              hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)), 
              transparent 70%
            );
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .skill-card:hover .icon-glow {
            opacity: 1;
          }

          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-color);
            margin-bottom: 1rem;
            transition: all 0.3s ease;
          }

          .skill-card:hover .card-title {
            color: var(--primary-light);
          }

          .card-description {
            font-size: 1rem;
            line-height: 1.6;
            color: var(--text-secondary);
            margin: 0;
            transition: all 0.3s ease;
          }

          .skill-card:hover .card-description {
            color: var(--text-color);
          }

          /* Typing Animation */
          .typing-text {
            color: var(--primary-light);
          }

          .typing-cursor {
            animation: typing-blink 1s infinite;
            color: var(--secondary-light);
          }

          @keyframes typing-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          /* Scroll Indicator */
          .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            opacity: 0.7;
            transition: opacity 0.3s ease;
          }

          .scroll-indicator:hover {
            opacity: 1;
          }

          .mouse {
            width: 24px;
            height: 40px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
          }

          .wheel {
            width: 4px;
            height: 8px;
            background: var(--primary-light);
            border-radius: 2px;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            animation: scroll-wheel 2s infinite;
            box-shadow: 0 0 10px currentColor;
          }

          .arrow {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .arrow span {
            width: 12px;
            height: 2px;
            background: var(--primary-light);
            transform-origin: center;
            animation: scroll-arrow 2s infinite;
            box-shadow: 0 0 5px currentColor;
          }

          .arrow span:first-child {
            transform: rotate(45deg) translate(2px, 2px);
          }

          .arrow span:last-child {
            transform: rotate(-45deg) translate(-2px, 2px);
          }

          /* Enhanced Background - Même que Contact */
          .enhanced-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, 
              var(--bg-primary) 0%, 
              var(--bg-secondary) 50%, 
              var(--bg-primary) 100%
            );
            overflow: hidden;
            z-index: -1;
          }

          .mouse-follower {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, 
              hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 0.8)), 
              hsla(var(--secondary-hue), 70%, 60%, calc(var(--glow-intensity) * 0.6)) 50%, 
              transparent 70%
            );
            border-radius: 50%;
            filter: blur(80px);
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            pointer-events: none;
            animation: pulse-glow 8s infinite ease-in-out;
          }

          .central-sphere {
            position: absolute;
            top: 30%;
            right: 20%;
            width: 300px;
            height: 300px;
            transform: translate(50%, -50%);
          }

          .sphere-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            animation: sphere-rotate 20s infinite linear;
          }

          .sphere-core {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, 
              var(--primary-light), 
              var(--secondary-light)
            );
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 
              0 0 40px var(--primary-light),
              0 0 80px hsla(var(--primary-hue), 80%, 65%, 0.5),
              inset 0 0 20px rgba(255, 255, 255, 0.3);
            animation: core-pulse 4s infinite ease-in-out;
          }

          .sphere-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 1px solid;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .ring-1 {
            width: 120px;
            height: 120px;
            border-color: hsla(var(--primary-hue), 80%, 65%, 0.4);
            animation: ring-rotate-1 15s infinite;
          }

          .ring-2 {
            width: 180px;
            height: 180px;
            border-color: hsla(var(--secondary-hue), 70%, 60%, 0.3);
            animation: ring-rotate-2 20s infinite reverse;
          }

          .ring-3 {
            width: 240px;
            height: 240px;
            border-color: hsla(var(--accent-hue), 75%, 55%, 0.2);
            animation: ring-rotate-3 25s infinite;
          }

          .floating-particle {
            position: absolute;
            background: var(--primary-light);
            border-radius: 50%;
            animation: particle-drift 8s infinite ease-in-out;
            box-shadow: 
              0 0 10px currentColor,
              0 0 20px hsla(var(--primary-hue), 80%, 65%, 0.3);
            opacity: var(--particle-opacity);
          }

          .geometric-shapes {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }

          .shape {
            position: absolute;
            opacity: calc(var(--particle-opacity) * 0.5);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            filter: blur(1px);
          }

          .triangle {
            top: 20%;
            left: 15%;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 35px solid var(--accent-color);
            animation: shape-float-1 12s infinite;
          }

          .hexagon {
            top: 70%;
            right: 20%;
            width: 40px;
            height: 23px;
            background: var(--secondary-light);
            position: relative;
            animation: shape-float-2 15s infinite;
          }

          .hexagon:before,
          .hexagon:after {
            content: "";
            position: absolute;
            width: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
          }

          .hexagon:before {
            bottom: 100%;
            border-bottom: 12px solid var(--secondary-light);
          }

          .hexagon:after {
            top: 100%;
            border-top: 12px solid var(--secondary-light);
          }

          .circle {
            bottom: 20%;
            left: 10%;
            width: 30px;
            height: 30px;
            background: var(--primary-light);
            border-radius: 50%;
            animation: shape-float-3 10s infinite;
          }

          /* Animations communes - Identiques à Contact */
          @keyframes morph-1 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 50%;
            }
            25% { 
              transform: scale(1.2) rotate(90deg);
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            50% { 
              transform: scale(0.8) rotate(180deg);
              border-radius: 20% 80% 20% 80% / 80% 20% 80% 20%;
            }
            75% { 
              transform: scale(1.1) rotate(270deg);
              border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            }
          }

          @keyframes morph-2 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
            }
            33% { 
              transform: scale(1.3) rotate(120deg);
              border-radius: 20% 80% 80% 20% / 20% 80% 20% 80%;
            }
            66% { 
              transform: scale(0.7) rotate(240deg);
              border-radius: 80% 20% 20% 80% / 80% 80% 20% 20%;
            }
          }

          @keyframes morph-3 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 30% 70% 30% 70% / 70% 30% 70% 30%;
            }
            20% { 
              transform: scale(1.1) rotate(72deg);
              border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
            }
            40% { 
              transform: scale(0.9) rotate(144deg);
              border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%;
            }
            60% { 
              transform: scale(1.2) rotate(216deg);
              border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
            }
            80% { 
              transform: scale(0.8) rotate(288deg);
              border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%;
            }
          }

          @keyframes orbit-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes icon-counter-rotate {
            from { transform: translateX(-50%) rotate(0deg); }
            to { transform: translateX(-50%) rotate(-360deg); }
          }

          @keyframes energy-pulse {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(2);
            }
          }

          @keyframes particle-float {
            0%, 100% { 
              transform: translateY(0px) scale(1);
              opacity: 1;
            }
            25% { 
              transform: translateY(-15px) scale(1.2);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-30px) scale(1);
              opacity: 0.6;
            }
            75% { 
              transform: translateY(-15px) scale(0.8);
              opacity: 0.8;
            }
          }

          @keyframes scroll-wheel {
            0% { transform: translateX(-50%) translateY(0); opacity: 1; }
            50% { transform: translateX(-50%) translateY(8px); opacity: 0.5; }
            100% { transform: translateX(-50%) translateY(16px); opacity: 0; }
          }

          @keyframes scroll-arrow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          @keyframes pulse-glow {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 1;
            }
          }

          @keyframes sphere-rotate {
            from { transform: translate(50%, -50%) rotateY(0deg); }
            to { transform: translate(50%, -50%) rotateY(360deg); }
          }

          @keyframes core-pulse {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              box-shadow: 
                0 0 40px var(--primary-light),
                0 0 80px hsla(var(--primary-hue), 80%, 65%, 0.5),
                inset 0 0 20px rgba(255, 255, 255, 0.3);
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.1);
              box-shadow: 
                0 0 60px var(--primary-light),
                0 0 120px hsla(var(--primary-hue), 80%, 65%, 0.7),
                inset 0 0 30px rgba(255, 255, 255, 0.5);
            }
          }

          @keyframes ring-rotate-1 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes ring-rotate-2 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }

          @keyframes ring-rotate-3 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          @keyframes particle-drift {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) scale(1);
            }
            25% { 
              transform: translateY(-20px) translateX(10px) scale(1.2);
            }
            50% { 
              transform: translateY(-10px) translateX(-15px) scale(0.8);
            }
            75% { 
              transform: translateY(-30px) translateX(5px) scale(1.1);
            }
          }

          @keyframes shape-float-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
          }

          @keyframes shape-float-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(120deg); }
          }

          @keyframes shape-float-3 {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.2); }
          }

          /* Animations d'entrée */
          .fade-in {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .fade-in-up {
            animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Animation delays */
          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }
          .delay-3 { animation-delay: 0.6s; }
          .delay-4 { animation-delay: 0.8s; }
          .delay-5 { animation-delay: 1s; }
          .delay-6 { animation-delay: 1.2s; }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .home-content {
              grid-template-columns: 1fr;
              gap: 3rem;
              text-align: center;
            }

            .section-title {
              font-size: 3rem;
            }

            .home-visual {
              height: 300px;
            }

            .central-sphere {
              width: 250px;
              height: 250px;
            }
          }

          @media (max-width: 768px) {
            .home-section {
              padding: 4rem 0;
            }

            .section-title {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
            }

            .subtitle {
              font-size: 1.3rem;
            }

            .description {
              font-size: 1rem;
            }

            .cta-buttons {
              flex-direction: column;
              align-items: center;
            }

            .btn {
              width: 100%;
              max-width: 300px;
              justify-content: center;
            }

            .home-visual {
              height: 250px;
            }

            .highlight-cards {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .skill-card {
              padding: 2rem;
            }

            .central-sphere {
              width: 200px;
              height: 200px;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 2rem;
            }

            .subtitle {
              font-size: 1.1rem;
            }

            .skill-card {
              padding: 1.5rem;
            }

            .card-icon {
              width: 60px;
              height: 60px;
              margin-bottom: 1rem;
            }

            .card-title {
              font-size: 1.3rem;
            }

            .home-visual {
              height: 200px;
            }
          }

          /* Dark mode improvements */
          @media (prefers-color-scheme: dark) {
            :root {
              --glow-intensity: 0.4;
              --particle-opacity: 0.8;
            }
          }

          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .morph-shape,
            .orbit,
            .orbit-icon,
            .energy-wave,
            .particle,
            .floating-particle,
            .shape,
            .sphere-inner,
            .sphere-ring,
            .mouse-follower {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }

          /* RTL Support */
          :global(.rtl) .home-content {
            direction: rtl;
          }
          
          :global(.rtl) .cta-buttons {
            flex-direction: row-reverse;
          }
          
          :global(.rtl) .btn {
            flex-direction: row-reverse;
          }
          
          :global(.rtl) .central-sphere {
            right: auto;
            left: 20%;
            transform: translate(-50%, -50%);
          }

          /* Performance optimizations */
          .enhanced-background,
          .animation-container,
          .skill-card {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }

          /* High contrast mode */
          @media (prefers-contrast: high) {
            :root {
              --border-color: rgba(255, 255, 255, 0.3);
              --glass-bg: rgba(255, 255, 255, 0.1);
            }
          }
        `}</style>
      </section>
    </>
  );
}

export default Home;