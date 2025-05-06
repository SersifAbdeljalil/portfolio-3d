 
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/upload');

// Route GET pour récupérer tous les projets
router.get('/', projectController.getAllProjects);

// Route GET pour récupérer un projet par son ID
router.get('/:id', projectController.getProjectById);

// Route POST pour créer un nouveau projet (avec upload d'image)
router.post('/', upload.single('image'), projectController.createProject);

// Route PUT pour mettre à jour un projet existant
router.put('/:id', upload.single('image'), projectController.updateProject);

// Route DELETE pour supprimer un projet
router.delete('/:id', projectController.deleteProject);

module.exports = router;