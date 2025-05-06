
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route POST pour envoyer un email depuis le formulaire de contact
router.post('/', contactController.sendContactEmail);

module.exports = router;