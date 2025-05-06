import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Chargement de l\'expérience 3D...');
  
  // Textes de chargement aléatoires pour rendre l'attente plus intéressante
  const loadingTexts = [
    "Chargement de l'expérience 3D...",
    "Préparation des modèles 3D...",
    "Initialisation des shaders...",
    "Configuration des matériaux...",
    "Chargement des textures...",
    "Calibration des lumières...",
    "Presque prêt..."
  ];
  
  useEffect(() => {
    // Simuler une progression de chargement
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Générer un incrément aléatoire entre 1 et 15
        const increment = Math.random() * 15 + 1;
        const newProgress = prevProgress + increment;
        
        // Limiter la progression à 100%
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Changer le texte de chargement toutes les 1,5 secondes
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 1500);
    
    // Nettoyer les intervalles lorsque le composant est démonté
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);
  
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <h1 className="loading-logo">VN</h1>
        </div>
        
        <div className="loading-sphere">
          <div className="sphere"></div>
          <div className="sphere-shadow"></div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
        
        <div className="loading-message">
          {loadingText}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;