import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import ApiService from '../../services/api';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const data = await ApiService.submitContact(formData);
      setSubmitStatus({ type: 'success', message: data.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="contact-icon" />,
      title: "Email",
      value: "divyamailz19999@gmail.com",
      link: "mailto:divyamailz19999@gmail.com"
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Phone",
      value: "+91 XXX XXX XXXX",
      link: "tel:+91XXXXXXXXXX"
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: "Location",
      value: "India",
      link: null
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github />, url: 'https://github.com', color: '#333' },
    { name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com', color: '#0077B5' },
    { name: 'Twitter', icon: <Twitter />, url: 'https://twitter.com', color: '#1DA1F2' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="contact-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Get In Touch
          </motion.h2>

          <motion.p variants={itemVariants} className="contact-intro">
            I'm always open to discussing new opportunities, creative projects, 
            or just having a chat about technology. Feel free to reach out!
          </motion.p>

          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="contact-form-container">
              <h3 className="form-title">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="contact-form glass">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-textarea"
                  ></textarea>
                </div>

                {submitStatus && (
                  <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn btn-neon"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="contact-info">
              <h3 className="info-title">Contact Information</h3>
              
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-detail glass"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {info.icon}
                    <div className="detail-content">
                      <h4 className="detail-title">{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} className="detail-value">
                          {info.value}
                        </a>
                      ) : (
                        <span className="detail-value">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="social-section">
                <h4 className="social-title">Follow me on</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': social.color }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="availability-status glass">
                <div className="status-indicator online"></div>
                <div className="status-text">
                  <h4>Currently Available</h4>
                  <p>Open to new opportunities and freelance projects</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;