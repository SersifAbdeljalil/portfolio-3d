import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import './About.css';

// Composant 3D pour la section À propos
function AboutModel() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#6c63ff" metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function About() {
  return (
    <section className="about section">
      <div className="container">
        <h2 className="section-title">À Propos de Moi</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Bonjour ! Je suis un développeur Full Stack passionné par la création d'expériences web interactives et immersives. Avec une expertise en React.js, Three.js et Node.js, je construis des applications web modernes qui combinent fonctionnalité et design attrayant.
            </p>
            
            <p>
              Mon parcours dans le développement web a commencé il y a plusieurs années, et depuis, j'ai travaillé sur divers projets allant des sites vitrines aux applications complexes. Ma passion pour la 3D et les interfaces utilisateur interactives m'a amené à approfondir mes connaissances en Three.js et WebGL.
            </p>
            
            <div className="about-details">
              <div className="about-detail">
                <h3>Éducation</h3>
                <p>Diplôme en Informatique, Université XYZ (20XX-20XX)</p>
              </div>
              
              <div className="about-detail">
                <h3>Expérience</h3>
                <p>Développeur Full Stack, Entreprise ABC (20XX-Présent)</p>
                <p>Développeur Frontend, Entreprise DEF (20XX-20XX)</p>
              </div>
            </div>
            
            <div className="about-cta">
              <a href="/assets/documents/CV.pdf" className="btn btn-secondary" download>
                Télécharger mon CV
              </a>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="three-container">
              <Canvas>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <OrbitControls enableZoom={false} enablePan={false} />
                <AboutModel />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;