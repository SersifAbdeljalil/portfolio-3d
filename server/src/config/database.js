const { Sequelize } = require('sequelize');

// Utiliser des valeurs en dur pour le moment
const sequelize = new Sequelize(
  'portfolio_db',  // Nom de la base de données
  'root',          // Utilisateur MySQL
  '',              // Mot de passe (vide)
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Tester la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données MySQL établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
};