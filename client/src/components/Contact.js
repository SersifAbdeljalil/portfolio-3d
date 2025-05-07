import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Facebook } from 'lucide-react';

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
  
  // Validation côté client
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
  
  // Soumission du formulaire avec envoi à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Envoyer les données au backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: data.message || 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
        });
        
        // Réinitialiser le formulaire après succès
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Gérer les erreurs de validation du serveur
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.param] = err.msg;
          });
          setFormErrors(serverErrors);
        }
        
        setSubmitResult({
          success: false,
          message: data.message || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      setSubmitResult({
        success: false,
        message: 'Une erreur est survenue lors de la connexion au serveur. Veuillez vérifier votre connexion internet et réessayer.'
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
                  <Mail size={24} />
                </div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p><a href="mailto:abdosarsif28@gmail.com">abdosarsif28@gmail.com</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-details">
                  <h3>Téléphone</h3>
                  <p><a href="tel:+212 695489581">+212 695489561</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-details">
                  <h3>Localisation</h3>
                  <p>Eljadida , Maroc</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://github.com/SersifAbdeljalil" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/aabdeljalil-sersif-803624339/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://web.facebook.com/profile.php?id=100023069885044&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" aria-label="facebook">
                  <Facebook size={20} />
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
                className="btn btn-primary submit-btn btn-icon"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                <Send size={20} />
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