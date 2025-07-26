import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Brain, PenTool, Code } from 'lucide-react';

function ProjectCard({ project }) {
  const { t } = useTranslation();

  const getProjectIcon = () => {
    switch (project.category) {
      case 'ai':
        return <Brain size={24} />;
      case 'freelance':
        return <PenTool size={24} />;
      case 'research':
        return <Code size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  return (
    <div className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-card-inner">
        <div className="project-card-front">
          <div className="project-image">
            <img
              src={project.imageUrl || '/assets/images/project-placeholder.jpg'}
              alt={project.title}
              loading="lazy"
            />
            {project.featured && <span className="featured-badge">{t('projects.featured')}</span>}
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

          <div className="card-flip-info">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>{t('projects.viewDetails')}</span>
                <Github size={16} />
              </a>
            ) : (
              <span>{t('projects.noLinkAvailable')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;