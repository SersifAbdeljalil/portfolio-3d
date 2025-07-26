import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LoadingScreen() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(t('loading.messages')[0]);
  
  const loadingTexts = t('loading.messages', { returnObjects: true });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const increment = Math.random() * 15 + 1;
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 1500);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [loadingTexts]);
  
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">{t('loading.title')}</div>
        
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