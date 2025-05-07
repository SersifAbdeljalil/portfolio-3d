import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Composant 3D pour la section Contact
function ContactSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={1.5}>
      <MeshDistortMaterial
        color="#6c63ff"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur lorsque l'utilisateur commence à modifier le champ
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simuler une requête API réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitResult({
        success: true,
        message: 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
      });
      
      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      setSubmitResult({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Effacer le message de résultat après 5 secondes
      setTimeout(() => {
        setSubmitResult({ success: false, message: '' });
      }, 5000);
    }
  };
  
  return (
    <section className="contact section">
      <div className="container">
        <h2 className="section-title">Me Contacter</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-container">
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p><a href="mailto:votre.email@example.com">votre.email@example.com</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="info-details">
                  <h3>Téléphone</h3>
                  <p><a href="tel:+33600000000">+33 6 00 00 00 00</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-details">
                  <h3>Localisation</h3>
                  <p>Votre ville, Pays</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
            
            <div className="contact-3d">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate />
                <ContactSphere />
              </Canvas>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? 'error' : ''}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
              
              {submitResult.message && (
                <div className={`submit-result ${submitResult.success ? 'success' : 'error'}`}>
                  {submitResult.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;