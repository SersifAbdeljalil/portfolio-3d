import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeScene.css';

// Composant pour une sphère animée
function AnimatedSphere({ position, color, size }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.8}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Composant pour un cube animé
function AnimatedCube({ position, color, size }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.6}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Composant pour du texte 3D
function ThreeText({ text, position, color }) {
  return (
    <Text
      position={position}
      fontSize={0.5}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/assets/fonts/Inter-Bold.woff"
    >
      {text}
    </Text>
  );
}

// Composant principal de scène Three.js
function ThreeScene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        
        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6c63ff" />
        
        {/* Environnement */}
        <Environment preset="city" />
        
        {/* Objets 3D */}
        <AnimatedSphere position={[-2, 0, 0]} color="#6c63ff" size={0.8} />
        <AnimatedCube position={[2, 0, 0]} color="#ff6584" size={1} />
        <ThreeText text="Portfolio 3D" position={[0, 1.5, 0]} color="#ffffff" />
        
        {/* Fond */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default ThreeScene;