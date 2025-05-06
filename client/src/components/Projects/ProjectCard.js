import React, { useState } from 'react';
import './Projects.css';

function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className={`project-card ${isFlipped ? 'flipped' : ''} ${project.featured ? 'featured' : ''}`}
      onClick={handleCardFlip}
    >
      <div className="project-card-inner">
        {/* Front du carte */}
        <div className="project-card-front">
          <div className="project-image">
            <img 
              src={project.imageUrl || '/assets/images/project-placeholder.jpg'} 
              alt={project.title} 
            />
            {project.featured && <span className="featured-badge">Mis en avant</span>}
          </div>
          
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          
          <div className="card-flip-info">
            <span>Cliquez pour plus de détails</span>
          </div>
        </div>
        
        {/* Arrière de la carte */}
        <div className="project-card-back">
          <h3 className="project-title">{project.title}</h3>
          
          <div className="project-details">
            <h4>Description détaillée</h4>
            <p>{project.description}</p>
            
            <h4>Technologies utilisées</h4>
            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              {project.projectUrl && (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir le projet
                </a>
              )}
              
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir le code
                </a>
              )}
            </div>
          </div>
          
          <div className="card-flip-info">
            <span>Cliquez pour revenir</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;