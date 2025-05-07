import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Composant particule pour l'arrière-plan
function Particle({ position, size, color, speed }) {
  const ref = useRef();
  const initialPosition = useMemo(() => [...position], [position]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Mouvement de flottement personnalisé
    ref.current.position.y = initialPosition[1] + Math.sin(time * speed) * 0.2;
    ref.current.position.x = initialPosition[0] + Math.cos(time * speed * 0.5) * 0.1;
    ref.current.rotation.z = time * 0.1;
    ref.current.rotation.y = time * 0.1;
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Composant sphère centrale
function CentralSphere() {
  const sphereRef = useRef();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sphereRef.current.rotation.y = time * 0.1;
    sphereRef.current.rotation.z = time * 0.05;
  });
  
  return (
    <Sphere args={[1.5, 64, 64]} ref={sphereRef}>
      <MeshDistortMaterial
        color="#6c63ff"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
}

// Composant ligne connectant des points
function ConnectionLine({ start, end, color }) {
  const ref = useRef();
  
  // Créer des points pour la courbe
  const curve = useMemo(() => {
    // Point de contrôle pour courber légèrement la ligne
    const midPoint = new THREE.Vector3().addVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ).multiplyScalar(0.5);
    
    // Ajouter un peu d'élévation au point de contrôle
    midPoint.y += 0.5;
    
    // Créer la courbe
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      midPoint,
      new THREE.Vector3(...end)
    );
  }, [start, end]);
  
  // Générer les points le long de la courbe
  const points = useMemo(() => {
    return curve.getPoints(20);
  }, [curve]);
  
  useFrame(({ clock }) => {
    // Animation subtile de la ligne
    const time = clock.getElapsedTime();
    
    if (ref.current && ref.current.material) {
      ref.current.material.opacity = Math.sin(time) * 0.2 + 0.6;
      ref.current.material.dashOffset = time * 0.1;
    }
  });
  
  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineDashedMaterial
        color={color}
        linewidth={1}
        dashSize={0.2}
        gapSize={0.1}
        transparent
        opacity={0.8}
      />
    </line>
  );
}

// Composant d'effet de brouillard animé
function AnimatedFog() {
  useFrame(({ scene, clock }) => {
    const time = clock.getElapsedTime();
    if (scene.fog) {
      // Animer légèrement la densité du brouillard
      scene.fog.density = 0.015 + Math.sin(time * 0.2) * 0.005;
    }
  });
  
  return null;
}

// Composant principal de l'arrière-plan
function BackgroundScene() {
  // Détecter le thème actuel
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Fonction pour vérifier le thème
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    // Vérifier au chargement
    checkTheme();
    
    // Observer les changements d'attribut sur l'élément HTML
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Adapter les couleurs en fonction du thème
  const bgColor = isDarkMode ? '#050816' : '#e6e9f0';
  
  // Générer des positions aléatoires pour les particules
  const particlesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      const size = Math.random() * 0.2 + 0.05;
      const speed = Math.random() * 0.5 + 0.5;
      
      // Générer une couleur dans une palette harmonieuse
      const baseHue = isDarkMode ? 0.6 : 0.7; // Bleu-violet vs bleu
      const hue = Math.random() * 0.1 + baseHue;
      const saturation = Math.random() * 0.3 + 0.7;
      const lightness = Math.random() * 0.3 + 0.5;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      
      data.push({ position: [x, y, z], size, speed, color: color.getHex() });
    }
    return data;
  }, [isDarkMode]);
  
  // Générer des connexions entre certaines particules
  const connections = useMemo(() => {
    const lines = [];
    
    // Connecter quelques particules entre elles
    for (let i = 0; i < 15; i++) {
      const startIndex = Math.floor(Math.random() * particlesData.length);
      let endIndex;
      
      do {
        endIndex = Math.floor(Math.random() * particlesData.length);
      } while (endIndex === startIndex);
      
      const baseHue = isDarkMode ? 0.6 : 0.7; // Bleu-violet vs bleu
      lines.push({
        start: particlesData[startIndex].position,
        end: particlesData[endIndex].position,
        color: new THREE.Color().setHSL(Math.random() * 0.1 + baseHue, 0.8, 0.6).getHex()
      });
    }
    
    return lines;
  }, [particlesData, isDarkMode]);
  
  useEffect(() => {
    // Effet pour décharger proprement les ressources 3D
    return () => {
      // Nettoyer Three.js (si nécessaire)
    };
  }, []);
  
  return (
    <div className="background-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Couleur de fond ajustée selon le thème */}
        <color attach="background" args={[bgColor]} />
        
        {/* Brouillard pour donner de la profondeur */}
        <fog attach="fog" args={[bgColor, 8, 25]} />
        <AnimatedFog />
        
        {/* Éclairage */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6c63ff" />
        
        {/* Contrôles de caméra limités */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2 / 3}
          enableDamping
          dampingFactor={0.05}
        />
        
        {/* Fond d'étoiles (uniquement en mode sombre) */}
        {isDarkMode && (
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />
        )}
        
        {/* Sphère centrale */}
        <CentralSphere />
        
        {/* Particules */}
        {particlesData.map((particle, index) => (
          <Particle
            key={index}
            position={particle.position}
            size={particle.size}
            color={particle.color}
            speed={particle.speed}
          />
        ))}
        
        {/* Connexions entre particules */}
        {connections.map((connection, index) => (
          <ConnectionLine
            key={index}
            start={connection.start}
            end={connection.end}
            color={connection.color}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default BackgroundScene;