import React from 'react';
import { Eye, Github, ExternalLink, Globe, Layout, Database, Server, Code, PieChart } from 'lucide-react';

function ProjectCard({ project }) {
  // Fonction pour obtenir l'icône du projet
  const getProjectIcon = () => {
    switch (project.category) {
      case 'web':
        return <Globe size={24} />;
      case 'mobile':
        return <Layout size={24} />;
      case 'database':
        return <Database size={24} />;
      case 'backend':
        return <Server size={24} />;
      case 'frontend':
        return <Code size={24} />;
      case 'fullstack':
        return <PieChart size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  return (
    <div className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-card-inner">
        {/* Face avant uniquement */}
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
            <div className="project-header">
              <div className="project-icon">{getProjectIcon()}</div>
              <h3 className="project-title">{project.title}</h3>
            </div>
            <p className="project-description">{project.description}</p>

            <div className="project-tech">
              {project.technologies?.slice(0, 4).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
              {project.technologies?.length > 4 && (
                <span className="tech-tag">+{project.technologies.length - 4}</span>
              )}
            </div>
          </div>

          {/* ✅ Ce lien remplace le flip */}
          <div className="card-flip-info">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>Cliquez pour plus </span>
                <Github size={16} />
              </a>
            ) : (
              <span>Aucun lien disponible</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
