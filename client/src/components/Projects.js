import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Eye, Github, ExternalLink, Code, Brain, PenTool } from 'lucide-react';
import ngiImage from './assets/images/ngi-system.png'; 
import intrusionImage from './assets/images/intrusion-detection.png';
import emotionImage from './assets/images/emotion-recognition.png'; 
import './Projects.css';

function ProjectsVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#6c63ff"
            attach="material"
            distort={0.5}
            speed={1.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}

function ProjectCard({ project }) {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const getProjectIcon = () => {
    switch(project.category) {
      case 'ai': return <Brain size={24} />;
      case 'freelance': return <PenTool size={24} />;
      case 'research': return <Code size={24} />;
      default: return <Code size={24} />;
    }
  };

  // Fonction pour obtenir l'image appropriée selon le titre du projet
  const getProjectImage = () => {
    const title = project.title.toLowerCase();
    if (title.includes('ngi') || title.includes('generation')) {
      return ngiImage;
    } else if (title.includes('intrusion') || title.includes('detection')) {
      return intrusionImage;
    } else if (title.includes('emotion') || title.includes('reconnaissance')) {
      return emotionImage;
    }
    return project.imageUrl || '/assets/images/project-placeholder.jpg';
  };

  return (
    <div className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className={`project-card-inner ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="project-card-front">
          <div className="project-image">
            <img src={getProjectImage()} alt={project.title} loading="lazy" />
            {project.featured && <span className="featured-badge">{t('projects.featured')}</span>}
          </div>
          <div className="project-content">
            <div className="project-header">
              <div className="project-icon">{getProjectIcon()}</div>
              <h3 className="project-title">{project.title}</h3>
            </div>
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
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm btn-icon"
                onClick={(e) => handleLinkClick(e)}
              >
                <span>{t('projects.viewDetails')}</span>
                <Github size={16} />
              </a>
            ) : (
              <span>{t('projects.viewDetails')}</span>
            )}
          </div>
        </div>

        <div className="project-card-back">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-details">
            <h4>{t('projects.description')}</h4>
            <p>{project.description}</p>
            <h4>{t('projects.technologies')}</h4>
            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <h4>{t('projects.features')}</h4>
            <ul className="project-features">
              {project.features && project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="project-links">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm btn-icon"
                  onClick={handleLinkClick}
                >
                  <span>{t('projects.demo')}</span>
                  <Eye size={16} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm btn-icon"
                  onClick={handleLinkClick}
                >
                  <span>{t('projects.sourceCode')}</span>
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="card-flip-info">
            <span>{t('projects.returnBack')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const projectsData = t('projects.projectsList', { returnObjects: true });
  
  useEffect(() => {
    let filtered = projectsData;
    if (activeFilter !== "all") {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    setFilteredProjects(filtered);
  }, [activeFilter, searchQuery, projectsData]);

  const categories = [
    { id: "all", name: t('projects.categories.all') },
    { id: "ai", name: t('projects.categories.ai') },
    { id: "freelance", name: t('projects.categories.freelance') },
    { id: "research", name: t('projects.categories.research') }
  ];

  return (
    <section className="projects-section">
      <h2 className="section-title">{t('projects.title')}</h2>
      <div className="projects-controls">
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="project-search">
          <input
            type="text"
            className="search-input"
            placeholder={t('projects.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))
        ) : (
          <div className="no-projects">
            <p>{t('projects.noProjectsFound')}</p>
          </div>
        )}
      </div>
      
      <div className="projects-3d">
        <h3 className="projects-3d-title">{t('projects.discover3D')}</h3>
        <div className="featured-3d-project">
          <div className="featured-3d-content">
            <h4 className="project-title-3d">Portfolio AI & Freelance</h4>
            <p className="project-description-3d">
              {t('home.description')}
            </p>
            <div className="project-tech-3d">
              <span className="tech-tag">React.js</span>
              <span className="tech-tag">Three.js</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">i18n</span>
            </div>
            <div className="project-links-3d">
              <a 
                href="https://github.com/ibtissamejabir/portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm btn-icon"
              >
                <span>{t('projects.sourceCode')}</span>
                <Github size={16} />
              </a>
            </div>
          </div>
          <div className="three-container">
            <ProjectsVisual />
          </div>
        </div>
      </div>
    </section>
  );
}