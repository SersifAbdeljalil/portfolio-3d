import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Eye, Github, ExternalLink, Code, Database, Server, Layout, Globe, PieChart } from 'lucide-react';
import roomBookingImage from './assets/images/room-booking.png';
import can from './assets/images/Can.png';
import chu from './assets/images/CHU.png';
import emploi from './assets/images/emplois.png';
import prof from './assets/images/prof.png';
import smartMetre from './assets/images/Smart-Metre.png';
import TTS from './assets/images/TTS.png';
import './Projects.css'; // Import the CSS file

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
      case 'web': return <Globe size={24} />;
      case 'mobile': return <Layout size={24} />;
      case 'database': return <Database size={24} />;
      case 'backend': return <Server size={24} />;
      case 'frontend': return <Code size={24} />;
      case 'fullstack': return <PieChart size={24} />;
      default: return <Code size={24} />;
    }
  };

  return (
    <div className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className={`project-card-inner ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="project-card-front">
          <div className="project-image">
            <img src={project.imageUrl || '/assets/images/project-placeholder.jpg'} alt={project.title} loading="lazy" />
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
  
  // Données des projets
  const projectsData = [
    {
      id: 1,
      title: "Application de Revente de Tickets CAN2025",
      description: "Application permettant la gestion et la revente de tickets pour la Coupe d'Afrique des Nations 2025. Le projet est divisé en deux parties principales: frontend et backend.",
      imageUrl: can,
      category: "fullstack",
      featured: true,
      technologies: ["React.js", "CSS", "MySQL", "JWT", "Node.js", "Express"],
      features: [
        "Système d'authentification sécurisé",
        "Gestion des utilisateurs et leurs profils",
        "Système de mise en vente de tickets",
        "Interface de recherche et filtrage des tickets",
        "Gestion des transactions et paiements"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/revevdre_ticket",
      demoUrl: null
    },
    {
      id: 2,
      title: "Gestion de Professeurs",
      description: "Projet académique permettant aux professeurs de consulter leur profil et télécharger leur carte professionnelle avec un QR code. L'administrateur peut ajouter des professeurs via un fichier Excel ou manuellement.",
      imageUrl: prof,
      category: "web",
      featured: false,
      technologies: ["React.js", "Express.js", "MySQL"],
      features: [
        "Interface administrateur pour la gestion des professeurs",
        "Importation de données via Excel",
        "Génération de cartes professionnelles avec QR code",
        "Système de profil utilisateur"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/gestion_professeurs",
      demoUrl: null
    },
    {
      id: 3,
      title: "Réservation de Salles & Emplois du Temps",
      description: "Système de gestion d'emplois du temps et de réservation de salles avec différents rôles utilisateurs (admin, professeur, étudiant).",
      imageUrl: emploi,
      category: "fullstack",
      featured: true,
      technologies: ["React.js", "JWT", "Express.js"],
      features: [
        "Génération d'emplois du temps par filière et semestre",
        "Visualisation de statistiques de la plateforme",
        "Gestion des étudiants, professeurs, salles et départements",
        "Système de notification pour les changements d'horaires",
        "Réservation de salles et consultation d'emplois du temps"
      ],
      githubUrl: "https://github.com/enimsay21/site_web_resevation_salle_emplois_de-_temps",
      demoUrl: null
    },
    {
      id: 4,
      title: "Application Web CHU",
      description: "Système de gestion pour un Centre Hospitalier Universitaire (CHU) utilisant des design patterns en Java. Le projet modélise efficacement le CHU El Jadida, avec ses bâtiments, personnel, services, patients et sections.",
      imageUrl: chu,
      category: "backend",
      featured: false,
      technologies: ["Java EE", "JDBC", "Base de données relationnelle"],
      features: [
        "Modélisation complète d'un CHU",
        "Gestion des bâtiments et services",
        "Gestion du personnel médical",
        "Suivi des patients",
        "Application des design patterns Java"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/University-Hospital-Center-app-with-JEE",
      demoUrl: null
    },
    {
      id: 5,
      title: "Application Mobile de Gestion de Bibliothèque",
      description: "Solution mobile intuitive et efficace pour la gestion des emprunts de livres. Permet aux utilisateurs de consulter le catalogue, faire des demandes d'emprunt, annuler une demande ou modifier leur profil.",
      imageUrl: roomBookingImage,
      category: "mobile",
      featured: false,
      technologies: ["React Native", "JWT", "Express.js"],
      features: [
        "Consultation du catalogue de livres",
        "Système de demande d'emprunt",
        "Interface administrateur pour gérer les livres",
        "Gestion des profils utilisateurs",
        "Architecture moderne avec interface conviviale"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/RestFull",
      demoUrl: null
    },
    {
      id: 6,
      title: "Text to Speech",
      description: "Application permettant de convertir du texte (PDF ou écrit) en audio, facilitant l'accessibilité et la consommation de contenu textuel.",
      imageUrl: TTS,
      category: "web",
      featured: false,
      technologies: ["React.js", "Express.js", "Node.js", "Google TTS API"],
      features: [
        "Conversion de texte en audio",
        "Support de fichiers PDF",
        "Interface utilisateur intuitive",
        "Options de personnalisation de la voix"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/projet_TTS",
      demoUrl: null
    },
    {
      id: 7,
      title: "Smart-Mètre",
      description: "Partie frontend d'un projet qui permet de détecter et d'envoyer des alertes pour un mètre d'oxygène, contribuant à la surveillance et à la sécurité des installations.",
      imageUrl: smartMetre,
      category: "frontend",
      featured: false,
      technologies: ["React.js", "JWT", "Express.js"],
      features: [
        "Interface de surveillance en temps réel",
        "Système d'alerte pour les niveaux critiques",
        "Tableau de bord interactif",
        "Gestion des notifications"
      ],
      githubUrl: "https://github.com/SersifAbdeljalil/smart-metre",
      demoUrl: null
    }
  ];
  
  // Filtrer les projets en fonction de la catégorie et de la recherche
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
  }, [activeFilter, searchQuery]);

  const categories = [
    { id: "all", name: t('projects.categories.all') },
    { id: "fullstack", name: t('projects.categories.fullstack') },
    { id: "frontend", name: t('projects.categories.frontend') },
    { id: "backend", name: t('projects.categories.backend') },
    { id: "mobile", name: t('projects.categories.mobile') },
    { id: "web", name: t('projects.categories.web') }
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
            <ProjectCard key={project.id} project={project} />
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
            <h4 className="project-title-3d">Portfolio 3D Interactif</h4>
            <p className="project-description-3d">
              Site web portfolio personnel mettant en valeur mes projets et compétences avec des animations 3D immersives
              et un design moderne. Le site est multilingue et offre une expérience utilisateur fluide et interactive.
            </p>
            <div className="project-tech-3d">
              <span className="tech-tag">React.js</span>
              <span className="tech-tag">Three.js</span>
              <span className="tech-tag">Node.js (Express)</span>
              <span className="tech-tag">CSS</span>
              <span className="tech-tag">MySQL</span>
              <span className="tech-tag">i18n</span>
            </div>
            <div className="project-links-3d">
              <a 
                href="https://github.com/SersifAbdeljalil/portfolio-3d" 
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