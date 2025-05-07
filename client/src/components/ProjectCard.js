import React, { useState } from 'react';

function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Prévenir la propagation du clic pour les liens
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      className={`project-card ${project.featured ? 'featured' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`project-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Face avant de la carte */}
        <div className="project-card-front">
          <div className="project-image">
            <img 
              src={project.imageUrl || '/assets/images/project-placeholder.jpg'} 
              alt={project.title} 
              loading="lazy"
            />
            {project.featured && <span className="featured-badge">Mis en avant</span>}
          </div>
          
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="tech-tag">+{project.technologies.length - 4}</span>
              )}
            </div>
          </div>
          
          <div className="card-flip-info">
            <span>Cliquez pour plus de détails</span>
          </div>
        </div>
        
        {/* Face arrière de la carte */}
        <div className="project-card-back">
          <h3 className="project-title">{project.title}</h3>
          
          <div className="project-details">
            <h4>Description</h4>
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
                  onClick={handleLinkClick}
                >
                  <span>Voir le projet</span>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              )}
              
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  onClick={handleLinkClick}
                >
                  <span>Code source</span>
                  <i className="fab fa-github"></i>
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