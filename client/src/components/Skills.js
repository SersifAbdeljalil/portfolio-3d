import React, { useState, useEffect } from 'react';
import { Code, Server, Database, Cpu, Wrench, PenTool, Box } from 'lucide-react';

const SkillsVisual = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [animateSkills, setAnimateSkills] = useState(false);
  
  // Active animation after component mounts
  useEffect(() => {
    setAnimateSkills(true);
  }, []);
  
  // Change animation state when category changes
  useEffect(() => {
    setAnimateSkills(false);
    const timer = setTimeout(() => setAnimateSkills(true), 50);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <Code size={20} /> },
    { id: 'backend', name: 'Backend', icon: <Server size={20} /> },
    { id: '3d', name: '3D & Animation', icon: <Box size={20} /> },
    { id: 'iot', name: 'IoT & Embarqué', icon: <Cpu size={20} /> },
    { id: 'database', name: 'Bases de données', icon: <Database size={20} /> },
    { id: 'design', name: 'UI/UX Design', icon: <PenTool size={20} /> },
    { id: 'tools', name: 'Outils & DevOps', icon: <Wrench size={20} /> },
  ];

  const skillsData = {
    frontend: [
      { name: 'HTML5', badge: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white', level: 95 },
      { name: 'CSS3', badge: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white', level: 90 },
      { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black', level: 92 },
      { name: 'React', badge: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black', level: 88 },
      { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white', level: 85 },
      { name: 'Angular', badge: 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white', level: 80 },
      { name: 'Flutter', badge: 'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white', level: 75 }
    ],
    backend: [
      { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white', level: 90 },
      { name: 'Express.js', badge: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white', level: 85 },
      { name: 'Java', badge: 'https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white', level: 90 },
      { name: 'Spring', badge: 'https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white', level: 85 },
      { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white', level: 82 },
      { name: 'PHP', badge: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white', level: 75 }
    ],
    '3d': [
      { name: 'Three.js', badge: 'https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white', level: 85 },
      { name: 'WebGL', badge: 'https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white', level: 80 },
      { name: 'Blender', badge: 'https://img.shields.io/badge/Blender-F5792A?style=for-the-badge&logo=blender&logoColor=white', level: 75 },
      { name: 'Unity', badge: 'https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity&logoColor=white', level: 70 },
      { name: 'GSAP', badge: 'https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black', level: 85 }
    ],
    iot: [
      { name: 'Arduino', badge: 'https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white', level: 85 },
      { name: 'Raspberry Pi', badge: 'https://img.shields.io/badge/Raspberry_Pi-C51A4A?style=for-the-badge&logo=raspberry-pi&logoColor=white', level: 80 },
      { name: 'ESP32', badge: 'https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge&logo=espressif&logoColor=white', level: 75 },
      { name: 'MQTT', badge: 'https://img.shields.io/badge/MQTT-3C5280?style=for-the-badge&logo=eclipse-mosquitto&logoColor=white', level: 70 },
      { name: 'C/C++', badge: 'https://img.shields.io/badge/C%2FC%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white', level: 80 }
    ],
    database: [
      { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white', level: 90 },
      { name: 'PostgreSQL', badge: 'https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white', level: 85 },
      { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white', level: 80 },
      { name: 'Oracle', badge: 'https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white', level: 85 }
    ],
    design: [
      { name: 'Figma', badge: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white', level: 90 },
      { name: 'Adobe XD', badge: 'https://img.shields.io/badge/Adobe_XD-FF61F6?style=for-the-badge&logo=adobe-xd&logoColor=white', level: 85 },
      { name: 'Tailwind', badge: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white', level: 90 },
      { name: 'Bootstrap', badge: 'https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white', level: 85 },
      { name: 'Material UI', badge: 'https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white', level: 80 }
    ],
    tools: [
      { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white', level: 92 },
      { name: 'GitHub', badge: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white', level: 90 },
      { name: 'Docker', badge: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white', level: 85 },
      { name: 'Jira', badge: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white', level: 88 },
      { name: 'Postman', badge: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white', level: 90 }
    ]
  };

  // Couleur des barres de progression personnalisée par catégorie
  const getCategoryColor = (category) => {
    switch(category) {
      case 'frontend': return '#8b5cf6';  // Violet clair
      case 'backend': return '#6366f1';   // Indigo
      case 'database': return '#3b82f6';  // Bleu
      case '3d': return '#ec4899';        // Rose
      case 'iot': return '#8b5cf6';       // Violet
      case 'design': return '#f97316';    // Orange
      case 'tools': return '#10b981';     // Vert émeraude
      default: return '#8b5cf6';          // Violet par défaut
    }
  };

  // Obtenir une couleur pour la barre de progression basée sur la catégorie
  const getProgressColor = (level) => {
    const baseColor = getCategoryColor(activeCategory);
    // Ajouter une légère variation basée sur le niveau
    return baseColor;
  };

  return (
    <div className="skills-visual-container">
      <div className="categories-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="skills-display">
        <div className="skills-content">
          {skillsData[activeCategory]?.map((skill, index) => (
            <div 
              key={skill.name} 
              className={`skill-item ${animateSkills ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <img src={skill.badge} alt={skill.name} className="skill-badge" />
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              
              <div className="skill-bar-container">
                <div 
                  className="skill-bar-fill" 
                  style={{ 
                    width: animateSkills ? `${skill.level}%` : '0%',
                    backgroundColor: getProgressColor(skill.level)
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section className="skills-section">
      <h2 className="section-title">Mes Compétences</h2>
      <SkillsVisual />
    </section>
  );
}

// CSS Styles for this component
const styles = `
.skills-section {
  padding: 2rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 2rem;
}

.skills-visual-container {
  background-color: rgba(15, 15, 35, 0.5);
  border-radius: 1rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.categories-tabs {
  display: flex;
  overflow-x: auto;
  background-color: rgba(30, 30, 60, 0.6);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  scrollbar-width: none; /* Firefox */
}

.categories-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #a5b4fc;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.category-tab:hover {
  color: #c4b5fd;
  background-color: rgba(139, 92, 246, 0.1);
}

.category-tab.active {
  color: #8b5cf6;
  border-bottom: 2px solid #8b5cf6;
  background-color: rgba(139, 92, 246, 0.15);
}

.category-icon {
  display: flex;
  align-items: center;
}

.skills-display {
  padding: 1.5rem;
}

.skills-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  background-color: rgba(30, 30, 60, 0.4);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.skill-item.animate {
  opacity: 1;
  transform: translateY(0);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.skill-badge {
  height: 28px;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.skill-badge:hover {
  transform: scale(1.05);
}

.skill-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: #c4b5fd;
}

.skill-bar-container {
  height: 8px;
  background-color: rgba(139, 92, 246, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  width: 0;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

@media (max-width: 768px) {
  .skills-content {
    grid-template-columns: 1fr;
  }
  
  .category-tab {
    padding: 0.75rem 1rem;
  }
}

/* Animation d'effet néon sur les barres de progression */
@keyframes neonGlow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.8);
  }
  50% {
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
  }
}

.skill-bar-fill {
  animation: neonGlow 2s infinite;
}
`;

// Add styles to the component
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);