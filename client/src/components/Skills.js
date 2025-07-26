import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Database, Brain, PenTool, Wrench, Zap, Target, Award, TrendingUp } from 'lucide-react';

// Composant pour les particules flottantes spécifiques aux skills
function SkillParticle({ x, y, size, delay, color, category }) {
  return (
    <div
      className="absolute rounded-full skill-particle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animation: `skillFloat ${4 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.6,
      }}
    />
  );
}

// Composant pour l'animation centrale des skills
function SkillsAnimation({ activeCategory, categoryColor }) {
  const icons = {
    ai: <Brain size={24} />,
    freelance: <PenTool size={24} />,
    programming: <Code size={24} />,
    dataScience: <Wrench size={24} />,
    databases: <Database size={24} />,
    communication: <PenTool size={24} />
  };

  return (
    <div className="skills-animation-container">
      {/* Animation centrale avec l'icône de la catégorie */}
      <div className="central-skill-orb">
        <div className="skill-orb-core" style={{ borderColor: categoryColor }}>
          <div className="skill-icon" style={{ color: categoryColor }}>
            {icons[activeCategory]}
          </div>
        </div>
        
        {/* Anneaux rotatifs */}
        <div className="skill-ring ring-outer" style={{ borderColor: categoryColor }}></div>
        <div className="skill-ring ring-middle" style={{ borderColor: categoryColor }}></div>
        <div className="skill-ring ring-inner" style={{ borderColor: categoryColor }}></div>
      </div>

      {/* Orbites avec icônes représentant les compétences */}
      <div className="skill-orbit orbit-1">
        <div className="orbit-skill-icon" style={{ borderColor: categoryColor, color: categoryColor }}>
          <Target size={16} />
        </div>
      </div>
      
      <div className="skill-orbit orbit-2">
        <div className="orbit-skill-icon" style={{ borderColor: categoryColor, color: categoryColor }}>
          <Zap size={14} />
        </div>
      </div>
      
      <div className="skill-orbit orbit-3">
        <div className="orbit-skill-icon" style={{ borderColor: categoryColor, color: categoryColor }}>
          <Award size={18} />
        </div>
      </div>

      {/* Vagues d'énergie */}
      <div className="skill-energy-wave wave-1" style={{ borderColor: categoryColor }}></div>
      <div className="skill-energy-wave wave-2" style={{ borderColor: categoryColor }}></div>
      <div className="skill-energy-wave wave-3" style={{ borderColor: categoryColor }}></div>

      {/* Progress indicator visuel */}
      <div className="progress-indicator">
        <TrendingUp size={20} style={{ color: categoryColor }} />
      </div>
    </div>
  );
}

