import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';
import '../../styles/animations.css';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

// Composant 3D pour la sphère de fond
function BackgroundSphere() {
  return (
    <Sphere args={[1.5, 64, 64]} position={[0, 0, -2]}>
      <MeshDistortMaterial
        color="#6c63ff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Composant pour le texte 3D
function AnimatedText() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={[0, 0, 0]}
    >
      <Text
        font="/assets/fonts/Poppins-Bold.woff"
        fontSize={0.5}
        position={[0, 0, 0]}
        color="white"
        maxWidth={2}
        textAlign="center"
      >
        Développeur Full Stack & 3D
      </Text>
    </Float>
  );
}

// Particules flottantes pour l'arrière-plan
function ParticleField() {
  const points = [];
  const colors = [];
  const particleCount = 50;
  
  // Générer des points aléatoires pour les particules
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 6;
    const y = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 6;
    points.push(x, y, z);
    
    // Couleurs avec dégradé
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.7);
    colors.push(color.r, color.g, color.b);
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particleCount}
          array={new Float32Array(points)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={particleCount}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function Home() {
  const homeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const skillCardsRef = useRef([]);
  
  // Animations GSAP
  useEffect(() => {
    // Animation d'entrée pour les éléments textuels
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .from(descriptionRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .from(ctaRef.current, {
      y: -10,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");
    
    // Animation au défilement pour les cartes de compétences
    skillCardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        delay: index * 0.2
      });
    });
    
    // Nettoyage des animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Références pour les cartes de compétences
  const setCardRef = (element, index) => {
    skillCardsRef.current[index] = element;
  };
  
  // Texte tournant pour les compétences
  const skills = [
    "React.js",
    "Three.js",
    "Node.js",
    "MySQL",
    "Animation 3D",
    "WebGL",
    "Express",
    "REST API"
  ];
  
  return (
    <section className="home" ref={homeRef}>
      <div className="home-hero">
        <div className="container">
          <div className="home-content">
            <div className="home-text">
              <h1 className="title typewriter" ref={titleRef}>Votre Nom</h1>
              
              <h2 className="subtitle" ref={subtitleRef}>
                <span className="rotating-text">
                  Développeur
                  <span className="skills-carousel">
                    {skills.map((skill, index) => (
                      <span key={index} style={{ animationDelay: `${index * 0.5}s` }}>
                        {skill}
                      </span>
                    ))}
                  </span>
                </span>
              </h2>
              
              <p className="description" ref={descriptionRef}>
                Bienvenue dans mon univers créatif où je donne vie à vos idées avec des 
                expériences web interactives et immersives. Spécialisé en React, Three.js 
                et Node.js, je crée des applications qui allient design et fonctionnalité.
              </p>
              
              <div className="cta-buttons" ref={ctaRef}>
                <Link to="/projects" className="btn btn-primary glow-on-hover">
                  <span>Voir mes projets</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Me contacter</span>
                  <i className="fas fa-envelope"></i>
                </Link>
              </div>
            </div>
            
            <div className="home-visual">
              <div className="three-container">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                  <BackgroundSphere />
                  <AnimatedText />
                  <ParticleField />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="home-highlights">
        <div className="container">
          <div className="highlight-cards">
            <div 
              className="highlight-card" 
              ref={(el) => setCardRef(el, 0)}
            >
              <div className="card-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Front-end</h3>
              <p>Création d'interfaces réactives et intuitives avec React et Three.js</p>
            </div>
            
            <div 
              className="highlight-card" 
              ref={(el) => setCardRef(el, 1)}
            >
              <div className="card-icon">
                <i className="fas fa-server"></i>
              </div>
              <h3>Back-end</h3>
              <p>Développement d'APIs robustes avec Node.js, Express et MySQL</p>
            </div>
            
            <div 
              className="highlight-card" 
              ref={(el) => setCardRef(el, 2)}
            >
              <div className="card-icon">
                <i className="fas fa-cubes"></i>
              </div>
              <h3>3D & Animation</h3>
              <p>Création d'expériences immersives avec Three.js et WebGL</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default Home;