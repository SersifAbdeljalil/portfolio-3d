const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Définition du modèle Project pour MySQL avec Sequelize
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  technologies: {
    type: DataTypes.STRING,
    allowNull: false,
    // Stocke les technologies sous forme de chaîne séparée par des virgules
    // Sera transformé en tableau lors de la récupération
    get() {
      const rawValue = this.getDataValue('technologies');
      return rawValue ? rawValue.split(',') : [];
    },
    set(val) {
      if (Array.isArray(val)) {
        this.setDataValue('technologies', val.join(','));
      } else {
        this.setDataValue('technologies', val);
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  githubUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;