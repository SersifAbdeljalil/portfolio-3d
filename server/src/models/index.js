const { sequelize } = require('../config/database');
const Project = require('./project');

// Synchroniser tous les modèles avec la base de données
const syncModels = async () => {
  try {
    // En mode développement, vous pouvez utiliser { force: true } pour recréer les tables
    // En production, utilisez { alter: true } ou sans options pour éviter la perte de données
    await sequelize.sync();
    console.log('Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation des modèles:', error);
  }
};

module.exports = {
  sequelize,
  Project,
  syncModels
};