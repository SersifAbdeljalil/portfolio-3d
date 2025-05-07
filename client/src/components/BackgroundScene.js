import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle component for the background
function Particle({ position, size, color, speed }) {
  const ref = useRef();
  const initialPosition = useMemo(() => [...position], [position]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Custom floating movement
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

// Central sphere component
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

// Connection line component
function ConnectionLine({ start, end, color }) {
  const ref = useRef();
  
  // Create points for the curve
  const curve = useMemo(() => {
    // Control point to slightly curve the line
    const midPoint = new THREE.Vector3().addVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ).multiplyScalar(0.5);
    
    // Add some elevation to the control point
    midPoint.y += 0.5;
    
    // Create the curve
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      midPoint,
      new THREE.Vector3(...end)
    );
  }, [start, end]);
  
  // Generate points along the curve
  const points = useMemo(() => {
    return curve.getPoints(20);
  }, [curve]);
  
  useFrame(({ clock }) => {
    // Subtle animation of the line
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

// Animated fog effect component
function AnimatedFog() {
  useFrame(({ scene, clock }) => {
    const time = clock.getElapsedTime();
    if (scene.fog) {
      // Slightly animate fog density
      scene.fog.density = 0.015 + Math.sin(time * 0.2) * 0.005;
    }
  });
  
  return null;
}

// Main background component
function BackgroundScene({ isLoading = false, onLoaded = () => {} }) {
  // Detect current theme
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Function to check theme
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    // Check on load
    checkTheme();
    
    // Observe attribute changes on HTML element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // When component is ready
  useEffect(() => {
    // Simulate loading time (remove in production and use actual loader events)
    const timer = setTimeout(() => {
      setIsReady(true);
      onLoaded();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onLoaded]);

  // Adapt colors based on theme
  const bgColor = isDarkMode ? '#050816' : '#e6e9f0';
  
  // Generate random positions for particles
  const particlesData = useMemo(() => {
    const data = [];
    // Reduce particle count to improve performance
    const particleCount = window.innerWidth <= 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      const size = Math.random() * 0.2 + 0.05;
      const speed = Math.random() * 0.5 + 0.5;
      
      // Generate a color in a harmonious palette
      const baseHue = isDarkMode ? 0.6 : 0.7; // Blue-violet vs blue
      const hue = Math.random() * 0.1 + baseHue;
      const saturation = Math.random() * 0.3 + 0.7;
      const lightness = Math.random() * 0.3 + 0.5;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      
      data.push({ position: [x, y, z], size, speed, color: color.getHex() });
    }
    return data;
  }, [isDarkMode]);
  
  // Generate connections between some particles
  const connections = useMemo(() => {
    const lines = [];
    
    // Reduce connections for better performance
    const connectionCount = window.innerWidth <= 768 ? 8 : 15;
    
    // Connect some particles together
    for (let i = 0; i < connectionCount; i++) {
      const startIndex = Math.floor(Math.random() * particlesData.length);
      let endIndex;
      
      do {
        endIndex = Math.floor(Math.random() * particlesData.length);
      } while (endIndex === startIndex);
      
      const baseHue = isDarkMode ? 0.6 : 0.7; // Blue-violet vs blue
      lines.push({
        start: particlesData[startIndex].position,
        end: particlesData[endIndex].position,
        color: new THREE.Color().setHSL(Math.random() * 0.1 + baseHue, 0.8, 0.6).getHex()
      });
    }
    
    return lines;
  }, [particlesData, isDarkMode]);
  
  return (
    <div className={`background-scene ${isReady ? 'loaded' : 'loading'}`} aria-hidden="true">
      {/* Loading indicator that fades out when ready */}
      {isLoading && !isReady && (
        <div className="background-loading">
          <div className="loader"></div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          // Lower pixel ratio on mobile for better performance
          pixelRatio: window.innerWidth <= 768 ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio
        }}
        style={{ opacity: isReady ? 1 : 0 }}
      >
        {/* Background color adjusted based on theme */}
        <color attach="background" args={[bgColor]} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={[bgColor, 8, 25]} />
        <AnimatedFog />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6c63ff" />
        
        {/* Limited camera controls */}
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
        
        {/* Stars background (dark mode only) */}
        {isDarkMode && (
          <Stars
            radius={100}
            depth={50}
            count={window.innerWidth <= 768 ? 1000 : 2000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />
        )}
        
        {/* Central sphere */}
        <CentralSphere />
        
        {/* Particles */}
        {particlesData.map((particle, index) => (
          <Particle
            key={index}
            position={particle.position}
            size={particle.size}
            color={particle.color}
            speed={particle.speed}
          />
        ))}
        
        {/* Connections between particles */}
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