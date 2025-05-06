import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hook personnalisé pour les fonctionnalités Three.js communes
 * @param {Object} options - Options de configuration
 * @param {boolean} options.autoRotate - Activer la rotation automatique
 * @param {number} options.rotationSpeed - Vitesse de rotation
 * @param {Array} options.cameraPosition - Position initiale de la caméra [x, y, z]
 * @param {Array} options.lightPosition - Position de la lumière principale [x, y, z]
 * @returns {Object} - Références et méthodes utiles pour Three.js
 */
const useThree = (options = {}) => {
  const {
    autoRotate = false,
    rotationSpeed = 0.01,
    cameraPosition = [0, 0, 5],
    lightPosition = [10, 10, 10]
  } = options;
  
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const containerRef = useRef(null);
  const frameIdRef = useRef(null);
  const objectsRef = useRef([]);
  
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialiser la scène Three.js
  const initScene = (container) => {
    if (!container) return;
    
    // Créer une scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Créer une caméra
    const camera = new THREE.PerspectiveCamera(
      75, // FOV
      container.clientWidth / container.clientHeight, // Ratio
      0.1, // Near
      1000 // Far
    );
    camera.position.set(...cameraPosition);
    cameraRef.current = camera;
    
    // Créer un renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Ajouter des lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(...lightPosition);
    scene.add(pointLight);
    
    setIsInitialized(true);
    
    // Démarrer l'animation
    animate();
    
    // Nettoyer
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  };
  
  // Fonction d'animation
  const animate = () => {
    frameIdRef.current = requestAnimationFrame(animate);
    
    if (autoRotate && objectsRef.current.length > 0) {
      objectsRef.current.forEach(obj => {
        obj.rotation.x += rotationSpeed / 2;
        obj.rotation.y += rotationSpeed;
      });
    }
    
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };
  
  // Gérer le redimensionnement de la fenêtre
  const handleResize = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const container = containerRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  // Ajouter un objet à la scène
  const addObject = (object) => {
    if (!sceneRef.current) return;
    
    sceneRef.current.add(object);
    objectsRef.current.push(object);
    
    return object;
  };
  
  // Supprimer un objet de la scène
  const removeObject = (object) => {
    if (!sceneRef.current) return;
    
    sceneRef.current.remove(object);
    objectsRef.current = objectsRef.current.filter(obj => obj !== object);
  };
  
  // Effets pour gérer les événements du cycle de vie
  useEffect(() => {
    if (containerRef.current) {
      const cleanup = initScene(containerRef.current);
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        if (cleanup) cleanup();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  return {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    isInitialized,
    addObject,
    removeObject
  };
};

export default useThree;