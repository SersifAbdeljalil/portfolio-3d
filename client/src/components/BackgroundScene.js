import React, { useEffect, useState, useMemo, useCallback } from 'react';

// Particle component for animated background elements
function Particle({ x, y, size, delay, color }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: `float ${3 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.8,
      }}
    />
  );
}

// Connection line component
function ConnectionLine({ x1, y1, x2, y2, color, isDark }) {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  return (
    <div
      className="absolute"
      style={{
        left: `${x1}%`,
        top: `${y1}%`,
        width: `${length}%`,
        height: '2px',
        background: `linear-gradient(90deg, ${color}, transparent)`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        animation: 'pulse 4s ease-in-out infinite',
        opacity: isDark ? 0.6 : 0.4,
      }}
    />
  );
}

// Gradient orb component
function GradientOrb({ x, y, size, color1, color2, isDark, delay = 0 }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        filter: 'blur(40px)',
        animation: `slowFloat ${8 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: isDark ? 0.3 : 0.2,
      }}
    />
  );
}

// Nouveau composant pour les étoiles scintillantes
function TwinkleStars({ isDark }) {
  const stars = useMemo(() => {
    const starsData = [];
    const starCount = isDark ? 30 : 15;
    
    for (let i = 0; i < starCount; i++) {
      starsData.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2
      });
    }
    return starsData;
  }, [isDark]);

  if (!isDark) return null;

  return (
    <>
      {stars.map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// Composant pour les nuages en mode jour
function FloatingClouds({ isDark }) {
  const clouds = useMemo(() => {
    if (isDark) return [];
    
    return [
      { x: 10, y: 20, size: 80, delay: 0 },
      { x: 60, y: 15, size: 60, delay: 2 },
      { x: 80, y: 70, size: 100, delay: 4 },
      { x: 30, y: 80, size: 70, delay: 1 }
    ];
  }, [isDark]);

  if (isDark) return null;

  return (
    <>
      {clouds.map((cloud, index) => (
        <div
          key={`cloud-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size / 2}px`,
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(20px)',
            animation: `drift ${15 + cloud.delay}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// Main background component - VERSION AMÉLIORÉE
function ProfessionalBackground({ isLoading = false, onLoaded = () => {} }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Détection du thème
  const checkTheme = useCallback(() => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                   document.documentElement.classList.contains('dark') ||
                   (!document.documentElement.getAttribute('data-theme') && 
                    !document.documentElement.classList.contains('light') &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (isInitialized) return;

    checkTheme();
    setIsInitialized(true);

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme', 'class'] 
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, [checkTheme, isInitialized]);

  useEffect(() => {
    if (isReady) return;

    const timer = setTimeout(() => {
      setIsReady(true);
      onLoaded();
    }, 500);

    return () => clearTimeout(timer);
  }, [onLoaded, isReady]);

  // Particules améliorées
  const particlesData = useMemo(() => {
    if (!isInitialized) return [];

    const particles = [];
    const particleCount = typeof window !== 'undefined' && window.innerWidth <= 768 ? 15 : 25;

    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < particleCount; i++) {
      const x = seededRandom() * 100;
      const y = seededRandom() * 100;
      const size = seededRandom() * 6 + 3;
      const delay = seededRandom() * 3;
      
      let color;
      if (isDarkMode) {
        // Couleurs plus vives pour le mode sombre
        const hue = 200 + (seededRandom() * 80); // Bleu à violet
        const saturation = 70 + seededRandom() * 30;
        const lightness = 60 + seededRandom() * 30;
        color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      } else {
        // Couleurs plus douces pour le mode jour
        const hue = 220 + (seededRandom() * 60); // Bleu doux
        const saturation = 50 + seededRandom() * 30;
        const lightness = 50 + seededRandom() * 20;
        color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }
      
      particles.push({ x, y, size, delay, color });
    }
    return particles;
  }, [isDarkMode, isInitialized]);

  // Connexions améliorées
  const connections = useMemo(() => {
    if (particlesData.length === 0) return [];

    const lines = [];
    const connectionCount = Math.min(10, particlesData.length - 1);

    for (let i = 0; i < connectionCount; i++) {
      const start = particlesData[i];
      const end = particlesData[(i + 3) % particlesData.length];
      
      const color = isDarkMode 
        ? `rgba(100, 200, 255, 0.6)` 
        : `rgba(70, 130, 200, 0.4)`;
      
      lines.push({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        color
      });
    }
    return lines;
  }, [particlesData, isDarkMode]);

  // Orbes améliorées avec plus de variété
  const orbs = useMemo(() => {
    if (!isInitialized) return [];

    const orbsData = [];
    const positions = [
      { x: 15, y: 25, size: 250, delay: 0 },
      { x: 75, y: 70, size: 200, delay: 2 },
      { x: 45, y: 85, size: 280, delay: 4 },
      { x: 80, y: 20, size: 180, delay: 1 }
    ];

    positions.forEach((pos, i) => {
      let color1, color2;
      if (isDarkMode) {
        const colors = [
          ['rgba(138, 43, 226, 0.4)', 'rgba(75, 0, 130, 0.2)'],
          ['rgba(0, 191, 255, 0.4)', 'rgba(30, 144, 255, 0.2)'],
          ['rgba(255, 20, 147, 0.4)', 'rgba(199, 21, 133, 0.2)'],
          ['rgba(50, 205, 50, 0.4)', 'rgba(34, 139, 34, 0.2)']
        ];
        [color1, color2] = colors[i % colors.length];
      } else {
        const colors = [
          ['rgba(135, 206, 250, 0.3)', 'rgba(176, 196, 222, 0.1)'],
          ['rgba(255, 182, 193, 0.3)', 'rgba(255, 160, 122, 0.1)'],
          ['rgba(144, 238, 144, 0.3)', 'rgba(152, 251, 152, 0.1)'],
          ['rgba(221, 160, 221, 0.3)', 'rgba(218, 112, 214, 0.1)']
        ];
        [color1, color2] = colors[i % colors.length];
      }
      
      orbsData.push({ ...pos, color1, color2 });
    });
    
    return orbsData;
  }, [isDarkMode, isInitialized]);

  // Couleurs de fond améliorées
  const bgColor = isDarkMode 
    ? 'linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 50%, #16213e 100%)'
    : 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #ddeeff 100%)';
    
  const overlayColor = isDarkMode 
    ? 'linear-gradient(135deg, rgba(12, 12, 30, 0.8), rgba(26, 26, 46, 0.6), rgba(22, 33, 62, 0.7))'
    : 'linear-gradient(135deg, rgba(240, 248, 255, 0.9), rgba(230, 243, 255, 0.7), rgba(221, 238, 255, 0.8))';

  const loaderColor = isDarkMode ? '#00bfff' : '#4169e1';
  const loaderBorderColor = isDarkMode 
    ? 'rgba(0, 191, 255, 0.3)' 
    : 'rgba(65, 105, 225, 0.3)';

  // Styles CSS améliorés
  const styles = useMemo(() => `
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
      33% { transform: translateY(-25px) scale(1.1) rotate(5deg); }
      66% { transform: translateY(-10px) scale(0.95) rotate(-3deg); }
    }
    
    @keyframes slowFloat {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      25% { transform: translate(40px, -30px) scale(1.1) rotate(2deg); }
      50% { transform: translate(-20px, -40px) scale(0.9) rotate(-2deg); }
      75% { transform: translate(-30px, 20px) scale(1.05) rotate(1deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: ${isDarkMode ? 0.6 : 0.4}; transform: scale(1); }
      50% { opacity: ${isDarkMode ? 1 : 0.7}; transform: scale(1.02); }
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes drift {
      0% { transform: translateX(-20px); }
      100% { transform: translateX(calc(100vw + 20px)); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes breathe {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    .background-scene {
      transition: all 1s ease-in-out;
    }
    
    .background-scene.loading {
      opacity: 0;
      filter: blur(10px);
    }
    
    .background-scene.loaded {
      opacity: 1;
      filter: blur(0px);
    }
    
    .background-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    
    .loader {
      width: 50px;
      height: 50px;
      border: 4px solid ${loaderBorderColor};
      border-top: 4px solid ${loaderColor};
      border-radius: 50%;
      animation: spin 1s linear infinite;
      box-shadow: 0 0 20px ${loaderColor}40;
    }
  `, [isDarkMode, loaderBorderColor, loaderColor]);

  return (
    <>
      <style jsx>{styles}</style>

      <div 
        className={`fixed inset-0 background-scene ${isReady ? 'loaded' : 'loading'}`}
        style={{ 
          background: bgColor,
          zIndex: -1
        }}
        aria-hidden="true"
      >
        {/* Loading indicator */}
        {isLoading && !isReady && (
          <div className="background-loading">
            <div className="loader"></div>
          </div>
        )}

        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: overlayColor,
            opacity: 0.8
          }}
        />

        {/* Étoiles scintillantes (mode sombre) */}
        <TwinkleStars isDark={isDarkMode} />

        {/* Nuages flottants (mode jour) */}
        <FloatingClouds isDark={isDarkMode} />

        {/* Large gradient orbs */}
        {orbs.map((orb, index) => (
          <GradientOrb
            key={`orb-${index}`}
            x={orb.x}
            y={orb.y}
            size={orb.size}
            color1={orb.color1}
            color2={orb.color2}
            isDark={isDarkMode}
            delay={orb.delay}
          />
        ))}

        {/* Connection lines */}
        {connections.map((connection, index) => (
          <ConnectionLine
            key={`line-${index}`}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            color={connection.color}
            isDark={isDarkMode}
          />
        ))}

        {/* Animated particles */}
        {particlesData.map((particle, index) => (
          <Particle
            key={`particle-${index}`}
            x={particle.x}
            y={particle.y}
            size={particle.size}
            delay={particle.delay}
            color={particle.color}
          />
        ))}

        {/* Central decorative element */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '350px',
            height: '350px',
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(0, 191, 255, 0.15), rgba(138, 43, 226, 0.1), transparent 70%)'
              : 'radial-gradient(circle, rgba(135, 206, 250, 0.1), rgba(255, 182, 193, 0.05), transparent 70%)',
            borderRadius: '50%',
            animation: 'breathe 12s ease-in-out infinite',
          }}
        />

        {/* Grille de points subtile */}
        <div 
          className="absolute inset-0"
          style={{
            opacity: isDarkMode ? 0.15 : 0.08,
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 2px 2px, rgba(0, 191, 255, 0.4) 1px, transparent 0)'
              : 'radial-gradient(circle at 2px 2px, rgba(65, 105, 225, 0.3) 1px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Effet de lueur périphérique */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(ellipse at center, transparent 40%, rgba(12, 12, 30, 0.8) 100%)'
              : 'radial-gradient(ellipse at center, transparent 40%, rgba(240, 248, 255, 0.6) 100%)',
          }}
        />
      </div>
    </>
  );
}

export default ProfessionalBackground;