import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code, User, Briefcase, Mail, Award, FolderOpen } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: <User size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Logo className="nav-logo" />

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop-menu">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="nav-link"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Navigation */}
        <motion.div 
          className={`mobile-menu ${isOpen ? 'open' : ''}`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            x: isOpen ? '0%' : '100%' 
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                className="mobile-nav-item"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0, 
                  x: isOpen ? 0 : 50 
                }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-nav-link"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;