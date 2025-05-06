const { Project } = require('../models');

// Récupérer tous les projets
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des projets', 
      error: error.message 
    });
  }
};

// Récupérer un projet par son ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet avec l'ID ${id}:`, error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du projet', 
      error: error.message 
    });
  }
};

// Créer un nouveau projet
exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, projectUrl, githubUrl, featured } = req.body;
    
    // Vérifier que les champs requis sont présents
    if (!title || !description) {
      return res.status(400).json({ message: 'Le titre et la description sont requis' });
    }
    
    // Créer un nouveau projet
    const newProject = await Project.create({
      title,
      description,
      technologies: technologies || '',
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      featured: featured === 'true' || false
    });
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du projet', 
      error: error.message 
    });
  }
};

// Mettre à jour un projet existant
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    const { title, description, technologies, projectUrl, githubUrl, featured } = req.body;
    
    // Mettre à jour les champs
    const updatedData = {
      title: title || project.title,
      description: description || project.description,
      technologies: technologies || project.technologies,
      projectUrl: projectUrl || project.projectUrl,
      githubUrl: githubUrl || project.githubUrl,
      featured: featured === 'true' || project.featured
    };
    
    // Mettre à jour l'image uniquement si une nouvelle est fournie
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Mettre à jour le projet
    await project.update(updatedData);
    
    res.status(200).json(project);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du projet avec l'ID ${id}:`, error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du projet', 
      error: error.message 
    });
  }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  
  try {
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    await project.destroy();
    
    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error(`Erreur lors de la suppression du projet avec l'ID ${id}:`, error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du projet', 
      error: error.message 
    });
  }
};