 
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Importer les routes
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Importer la configuration de la base de données et les modèles
const { testConnection } = require('./config/database');
const { syncModels } = require('./models');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes API
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement!' });
});

// Démarrer le serveur après avoir vérifié la connexion à la base de données
const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    await testConnection();
    
    // Synchroniser les modèles avec la base de données
    await syncModels();
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();