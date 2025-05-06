import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/variable.css';
import './styles/global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);