import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Database, Brain, PenTool, Wrench } from 'lucide-react';

const SkillsVisual = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('ai');
  const [animateSkills, setAnimateSkills] = useState(false);
  
  useEffect(() => {
    setAnimateSkills(true);
  }, []);
  
  useEffect(() => {
    setAnimateSkills(false);
    const timer = setTimeout(() => setAnimateSkills(true), 50);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = [
    { id: 'ai', name: t('skills.categories.ai'), icon: <Brain size={20} /> },
    { id: 'freelance', name: t('skills.categories.freelance'), icon: <PenTool size={20} /> },
    { id: 'programming', name: t('skills.categories.programming'), icon: <Code size={20} /> },
    { id: 'dataScience', name: t('skills.categories.dataScience'), icon: <Wrench size={20} /> },
    { id: 'databases', name: t('skills.categories.databases'), icon: <Database size={20} /> },
    { id: 'communication', name: t('skills.categories.communication'), icon: <PenTool size={20} /> },
  ];

  const skillsData = t('skills.details', { returnObjects: true });

  const getCategoryColor = (category) => {
    switch(category) {
      case 'ai': return '#8b5cf6';
      case 'freelance': return '#f97316';
      case 'programming': return '#6366f1';
      case 'dataScience': return '#3b82f6';
      case 'databases': return '#10b981';
      case 'communication': return '#ec4899';
      default: return '#8b5cf6';
    }
  };

  const getProgressColor = (category) => {
    return getCategoryColor(category);
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
              key={skill} 
              className={`skill-item ${animateSkills ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <span className="skill-name">{skill}</span>
              </div>
              
              <div className="skill-bar-container">
                <div 
                  className="skill-bar-fill" 
                  style={{ 
                    width: animateSkills ? '100%' : '0%',
                    backgroundColor: getProgressColor(activeCategory)
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
  const { t } = useTranslation();
  
  return (
    <section className="skills-section">
      <h2 className="section-title">{t('skills.title')}</h2>
      <SkillsVisual />
      
      <style jsx>{`
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
          scrollbar-width: none;
        }

        .categories-tabs::-webkit-scrollbar {
          display: none;
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

        .skill-name {
          font-size: 1rem;
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

        :global(.rtl) .category-tab {
          flex-direction: row-reverse;
        }
        
        :global(.rtl) .skill-header {
          flex-direction: row-reverse;
        }
      `}</style>
    </section>
  );
}