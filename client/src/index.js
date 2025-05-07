import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importer les styles
import './styles/theme-variables.css';
import './styles/main.css';
import './styles/dark-mode.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);