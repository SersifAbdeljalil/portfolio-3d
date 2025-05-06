import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ProjectCard from './ProjectCard';
import api from '../../api';
import './Projects.css';

// Composant 3D pour la section Projets
function ProjectsScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Environment preset="city" />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Vous pouvez ajouter des éléments 3D décoratifs ici */}
    </Canvas>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Récupérer les projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.projects.getAllProjects();
        setProjects(response);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des projets:', err);
        setError('Impossible de charger les projets. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Projets mockés pour le développement si l'API n'est pas encore connectée
  const mockProjects = [
    {
      id: 1,
      title: "E-commerce 3D",
      description: "Une application e-commerce avec visualisation des produits en 3D grâce à Three.js.",
      technologies: ["React", "Three.js", "Node.js", "Express", "MySQL"],
      imageUrl: "/assets/images/project1.jpg",
      projectUrl: "https://example.com/project1",
      githubUrl: "https://github.com/yourusername/project1",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Interactif",
      description: "Un portfolio créatif avec des animations et interactions 3D.",
      technologies: ["React", "Three.js", "Framer Motion", "CSS3"],
      imageUrl: "/assets/images/project2.jpg",
      projectUrl: "https://example.com/project2",
      githubUrl: "https://github.com/yourusername/project2",
      featured: true
    },
    {
      id: 3,
      title: "Application de Gestion",
      description: "Système de gestion complet avec authentification et fonctionnalités CRUD.",
      technologies: ["React", "Redux", "Node.js", "MySQL"],
      imageUrl: "/assets/images/project3.jpg",
      projectUrl: "https://example.com/project3",
      githubUrl: "https://github.com/yourusername/project3",
      featured: false
    },
    {
      id: 4,
      title: "Jeu Web 3D",
      description: "Un jeu interactif créé avec Three.js et la physique en temps réel.",
      technologies: ["JavaScript", "Three.js", "Cannon.js", "HTML5"],
      imageUrl: "/assets/images/project4.jpg",
      projectUrl: "https://example.com/project4",
      githubUrl: "https://github.com/yourusername/project4",
      featured: false
    },
    {
      id: 5,
      title: "API RESTful",
      description: "Une API complète avec authentification JWT et documentation Swagger.",
      technologies: ["Node.js", "Express", "MySQL", "Swagger"],
      imageUrl: "/assets/images/project5.jpg",
      projectUrl: "https://example.com/project5",
      githubUrl: "https://github.com/yourusername/project5",
      featured: false
    },
    {
      id: 6,
      title: "Dashboard Analytics",
      description: "Dashboard interactif pour visualiser des données analytiques.",
      technologies: ["React", "D3.js", "Node.js", "Chart.js"],
      imageUrl: "/assets/images/project6.jpg",
      projectUrl: "https://example.com/project6",
      githubUrl: "https://github.com/yourusername/project6",
      featured: false
    }
  ];
  
  // Filtrer les projets
  const filteredProjects = filter === 'all' 
    ? (projects.length > 0 ? projects : mockProjects) 
    : (projects.length > 0 ? projects : mockProjects).filter(project => 
        project.technologies.includes(filter));
  
  // Les catégories de filtres
  const filterCategories = ['all', 'React', 'Three.js', 'Node.js', 'MySQL'];
  
  return (
    <section className="projects section">
      <div className="container">
        <h2 className="section-title">Mes Projets</h2>
        
        <div className="projects-header">
          <div className="project-filters">
            {filterCategories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Chargement des projets...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        <div className="projects-3d">
          <div className="three-container">
            <ProjectsScene />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;