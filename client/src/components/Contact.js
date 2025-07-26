import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageCircle, Zap, Heart } from 'lucide-react';

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
      errors.name = t('contact.form.validation.nameRequired', 'Le nom est requis');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.form.validation.emailRequired', 'L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.form.validation.emailInvalid', 'Email invalide');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.form.validation.messageRequired', 'Le message est requis');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('contact.form.validation.messageTooShort', 'Message trop court (min 10 caractères)');
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
          message: t('contact.form.success', 'Message envoyé avec succès!')
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
          message: t('contact.form.error', 'Erreur lors de l\'envoi')
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitResult({
        success: false,
        message: t('contact.form.connectionError', 'Erreur de connexion')
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitResult({ success: false, message: '' });
      }, 5000);
    }
  };
  
  return (
    <>
      {/* Enhanced background with particles */}
      <div className="enhanced-background">
        <div className="mouse-follower" style={{left: '30%', top: '60%'}}></div>
        
        {/* Central sphere */}
        <div className="central-sphere" style={{left: '70%', top: '30%'}}>
          <div className="sphere-inner">
            <div className="sphere-core"></div>
            <div className="sphere-ring ring-1"></div>
            <div className="sphere-ring ring-2"></div>
            <div className="sphere-ring ring-3"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="floating-particle" style={{
          top: '15%', 
          left: '10%', 
          width: '10px', 
          height: '10px',
          animationDelay: '0s'
        }}></div>
        <div className="floating-particle" style={{
          top: '80%', 
          right: '15%', 
          width: '14px', 
          height: '14px',
          animationDelay: '3s'
        }}></div>
        <div className="floating-particle" style={{
          top: '45%', 
          left: '85%', 
          width: '8px', 
          height: '8px',
          animationDelay: '6s'
        }}></div>

        {/* Geometric shapes */}
        <div className="geometric-shapes">
          <div className="shape triangle" style={{top: '25%', left: '20%'}}></div>
          <div className="shape hexagon" style={{top: '65%', left: '80%'}}></div>
          <div className="shape circle" style={{top: '70%', left: '10%'}}></div>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <h2 className="section-title fade-in">{t('contact.title', 'Contact')}</h2>
          
          <div className="contact-content fade-in-up delay-1">
            <div className="contact-info">
              <div className="info-container">
                <div className="skill-card info-item delay-2">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon info-icon">
                      <div className="icon-glow"></div>
                      <Mail size={24} />
                    </div>
                    <div className="info-details">
                      <h3 className="card-title">Email</h3>
                      <p className="card-description">
                        <a href="mailto:ibtissamjabir7@gmail.com">ibtissamjabir7@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="skill-card info-item delay-3">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon info-icon">
                      <div className="icon-glow"></div>
                      <Phone size={24} />
                    </div>
                    <div className="info-details">
                      <h3 className="card-title">Téléphone</h3>
                      <p className="card-description">
                        <a href="tel:+8613052375253">+86 130 5237 5253</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="skill-card info-item delay-4">
                  <div className="card-background"></div>
                  <div className="card-content">
                    <div className="card-icon info-icon">
                      <div className="icon-glow"></div>
                      <MapPin size={24} />
                    </div>
                    <div className="info-details">
                      <h3 className="card-title">Localisation</h3>
                      <p className="card-description">{t('contact.info.locationDetails', 'Shanghai, China')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links delay-5">
                  <a href="https://github.com/ibtissamejabir" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                    <div className="social-glow"></div>
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/ibtissame-jabir-5486aa336/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                    <div className="social-glow"></div>
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              
              <div className="contact-animation delay-6">
                <div className="animation-container">
                  {/* Animation centrale avec morphing */}
                  <div className="morph-container">
                    <div className="morph-shape shape-1"></div>
                    <div className="morph-shape shape-2"></div>
                    <div className="morph-shape shape-3"></div>
                  </div>
                  
                  {/* Orbites avec icônes flottantes */}
                  <div className="orbit orbit-1">
                    <div className="orbit-icon">
                      <MessageCircle size={20} />
                    </div>
                  </div>
                  
                  <div className="orbit orbit-2">
                    <div className="orbit-icon">
                      <Zap size={18} />
                    </div>
                  </div>
                  
                  <div className="orbit orbit-3">
                    <div className="orbit-icon">
                      <Heart size={16} />
                    </div>
                  </div>
                  
                  {/* Vagues d'énergie */}
                  <div className="energy-wave wave-1"></div>
                  <div className="energy-wave wave-2"></div>
                  <div className="energy-wave wave-3"></div>
                  
                  {/* Particules flottantes */}
                  <div className="contact-particles">
                    <div className="particle p-1"></div>
                    <div className="particle p-2"></div>
                    <div className="particle p-3"></div>
                    <div className="particle p-4"></div>
                    <div className="particle p-5"></div>
                    <div className="particle p-6"></div>
                  </div>
                  
                  {/* Texte central animé */}
                  <div className="central-text">
                    <div className="text-line">Let's</div>
                    <div className="text-line typing-text">Connect</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container delay-2">
              <div className="skill-card form-wrapper">
                <div className="card-background"></div>
                <div className="card-content">
                  <h3 className="form-title">
                    <Send size={24} className="form-icon" />
                    {t('contact.form.title', 'Envoyez-moi un message')}
                  </h3>
                  
                  <div className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">{t('contact.form.name', 'Nom')}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${formErrors.name ? 'error' : ''}`}
                        placeholder={t('contact.form.namePlaceholder', 'Votre nom complet')}
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">{t('contact.form.email', 'Email')}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${formErrors.email ? 'error' : ''}`}
                        placeholder={t('contact.form.emailPlaceholder', 'votre.email@exemple.com')}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">{t('contact.form.message', 'Message')}</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-input form-textarea ${formErrors.message ? 'error' : ''}`}
                        placeholder={t('contact.form.messagePlaceholder', 'Décrivez votre projet ou posez vos questions...')}
                      ></textarea>
                      {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      className={`btn btn-primary submit-btn ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? t('contact.form.sending', 'Envoi...') : t('contact.form.send', 'Envoyer')}</span>
                      <Send size={20} />
                    </button>
                    
                    {submitResult.message && (
                      <div className={`submit-result ${submitResult.success ? 'success' : 'error'} fade-in`}>
                        {submitResult.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Section Contact */
          .contact-section {
            position: relative;
            padding: 6rem 0;
            min-height: 100vh;
            color: var(--text-color);
            z-index: 10;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
            position: relative;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, 
              var(--primary-light), 
              var(--secondary-light)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
            animation-fill-mode: both;
          }

          .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
            animation-fill-mode: both;
          }

          /* Section Info Contact */
          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .info-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .info-item {
            animation-fill-mode: both;
          }

          .info-item .card-content {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }

          .info-icon {
            flex-shrink: 0;
          }

          .info-details h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
          }

          .info-details p {
            margin: 0;
            line-height: 1.6;
          }

          .info-details a {
            color: var(--primary-light);
            text-decoration: none;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .info-details a:hover {
            color: var(--secondary-light);
            text-shadow: 0 0 10px currentColor;
          }

          /* Liens Sociaux */
          .social-links {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1rem;
            animation-fill-mode: both;
          }

          .social-link {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            color: var(--text-color);
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
          }

          .social-link:hover {
            transform: translateY(-5px) scale(1.1);
            border-color: var(--primary-light);
            color: var(--primary-light);
            box-shadow: 
              0 10px 25px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              0 0 0 2px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 1.5));
          }

          .social-glow {
            position: absolute;
            inset: -10px;
            background: radial-gradient(circle, 
              hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)), 
              transparent 70%
            );
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .social-link:hover .social-glow {
            opacity: 1;
          }

          /* Animation Contact */
          .contact-animation {
            height: 350px;
            position: relative;
            animation-fill-mode: both;
          }

          .animation-container {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color);
            transition: all 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .animation-container:hover {
            transform: translateY(-10px);
            border-color: var(--primary-light);
            box-shadow: 0 20px 40px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
          }

          /* Formes morphing centrales */
          .morph-container {
            position: absolute;
            width: 120px;
            height: 120px;
            z-index: 1;
          }

          .morph-shape {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            opacity: 0.8;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .shape-1 {
            background: linear-gradient(45deg, var(--primary-light), transparent);
            animation: morph-1 4s infinite;
            transform-origin: center;
          }

          .shape-2 {
            background: linear-gradient(135deg, var(--secondary-light), transparent);
            animation: morph-2 6s infinite;
            animation-delay: -2s;
          }

          .shape-3 {
            background: linear-gradient(225deg, var(--accent-color), transparent);
            animation: morph-3 8s infinite;
            animation-delay: -4s;
          }

          /* Orbites avec icônes */
          .orbit {
            position: absolute;
            border: 1px solid var(--border-color);
            border-radius: 50%;
            opacity: calc(var(--particle-opacity) * 1.2);
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .orbit-1 {
            width: 180px;
            height: 180px;
            top: 50%;
            left: 50%;
            margin: -90px 0 0 -90px;
            animation: orbit-rotate 15s infinite;
          }

          .orbit-2 {
            width: 220px;
            height: 220px;
            top: 50%;
            left: 50%;
            margin: -110px 0 0 -110px;
            animation: orbit-rotate 20s infinite reverse;
          }

          .orbit-3 {
            width: 260px;
            height: 260px;
            top: 50%;
            left: 50%;
            margin: -130px 0 0 -130px;
            animation: orbit-rotate 25s infinite;
          }

          .orbit-icon {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 36px;
            height: 36px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--primary-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-light);
            animation: icon-counter-rotate 15s infinite linear;
            box-shadow: 0 0 20px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2));
          }

          .orbit-2 .orbit-icon {
            animation: icon-counter-rotate 20s infinite linear reverse;
            border-color: var(--secondary-light);
            color: var(--secondary-light);
          }

          .orbit-3 .orbit-icon {
            animation: icon-counter-rotate 25s infinite linear;
            border-color: var(--accent-color);
            color: var(--accent-color);
          }

          /* Vagues d'énergie */
          .energy-wave {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 2px solid var(--primary-light);
            border-radius: 50%;
            opacity: 0;
            animation: energy-pulse 3s infinite;
          }

          .wave-1 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 0s;
          }

          .wave-2 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 1s;
            border-color: var(--secondary-light);
          }

          .wave-3 {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            animation-delay: 2s;
            border-color: var(--accent-color);
          }

          /* Particules flottantes */
          .contact-particles {
            position: absolute;
            inset: 0;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-light);
            border-radius: 50%;
            animation: particle-float 6s infinite ease-in-out;
            box-shadow: 0 0 10px currentColor;
          }

          .p-1 { top: 20%; left: 15%; animation-delay: 0s; }
          .p-2 { top: 80%; right: 20%; animation-delay: 1s; background: var(--secondary-light); }
          .p-3 { top: 30%; right: 10%; animation-delay: 2s; background: var(--accent-color); }
          .p-4 { bottom: 30%; left: 25%; animation-delay: 3s; }
          .p-5 { top: 60%; left: 80%; animation-delay: 4s; background: var(--secondary-light); }
          .p-6 { bottom: 20%; right: 30%; animation-delay: 5s; background: var(--accent-color); }

          /* Texte central */
          .central-text {
            position: absolute;
            text-align: center;
            z-index: 5;
            pointer-events: none;
          }

          .text-line {
            font-size: 1.2rem;
            font-weight: 700;
            line-height: 1.2;
            margin: 0.2rem 0;
          }

          .text-line:first-child {
            color: var(--text-color);
            opacity: 0.8;
          }

          /* Animations */
          @keyframes morph-1 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 50%;
            }
            25% { 
              transform: scale(1.2) rotate(90deg);
              border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            }
            50% { 
              transform: scale(0.8) rotate(180deg);
              border-radius: 20% 80% 20% 80% / 80% 20% 80% 20%;
            }
            75% { 
              transform: scale(1.1) rotate(270deg);
              border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            }
          }

          @keyframes morph-2 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
            }
            33% { 
              transform: scale(1.3) rotate(120deg);
              border-radius: 20% 80% 80% 20% / 20% 80% 20% 80%;
            }
            66% { 
              transform: scale(0.7) rotate(240deg);
              border-radius: 80% 20% 20% 80% / 80% 80% 20% 20%;
            }
          }

          @keyframes morph-3 {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              border-radius: 30% 70% 30% 70% / 70% 30% 70% 30%;
            }
            20% { 
              transform: scale(1.1) rotate(72deg);
              border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
            }
            40% { 
              transform: scale(0.9) rotate(144deg);
              border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%;
            }
            60% { 
              transform: scale(1.2) rotate(216deg);
              border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
            }
            80% { 
              transform: scale(0.8) rotate(288deg);
              border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%;
            }
          }

          @keyframes orbit-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes icon-counter-rotate {
            from { transform: translateX(-50%) rotate(0deg); }
            to { transform: translateX(-50%) rotate(-360deg); }
          }

          @keyframes energy-pulse {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(2);
            }
          }

          @keyframes particle-float {
            0%, 100% { 
              transform: translateY(0px) scale(1);
              opacity: 1;
            }
            25% { 
              transform: translateY(-15px) scale(1.2);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-30px) scale(1);
              opacity: 0.6;
            }
            75% { 
              transform: translateY(-15px) scale(0.8);
              opacity: 0.8;
            }
          }

          /* Formulaire de Contact */
          .contact-form-container {
            position: relative;
            animation-fill-mode: both;
          }

          .form-wrapper {
            padding: 3rem;
          }

          .form-title {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: var(--primary-light);
          }

          .form-icon {
            background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
            padding: 0.5rem;
            border-radius: 10px;
            color: white;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .form-group label {
            color: var(--text-color);
            font-weight: 500;
            font-size: 0.95rem;
          }

          .form-input {
            padding: 1rem 1.5rem;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--text-color);
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
          }

          .form-input::placeholder {
            color: var(--text-secondary);
            opacity: 0.7;
          }

          .form-input:focus {
            border-color: var(--primary-light);
            box-shadow: 
              0 0 0 3px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 2)),
              0 8px 25px hsla(var(--primary-hue), 80%, 65%, calc(var(--glow-intensity) * 1.5));
            transform: translateY(-2px);
          }

          .form-textarea {
            resize: vertical;
            min-height: 120px;
          }

          .form-input.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
          }

          .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            font-weight: 500;
            margin-top: 0.25rem;
          }

          /* Bouton Submit */
          .submit-btn {
            margin-top: 1rem;
            position: relative;
            overflow: hidden;
          }

          .submit-btn.loading {
            cursor: not-allowed;
            opacity: 0.7;
          }

          .submit-btn.loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255,255,255,0.2), 
              transparent
            );
            animation: loading-shimmer 1.5s infinite;
          }

          /* Résultat de soumission */
          .submit-result {
            margin-top: 1rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 500;
            text-align: center;
            animation-fill-mode: both;
          }

          .submit-result.success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
          }

          .submit-result.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
          }

          /* Animations */
          @keyframes loading-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          /* Animation delays */
          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }
          .delay-3 { animation-delay: 0.6s; }
          .delay-4 { animation-delay: 0.8s; }
          .delay-5 { animation-delay: 1s; }
          .delay-6 { animation-delay: 1.2s; }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .contact-content {
              grid-template-columns: 1fr;
              gap: 3rem;
            }

            .contact-3d {
              height: 250px;
            }
          }

          @media (max-width: 768px) {
            .contact-section {
              padding: 4rem 0;
            }

            .section-title {
              font-size: 2.5rem;
              margin-bottom: 3rem;
            }

            .form-wrapper {
              padding: 2rem;
            }

            .form-title {
              font-size: 1.3rem;
            }

            .contact-3d {
              height: 200px;
            }

            .social-links {
              flex-wrap: wrap;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 2rem;
            }

            .form-wrapper {
              padding: 1.5rem;
            }

            .form-input {
              padding: 0.875rem 1.25rem;
            }

            .social-link {
              width: 45px;
              height: 45px;
            }

            .contact-3d {
              height: 180px;
            }
          }

          /* RTL Support */
          :global(.rtl) .contact-form {
            text-align: right;
          }
          
          :global(.rtl) .info-item .card-content {
            flex-direction: row-reverse;
          }
          
          :global(.rtl) .btn {
            flex-direction: row-reverse;
          }
          
          :global(.rtl) .form-group label {
            text-align: right;
          }

          :global(.rtl) .form-title {
            flex-direction: row-reverse;
          }
        `}</style>
      </section>
    </>
  );
}

export default Contact;