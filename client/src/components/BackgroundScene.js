import React, { useEffect, useState } from 'react';

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
        opacity: 0.7,
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
        height: '1px',
        background: `linear-gradient(90deg, ${color}, transparent)`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        animation: 'pulse 4s ease-in-out infinite',
        opacity: isDark ? 0.4 : 0.25,
      }}
    />
  );
}

// Gradient orb component
function GradientOrb({ x, y, size, color1, color2, isDark }) {
  return (
    <div
      className="absolute rounded-full blur-xl"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        animation: 'slowFloat 8s ease-in-out infinite',
        opacity: isDark ? 0.2 : 0.1,
      }}
    />
  );
}

// Main background component
function ProfessionalBackground({ isLoading = false, onLoaded = () => {} }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Function to check theme
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                     document.documentElement.classList.contains('dark') ||
                     (!document.documentElement.getAttribute('data-theme') && 
                      !document.documentElement.classList.contains('light') &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
    };

    // Check on load
    checkTheme();

    // Listen for theme changes
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
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsReady(true);
      onLoaded();
    }, 500);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  // Generate particles data
  const particlesData = React.useMemo(() => {
    const particles = [];
    const particleCount = typeof window !== 'undefined' && window.innerWidth <= 768 ? 12 : 20;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 8 + 4;
      const delay = Math.random() * 2;
      
      // Generate harmonious colors based on theme
      const baseHue = 250; // Blue-violet
      const hue = baseHue + (Math.random() * 40 - 20);
      
      let saturation, lightness;
      if (isDarkMode) {
        saturation = Math.random() * 30 + 70;
        lightness = Math.random() * 30 + 50;
      } else {
        saturation = Math.random() * 40 + 60;
        lightness = Math.random() * 20 + 40;
      }
      
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      particles.push({ x, y, size, delay, color });
    }
    return particles;
  }, [isDarkMode]);

  // Generate connections
  const connections = React.useMemo(() => {
    const lines = [];
    const connectionCount = Math.min(8, particlesData.length - 1);

    for (let i = 0; i < connectionCount; i++) {
      const start = particlesData[i];
      const end = particlesData[i + 1] || particlesData[0];
      
      const baseHue = 250;
      const color = isDarkMode 
        ? `hsl(${baseHue}, 80%, 60%)` 
        : `hsl(${baseHue}, 70%, 50%)`;
      
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

  // Generate gradient orbs
  const orbs = React.useMemo(() => {
    const orbsData = [];
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      const size = Math.random() * 200 + 150;
      
      let color1, color2;
      if (isDarkMode) {
        color1 = 'rgba(108, 99, 255, 0.3)';
        color2 = 'rgba(147, 51, 234, 0.2)';
      } else {
        color1 = 'rgba(108, 99, 255, 0.15)';
        color2 = 'rgba(147, 51, 234, 0.1)';
      }
      
      orbsData.push({ x, y, size, color1, color2 });
    }
    return orbsData;
  }, [isDarkMode]);

  // Theme-based colors
  const bgColor = isDarkMode ? '#050816' : '#f8fafc';
  const overlayColor = isDarkMode 
    ? 'linear-gradient(135deg, rgba(5, 8, 22, 0.9), rgba(17, 24, 39, 0.8))'
    : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(241, 245, 249, 0.8))';

  const loaderColor = isDarkMode ? '#6c63ff' : '#5b52d8';
  const loaderBorderColor = isDarkMode 
    ? 'rgba(108, 99, 255, 0.3)' 
    : 'rgba(108, 99, 255, 0.2)';

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes slowFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: ${isDarkMode ? 0.4 : 0.25}; }
          50% { opacity: ${isDarkMode ? 0.8 : 0.5}; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .background-scene {
          transition: opacity 0.8s ease-in-out;
        }
        
        .background-scene.loading {
          opacity: 0;
        }
        
        .background-scene.loaded {
          opacity: 1;
        }
        
        .background-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid ${loaderBorderColor};
          border-top: 3px solid ${loaderColor};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>

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
            opacity: 0.7
          }}
        />

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
            width: '300px',
            height: '300px',
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(108, 99, 255, 0.1), transparent 70%)'
              : 'radial-gradient(circle, rgba(108, 99, 255, 0.05), transparent 70%)',
            borderRadius: '50%',
            animation: 'slowFloat 10s ease-in-out infinite',
          }}
        />

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: isDarkMode
              ? 'radial-gradient(circle at 1px 1px, rgba(108, 99, 255, 0.3) 1px, transparent 0)'
              : 'radial-gradient(circle at 1px 1px, rgba(108, 99, 255, 0.2) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </>
  );
}

export default ProfessionalBackground;