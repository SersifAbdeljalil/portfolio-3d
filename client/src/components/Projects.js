import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

// Composant pour le modèle 3D dans la section projets
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

// Composant de carte de projet
function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className={`project-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="project-card-inner">
        <div className="project-card-front">
          <div className="project-image">
            <img src={project.image} alt={project.title} />
            {project.featured && <div className="featured-badge">Featured</div>}
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="card-flip-info">Cliquez pour plus de détails</div>
          </div>
        </div>
        
        <div className="project-card-back">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.detailedDescription || project.description}</p>
          
          <h4>Fonctionnalités clés:</h4>
          <ul className="project-features">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <div className="project-links">
            {project.demoLink && (
              <a href={project.demoLink} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-eye"></i> Demo
              </a>
            )}
            
            {project.githubLink && (
              <a href={project.githubLink} className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
            )}
          </div>
          
          <div className="card-flip-info">Cliquez pour revenir</div>
        </div>
      </div>
    </div>
  );
}

// Composant principal Projects
function Projects() {
  // Simuler des données de projets
  const allProjects = [
    {
      id: 1,
      title: "Portfolio 3D",
      description: "Portfolio interactif avec animations 3D utilisant React et Three.js",
      detailedDescription: "Un portfolio immersif utilisant les dernières technologies web pour créer une expérience utilisateur unique avec des visualisations 3D interactives.",
      image: "/assets/images/projects/portfolio.jpg",
      technologies: ["React", "Three.js", "CSS3"],
      category: "3D",
      featured: true,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Mode jour/nuit",
        "Animations 3D interactives",
        "Design responsive",
        "Optimisation des performances"
      ]
    },
    {
      id: 2,
      title: "E-commerce Dashboard",
      description: "Tableau de bord administrateur pour une plateforme e-commerce",
      detailedDescription: "Un dashboard complet pour gérer les produits, les commandes et les clients d'une boutique en ligne.",
      image: "/assets/images/projects/dashboard.jpg",
      technologies: ["React", "Node.js", "MySQL", "Chart.js"],
      category: "Web",
      featured: false,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Authentification sécurisée",
        "Visualisation des données avec Chart.js",
        "Gestion des produits et des commandes",
        "Interface utilisateur intuitive"
      ]
    },
    {
      id: 3,
      title: "Visualiseur de musique 3D",
      description: "Application de visualisation musicale en 3D réagissant au son",
      detailedDescription: "Une expérience immersive qui convertit la musique en visuels 3D en temps réel, réagissant aux fréquences et au volume.",
      image: "/assets/images/projects/music.jpg",
      technologies: ["Three.js", "Web Audio API", "JavaScript"],
      category: "3D",
      featured: true,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Analyse audio en temps réel",
        "Visualisations 3D personnalisables",
        "Réactivité aux fréquences basses/moyennes/hautes",
        "Mode plein écran immersif"
      ]
    },
    {
      id: 4,
      title: "Application de tâches collaborative",
      description: "Application permettant la gestion de tâches en équipe",
      detailedDescription: "Une application web complète pour la gestion de projets et de tâches, avec fonctionnalités collaboratives en temps réel.",
      image: "/assets/images/projects/tasks.jpg",
      technologies: ["React", "Firebase", "Material-UI"],
      category: "Web",
      featured: false,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Authentification multi-utilisateurs",
        "Mise à jour en temps réel avec Firebase",
        "Système de notification",
        "Gestion des droits d'accès"
      ]
    },
    {
      id: 5,
      title: "Jeu de plateforme 3D",
      description: "Jeu de plateforme développé avec Three.js et la physique Cannon.js",
      detailedDescription: "Un jeu de plateforme 3D entièrement développé en JavaScript, avec des niveaux générés procéduralement.",
      image: "/assets/images/projects/game.jpg",
      technologies: ["Three.js", "Cannon.js", "JavaScript"],
      category: "3D",
      featured: false,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Génération procédurale de niveaux",
        "Système de physique réaliste",
        "Effets visuels avancés",
        "Système de score et de progression"
      ]
    },
    {
      id: 6,
      title: "API de reconnaissance d'images",
      description: "API REST pour la reconnaissance et la classification d'images",
      detailedDescription: "Une API robuste qui utilise le machine learning pour identifier et catégoriser des objets dans les images.",
      image: "/assets/images/projects/api.jpg",
      technologies: ["Node.js", "TensorFlow.js", "Express", "MongoDB"],
      category: "API",
      featured: false,
      demoLink: "#",
      githubLink: "#",
      features: [
        "Classification d'images par IA",
        "API RESTful documentée",
        "Haute performance et mise en cache",
        "Support pour différents formats d'image"
      ]
    }
  ];
  
  const [projects, setProjects] = useState(allProjects);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Détecter le mode sombre
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    checkTheme(); // Vérifier au chargement
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  // Filtrer les projets en fonction de la catégorie et de la recherche
  useEffect(() => {
    let filteredProjects = allProjects;
    
    // Filtrer par catégorie
    if (activeFilter !== "all") {
      filteredProjects = filteredProjects.filter(project => project.category === activeFilter);
    }
    
    // Filtrer par recherche
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    setProjects(filteredProjects);
  }, [activeFilter, searchQuery]);
  
  // Récupérer toutes les catégories uniques
  const categories = ["all", ...new Set(allProjects.map(project => project.category))];
  
  return (
    <section className="projects section">
      <div className="container">
        <h2 className="section-title">Mes Projets</h2>
        
        <div className="projects-controls">
          <div className="project-search">
            <div className="search-input-container">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="project-filters">
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category === "all" ? "Tous" : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="no-projects">
              <p>Aucun projet ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
        
        <div className="projects-3d">
          <h3 className="projects-3d-title">Découvrez mes projets 3D</h3>
          <div className="three-container" style={{ height: "400px" }}>
            <ProjectsVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;