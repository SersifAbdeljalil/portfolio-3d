const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Envoyer un email depuis le formulaire de contact
exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;
  
  // Vérifier que tous les champs requis sont présents
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tous les champs sont requis (nom, email, message)' 
    });
  }
  
  try {
    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Envoi à vous-même
      subject: `Message du portfolio de ${name}`,
      html: `
        <h3>Nouveau message du formulaire de contact</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    };
    
    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi de votre message', 
      error: error.message 
    });
  }
};