import React, { useState, useEffect } from 'react';
import { Eye, Github, ExternalLink, Code, Database, Server, Layout, Globe, BookOpen, PieChart } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import roomBookingImage from './assets/images/room-booking.png';
import can from './assets/images/Can.png';
import chu from './assets/images/CHU.png';
import emploi from './assets/images/emplois.png';
import prof from './assets/images/prof.png';
import smartMetre from './assets/images/Smart-Metre.png';
import TTS from './assets/images/TTS.png';

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
            {project.featured && <span className="featured-badge">Mis en avant</span>}
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
                <span>Cliquez pour plus de détails</span>
                <Github size={16} />
              </a>
            ) : (
              <span>Cliquez pour plus de détails</span>
            )}
          </div>
        </div>

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
            <h4>Fonctionnalités</h4>
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
                  <span>Démo</span>
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
                  <span>Code source</span>
                  <Github size={16} />
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Données des projets
  const projectsData = [
    {
      id: 1,
      title: "Application de Revente de Tickets CAN2025",
      description: "Application permettant la gestion et la revente de tickets pour la Coupe d'Afrique des Nations 2025. Le projet est divisé en deux parties principales: frontend et backend.",
      imageUrl:can,
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
    { id: "all", name: "Tous" },
    { id: "fullstack", name: "Full Stack" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Mobile" },
    { id: "web", name: "Web" }
  ];

  return (
    <section className="projects-section">
      <h2 className="section-title">Mes Projets</h2>
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
            placeholder="Rechercher un projet..."
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
            <p>Aucun projet ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
      <div className="projects-3d">
        <h3 className="projects-3d-title">Découvrez mes projets en 3D</h3>
        <div className="three-container">
          <ProjectsVisual />
        </div>
      </div>
    </section>
  );
}

// CSS pour le composant
const styles = `
.projects-section {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 2rem;
  text-align: center;
}

.projects-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: rgba(15, 15, 35, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background-color: rgba(30, 30, 60, 0.6);
  color: #a5b4fc;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  background-color: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
  transform: translateY(-2px);
}

.filter-btn.active {
  background-color: #8b5cf6;
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.5);
}

.project-search {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  background-color: rgba(30, 30, 60, 0.6);
  color: #ffffff;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
}

.search-input::placeholder {
  color: #a5b4fc;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background-color: transparent;
  perspective: 1000px;
  height: 450px;
  cursor: pointer;
}

.project-card.featured {
  grid-column: span 2;
}

.project-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.project-card:hover .project-card-inner {
  transform: scale(1.03);
}

.project-card.flipped .project-card-inner {
  transform: rotateY(180deg);
}

.project-card-front, .project-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background-color: rgba(30, 30, 60, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.project-card-back {
  transform: rotateY(180deg);
  padding: 1.5rem;
  overflow-y: auto;
  text-align: left;
}

.project-image {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.project-icon {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.project-title {
  font-size: 1.25rem;
  color: #c4b5fd;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.project-description {
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: #e2e8f0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background-color: rgba(139, 92, 246, 0.2);
  color: #c4b5fd;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.card-flip-info {
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #a5b4fc;
  background-color: rgba(139, 92, 246, 0.1);
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}

.project-details h4 {
  font-size: 1rem;
  color: #c4b5fd;
  margin: 1rem 0 0.5rem;
  font-weight: 600;
}

.project-features {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.project-features li {
  margin-bottom: 0.5rem;
  color: #e2e8f0;
  font-size: 0.875rem;
  list-style-type: circle;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  border: none;
}

.btn-secondary {
  background-color: transparent;
  color: #c4b5fd;
  border: 1px solid #8b5cf6;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #9f7aea, #7c3aed);
}

.btn-secondary:hover {
  background-color: rgba(139, 92, 246, 0.1);
}

.projects-3d {
  background-color: rgba(30, 30, 60, 0.6);
  border-radius: 1rem;
  overflow: hidden;
  padding: 1.5rem;
  margin-top: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.projects-3d-title {
  color: #c4b5fd;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.three-container {
  height: 300px;
  border-radius: 0.75rem;
  overflow: hidden;
}

.no-projects {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: rgba(30, 30, 60, 0.6);
  border-radius: 1rem;
  color: #c4b5fd;
}

@media (max-width: 1024px) {
  .project-card.featured {
    grid-column: span 1;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .project-card {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-controls {
    padding: 1rem;
  }
  
  .filter-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }
}

/* Animation styles */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-card {
  animation: fadeIn 0.6s ease-out forwards;
}

.project-card:nth-child(2) { animation-delay: 0.1s; }
.project-card:nth-child(3) { animation-delay: 0.2s; }
.project-card:nth-child(4) { animation-delay: 0.3s; }
.project-card:nth-child(5) { animation-delay: 0.4s; }
.project-card:nth-child(6) { animation-delay: 0.5s; }
.project-card:nth-child(7) { animation-delay: 0.6s; }
`;

// Add styles to the component
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);