import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import ThreeJSScene from '../ThreeJSScene/ThreeJSScene';
import LaptopCode3D from '../LaptopCode3D/LaptopCode3D';
import LaptopCodeCSS from '../LaptopCode3D/LaptopCodeCSS';
import SimpleLaptop from '../LaptopCode3D/SimpleLaptop';
import EnhancedLaptop3D from './EnhancedLaptop3D';
import './Hero.css';

// 3D Text Component
const AnimatedText3D = ({ text, position, color = "#00f5ff" }) => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={position}
        >
          {text}
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

// Typing Animation Component
const TypingAnimation = ({ texts, speed = 100 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts, speed]);

  return (
    <span className="typing-text">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "Software Engineer", 
    "Spring Boot Expert",
    "React.js Specialist",
    "Enterprise Solutions Developer"
  ];

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
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
    <section id="hero" className="hero-section">
      {/* Enhanced 3D Background with Interactive Elements */}
      <ThreeJSScene 
        className="hero-3d-background"
        showText={false}
        showMorphing={true}
        interactive={true}
      />
      
      {/* 3D Text Background */}
      <div className="hero-3d-text">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <AnimatedText3D 
            text="CODE" 
            position={[-2, 1, -2]} 
            color="#00f5ff" 
          />
          <AnimatedText3D 
            text="CREATE" 
            position={[1, -1, -3]} 
            color="#ff0080" 
          />
          <AnimatedText3D 
            text="INNOVATE" 
            position={[-1, 0, -4]} 
            color="#8b00ff" 
          />
        </Canvas>
      </div>

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-greeting" variants={itemVariants}>
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          <motion.h1 className="hero-name" variants={itemVariants}>
            <span className="name-text neon-text floating"> Divya Priya</span>
          </motion.h1>

          <motion.div className="hero-role" variants={itemVariants}>
            <span className="role-prefix">I'm a </span>
            <TypingAnimation texts={roles} speed={150} />
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            Experienced and results-driven Full Stack Developer with 3.5+ years of experience 
            in designing, developing, and deploying scalable web applications. Proficient in 
            React.js, Spring Boot, MongoDB, and MySQL with a proven track record of delivering 
            15+ projects and 4 products.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <button className="btn-neon btn-primary" onClick={() => scrollToNext()}>
              View My Work
            </button>
            <button className="btn-neon btn-secondary">
              <Download size={18} />
              Download Resume
            </button>
          </motion.div>

          <motion.div className="hero-social" variants={itemVariants}>
            <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
            <a href="mailto:divyamailz19999@gmail.com" className="social-link">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-avatar"
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="avatar-container glass neon-border">
            <EnhancedLaptop3D className="laptop-3d-container" />
            <div className="avatar-glow laptop-glow"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
      >
        <ChevronDown size={30} className="scroll-arrow" />
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;