const SkillsVisual = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('ai');
  const [animateSkills, setAnimateSkills] = useState(false);
  
  useEffect(() => {
    setAnimateSkills(true);
  }, []);
  
  useEffect(() => {
    setAnimateSkills(false);
    const timer = setTimeout(() => setAnimateSkills(true), 150);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = [
    { id: 'ai', name: 'Intelligence Artificielle', icon: <Brain size={20} />, color: '#8b5cf6' },
    { id: 'freelance', name: 'Freelance & Design', icon: <PenTool size={20} />, color: '#f97316' },
    { id: 'programming', name: 'Programmation', icon: <Code size={20} />, color: '#6366f1' },
    { id: 'dataScience', name: 'Data Science', icon: <Wrench size={20} />, color: '#3b82f6' },
    { id: 'databases', name: 'Bases de Données', icon: <Database size={20} />, color: '#10b981' },
    { id: 'communication', name: 'Communication', icon: <PenTool size={20} />, color: '#ec4899' },
  ];

  // Données de compétences simulées (à remplacer par vos vraies données)
  const skillsData = {
    ai: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'TensorFlow'],
    freelance: ['UI/UX Design', 'Branding', 'Project Management', 'Client Relations', 'Adobe Suite', 'Figma'],
    programming: ['Python'],
    dataScience: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Data Visualization', 'Statistics'],
    databases: ['SQL'],
    communication: ['Français', 'Anglais', 'Arabe', 'Présentation', 'Documentation', 'Team Leadership']
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Génération de particules pour l'animation
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 3,
    color: currentCategory?.color || '#8b5cf6'
  }));

  return (
    <div className="skills-visual-container">
      {/* Particules d'arrière-plan */}
      <div className="skills-particles">
        {particles.map((particle, index) => (
          <SkillParticle
            key={`particle-${activeCategory}-${index}`}
            x={particle.x}
            y={particle.y}
            size={particle.size}
            delay={particle.delay}
            color={particle.color}
            category={activeCategory}
          />
        ))}
      </div>

      <div className="skills-content-grid">
        {/* Sidebar avec les catégories */}
        <div className="categories-sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Domaines d'expertise</h3>
            <div className="sidebar-decoration"></div>
          </div>
          
          <div className="categories-list">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ 
                  '--category-color': category.color,
                  '--animation-delay': `${index * 0.1}s`
                }}
              >
                <div className="category-background"></div>
                <div className="category-content">
                  <div className="category-icon-wrapper">
                    <div className="category-icon-glow"></div>
                    {category.icon}
                  </div>
                  <div className="category-info">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{skillsData[category.id]?.length || 0} compétences</span>
                  </div>
                </div>
                <div className="category-arrow">→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Zone principale avec animation et compétences */}
        <div className="skills-main-area">
          {/* Animation centrale */}
          <div className="skills-animation-section">
            <div className="skill-card animation-card">
              <div className="card-background"></div>
              <div className="card-content">
                <SkillsAnimation 
                  activeCategory={activeCategory} 
                  categoryColor={currentCategory?.color || '#8b5cf6'} 
                />
              </div>
            </div>
          </div>

          {/* Liste des compétences */}
          <div className="skills-list-section">
            <div className="skills-header">
              <h3 className="skills-category-title" style={{ color: currentCategory?.color }}>
                {currentCategory?.name}
              </h3>
              <div className="skills-stats">
                <span className="skills-count">{skillsData[activeCategory]?.length || 0}</span>
                <span className="skills-label">compétences</span>
              </div>
            </div>

            <div className="skills-grid">
              {skillsData[activeCategory]?.map((skill, index) => (
                <div 
                  key={skill} 
                  className={`skill-card skill-item ${animateSkills ? 'animate' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--skill-color': currentCategory?.color
                  }}
                >
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="skill-info">
                      <div className="skill-name">{skill}</div>
                      <div className="skill-level-indicator">
                        <div className="skill-dots">
                          <div className="skill-dot active"></div>
                          <div className="skill-dot active"></div>
                          <div className="skill-dot active"></div>
                          <div className="skill-dot"></div>
                          <div className="skill-dot"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-bar"
                        style={{ 
                          width: animateSkills ? '85%' : '0%',
                          backgroundColor: currentCategory?.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Background amélioré avec effets */}
      <div className="enhanced-skills-background">
        {/* Gradient orbs spécifiques aux skills */}
        <div className="skills-orb orb-1"></div>
        <div className="skills-orb orb-2"></div>
        <div className="skills-orb orb-3"></div>
        
        {/* Geometric patterns */}
        <div className="geometric-pattern pattern-1"></div>
        <div className="geometric-pattern pattern-2"></div>
        
        {/* Neural network effect */}
        <div className="neural-network">
          <div className="network-node node-1"></div>
          <div className="network-node node-2"></div>
          <div className="network-node node-3"></div>
          <div className="network-connection connection-1"></div>
          <div className="network-connection connection-2"></div>
        </div>
      </div>

      <section className="skills-section">
        <div className="container">
          <h2 className="section-title fade-in">
            {t('skills.title', 'Compétences & Expertise')}
          </h2>
          
          <div className="skills-subtitle fade-in delay-1">
            <p>Un aperçu de mon expertise technique et créative</p>
          </div>
          
          <div className="skills-wrapper fade-in-up delay-2">
            <SkillsVisual />
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Variables CSS pour les thèmes */
        :root {
          --bg-primary: #0f0f23;
          --bg-secondary: #1e1e3f;
          --bg-glass: rgba(30, 30, 60, 0.4);
          --text-primary: #e2e8f0;
          --text-secondary: #a5b4fc;
          --border-color: rgba(139, 92, 246, 0.2);
          --glow-intensity: 0.3;
        }

        :global(.light-mode) {
          --bg-primary: #f8fafc;
          --bg-secondary: #f1f5f9;
          --bg-glass: rgba(255, 255, 255, 0.7);
          --text-primary: #334155;
          --text-secondary: #64748b;
          --border-color: rgba(139, 92, 246, 0.15);
          --glow-intensity: 0.2;
        }

        .skills-visual-container {
          position: relative;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          min-height: 600px;
          transition: all 0.4s ease;
        }

        .skills-visual-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px hsla(var(--primary-hue, 250), 80%, 65%, calc(var(--glow-intensity) * 2));
        }

        /* Particules d'arrière-plan */
        .skills-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .skill-particle {
          transition: all 0.3s ease;
        }

        /* Layout principal */
        .skills-content-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          min-height: 600px;
          position: relative;
          z-index: 2;
        }

        /* Sidebar des catégories */
        .categories-sidebar {
          background: var(--bg-secondary);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-right: 1px solid var(--border-color);
        }

        .sidebar-header {
          margin-bottom: 2rem;
        }

        .sidebar-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .sidebar-decoration {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 2px;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          padding: 1rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          overflow: hidden;
          animation: fadeInLeft 0.6s ease-out forwards;
          animation-delay: var(--animation-delay);
          opacity: 0;
          transform: translateX(-30px);
        }

        .category-item:hover {
          transform: translateX(5px);
          border-color: var(--category-color);
          box-shadow: 0 8px 25px hsla(var(--category-color), 0.3);
        }

        .category-item.active {
          border-color: var(--category-color);
          background: var(--bg-glass);
          transform: translateX(8px);
          box-shadow: 0 12px 30px hsla(var(--category-color), 0.4);
        }

        .category-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            hsla(var(--category-color), 0.1), 
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-item.active .category-background {
          opacity: 1;
        }

        .category-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .category-icon-wrapper {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid var(--category-color);
          color: var(--category-color);
          transition: all 0.3s ease;
        }

        .category-icon-glow {
          position: absolute;
          inset: -2px;
          background: var(--category-color);
          border-radius: 14px;
          opacity: 0;
          filter: blur(8px);
          transition: opacity 0.3s ease;
        }

        .category-item.active .category-icon-glow {
          opacity: 0.3;
        }

        .category-info {
          flex: 1;
        }

        .category-name {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .category-count {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .category-arrow {
          color: var(--category-color);
          font-weight: bold;
          transform: translateX(-5px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .category-item.active .category-arrow {
          transform: translateX(0);
          opacity: 1;
        }

        /* Zone principale */
        .skills-main-area {
          display: grid;
          grid-template-rows: 300px 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        /* Section animation */
        .skills-animation-section {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .animation-card {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Animation centrale des skills */
        .skills-animation-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .central-skill-orb {
          position: relative;
          z-index: 3;
        }

        .skill-orb-core {
          width: 80px;
          height: 80px;
          border: 3px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          animation: coreRotate 20s linear infinite;
        }

        .skill-icon {
          animation: iconCounterRotate 20s linear infinite;
        }

        .skill-ring {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          opacity: 0.4;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .ring-outer {
          width: 160px;
          height: 160px;
          top: 50%;
          left: 50%;
          margin: -80px 0 0 -80px;
          animation: ringRotate 30s infinite;
        }

        .ring-middle {
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          margin: -60px 0 0 -60px;
          animation: ringRotate 25s infinite reverse;
        }

        .ring-inner {
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          margin: -50px 0 0 -50px;
          animation: ringRotate 20s infinite;
        }

        /* Orbites */
        .skill-orbit {
          position: absolute;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          animation: orbitRotate 15s linear infinite;
        }

        .orbit-1 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          margin: -100px 0 0 -100px;
        }

        .orbit-2 {
          width: 240px;
          height: 240px;
          top: 50%;
          left: 50%;
          margin: -120px 0 0 -120px;
          animation: orbitRotate 18s linear infinite reverse;
        }

        .orbit-3 {
          width: 280px;
          height: 280px;
          top: 50%;
          left: 50%;
          margin: -140px 0 0 -140px;
          animation: orbitRotate 22s linear infinite;
        }

        .orbit-skill-icon {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          border: 1px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconCounterRotate 15s linear infinite;
        }

        .orbit-2 .orbit-skill-icon {
          animation: iconCounterRotate 18s linear infinite reverse;
        }

        .orbit-3 .orbit-skill-icon {
          animation: iconCounterRotate 22s linear infinite;
        }

        /* Vagues d'énergie */
        .skill-energy-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 2px solid;
          border-radius: 50%;
          opacity: 0;
          animation: energyWave 3s infinite;
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
        }

        .wave-3 {
          width: 100px;
          height: 100px;
          margin: -50px 0 0 -50px;
          animation-delay: 2s;
        }

        .progress-indicator {
          position: absolute;
          bottom: 20px;
          right: 20px;
          animation: bounce 2s infinite;
        }

        /* Section liste des compétences */
        .skills-list-section {
          
        }

        .skills-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .skills-category-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .skills-stats {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .skills-count {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skills-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Grille des compétences */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .skill-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .skill-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .skill-level-indicator {
          display: flex;
          align-items: center;
        }

        .skill-dots {
          display: flex;
          gap: 0.25rem;
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-color);
          transition: all 0.3s ease;
        }

        .skill-dot.active {
          background: var(--skill-color);
          box-shadow: 0 0 8px var(--skill-color);
        }

        .skill-progress {
          width: 100%;
          height: 6px;
          background: var(--border-color);
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-progress-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px currentColor;
        }

        /* Composants réutilisables */
        .skill-card {
          position: relative;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: var(--skill-color, var(--primary-light, #8b5cf6));
          box-shadow: 0 12px 30px hsla(var(--skill-color, 250), 80%, 65%, 0.3);
        }

        .card-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            var(--bg-glass), 
            rgba(255, 255, 255, 0.05)
          );
          transition: all 0.3s ease;
        }

        .card-content {
          position: relative;
          z-index: 2;
        }

        /* Animations */
        @keyframes skillFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          33% { 
            transform: translateY(-20px) scale(1.1) rotate(120deg);
            opacity: 0.8;
          }
          66% { 
            transform: translateY(-10px) scale(0.9) rotate(240deg);
            opacity: 0.4;
          }
        }

        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes coreRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes iconCounterRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes energyWave {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.5);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .skills-content-grid {
            grid-template-columns: 1fr;
          }

          .categories-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 1.5rem;
          }

          .categories-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .skills-main-area {
            grid-template-rows: 250px 1fr;
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }

          .categories-list {
            grid-template-columns: 1fr;
          }

          .category-item {
            padding: 0.875rem;
          }

          .skills-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .skills-main-area {
            grid-template-rows: 200px 1fr;
            gap: 1.5rem;
          }

          .central-skill-orb .skill-orb-core {
            width: 60px;
            height: 60px;
          }

          .ring-outer { width: 120px; height: 120px; margin: -60px 0 0 -60px; }
          .ring-middle { width: 90px; height: 90px; margin: -45px 0 0 -45px; }
          .ring-inner { width: 75px; height: 75px; margin: -37.5px 0 0 -37.5px; }
        }

        @media (max-width: 480px) {
          .skills-visual-container {
            border-radius: 16px;
            min-height: 500px;
          }

          .categories-sidebar,
          .skills-main-area {
            padding: 1rem;
          }

          .skill-card {
            padding: 1rem;
          }

          .sidebar-title {
            font-size: 1.1rem;
          }

          .skills-category-title {
            font-size: 1.25rem;
          }
        }

        /* Background amélioré pour la section skills */
        .enhanced-skills-background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .skills-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: skillsOrbFloat 15s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #8b5cf6, transparent);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #ec4899, transparent);
          top: 60%;
          right: 15%;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #3b82f6, transparent);
          bottom: 20%;
          left: 50%;
          animation-delay: 10s;
        }

        .geometric-pattern {
          position: absolute;
          opacity: 0.1;
          animation: patternRotate 30s linear infinite;
        }

        .pattern-1 {
          top: 15%;
          right: 20%;
          width: 100px;
          height: 100px;
          background: conic-gradient(from 0deg, transparent, #8b5cf6, transparent);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .pattern-2 {
          bottom: 25%;
          left: 15%;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #ec4899, transparent);
          clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
          animation-direction: reverse;
        }

        /* Neural network effect */
        .neural-network {
          position: absolute;
          inset: 0;
          opacity: 0.2;
        }

        .network-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #8b5cf6;
          border-radius: 50%;
          box-shadow: 0 0 20px #8b5cf6;
          animation: nodesPulse 3s ease-in-out infinite;
        }

        .node-1 { top: 30%; left: 25%; animation-delay: 0s; }
        .node-2 { top: 45%; right: 30%; animation-delay: 1s; }
        .node-3 { bottom: 35%; left: 60%; animation-delay: 2s; }

        .network-connection {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
          opacity: 0.4;
          animation: connectionPulse 4s ease-in-out infinite;
        }

        .connection-1 {
          top: 30%;
          left: 25%;
          width: 200px;
          transform: rotate(25deg);
        }

        .connection-2 {
          top: 45%;
          right: 30%;
          width: 150px;
          transform: rotate(-45deg);
          animation-delay: 2s;
        }

        /* Section principale */
        .skills-section {
          position: relative;
          padding: 6rem 0;
          min-height: 100vh;
          color: var(--text-primary);
          z-index: 10;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px hsla(250, 80%, 65%, 0.6);
          animation-fill-mode: both;
        }

        .skills-subtitle {
          text-align: center;
          margin-bottom: 4rem;
          animation-fill-mode: both;
        }

        .skills-subtitle p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 300;
        }

        .skills-wrapper {
          animation-fill-mode: both;
        }

        /* Animations supplémentaires */
        @keyframes skillsOrbFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          33% { 
            transform: translate(30px, -30px) scale(1.1);
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes patternRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes nodesPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes connectionPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        /* Classes d'animation */
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mode sombre spécifique */
        :global(.dark-mode) {
          --bg-primary: #0f0f23;
          --bg-secondary: #1e1e3f;
          --bg-glass: rgba(30, 30, 60, 0.4);
          --text-primary: #e2e8f0;
          --text-secondary: #a5b4fc;
          --border-color: rgba(139, 92, 246, 0.2);
          --glow-intensity: 0.3;
        }

        :global(.dark-mode) .skills-orb {
          opacity: 0.4;
        }

        :global(.dark-mode) .neural-network {
          opacity: 0.3;
        }

        /* Mode jour spécifique */
        :global(.light-mode) {
          --bg-primary: #f8fafc;
          --bg-secondary: #f1f5f9;
          --bg-glass: rgba(255, 255, 255, 0.7);
          --text-primary: #334155;
          --text-secondary: #64748b;
          --border-color: rgba(139, 92, 246, 0.15);
          --glow-intensity: 0.2;
        }

        :global(.light-mode) .skills-orb {
          opacity: 0.2;
          filter: blur(80px);
        }

        :global(.light-mode) .neural-network {
          opacity: 0.1;
        }

        :global(.light-mode) .geometric-pattern {
          opacity: 0.05;
        }

        /* Support RTL */
        :global(.rtl) .category-content {
          flex-direction: row-reverse;
        }
        
        :global(.rtl) .skill-info {
          flex-direction: row-reverse;
        }
        
        :global(.rtl) .skills-header {
          flex-direction: row-reverse;
        }

        :global(.rtl) .category-arrow {
          transform: scaleX(-1);
        }

        :global(.rtl) .category-item.active .category-arrow {
          transform: scaleX(-1) translateX(0);
        }
        }
      `}</style>
    </>
  );
}