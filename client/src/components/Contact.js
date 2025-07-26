import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

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
  const { t } = useTranslation();
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
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t('contact.form.validation.nameRequired');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.form.validation.emailInvalid');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('contact.form.validation.messageTooShort');
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
      const response = await fetch('https://portfolio-server-cyan-omega.vercel.app/api/contact', {
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
          message: t('contact.form.success')
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const serverErrors = {};
          data.errors.forEach(err => {
            serverErrors[err.param] = err.msg;
          });
          setFormErrors(serverErrors);
        }
        
        setSubmitResult({
          success: false,
          message: t('contact.form.error')
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitResult({
        success: false,
        message: t('contact.form.connectionError')
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitResult({ success: false, message: '' });
      }, 5000);
    }
  };
  
  return (
    <section className="contact section">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-container">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-details">
                  <h3>{t('contact.info.email')}</h3>
                  <p><a href="mailto:ibtissamjabir7@gmail.com">ibtissamjabir7@gmail.com</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-details">
                  <h3>{t('contact.info.phone')}</h3>
                  <p><a href="tel:+8613052375253">+8613052375253</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-details">
                  <h3>{t('contact.info.location')}</h3>
                  <p>{t('contact.info.location')}</p>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://github.com/ibtissamejabir" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ibtissame-jabir-5486aa336/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
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
                <label htmlFor="name">{t('contact.form.name')}</label>
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
                <label htmlFor="email">{t('contact.form.email')}</label>
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
                <label htmlFor="message">{t('contact.form.message')}</label>
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
                <span>{isSubmitting ? t('contact.form.sending') : t('contact.form.send')}</span>
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
      
      <style jsx>{`
        :global(.rtl) .contact-form {
          text-align: right;
        }
        :global(.rtl) .info-item {
          flex-direction: row-reverse;
        }
        :global(.rtl) .btn-icon {
          flex-direction: row-reverse;
        }
        :global(.rtl) .form-group label {
          text-align: right;
        }
      `}</style>
    </section>
  );
}

export default Contact;