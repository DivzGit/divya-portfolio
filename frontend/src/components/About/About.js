import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Sphere, Torus } from '@react-three/drei';
import { Code, Coffee, Lightbulb, Rocket, Users, Award } from 'lucide-react';
import CodingSetup3D from '../ThreeJSScene/CodingSetup3D';
import './About.css';

// 3D Floating Elements
const FloatingElements = () => {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-2, 1, 0]} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#00f5ff" wireframe />
        </Box>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere position={[2, -1, 0]} args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#ff0080" transparent opacity={0.7} />
        </Sphere>
      </Float>
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={3}>
        <Torus position={[0, 2, -1]} args={[0.3, 0.1, 16, 100]}>
          <meshStandardMaterial color="#8b00ff" wireframe />
        </Torus>
      </Float>
    </>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { icon: <Code />, value: '3.5+', label: 'Years Experience' },
    { icon: <Rocket />, value: '15+', label: 'Projects Completed' },
    { icon: <Users />, value: '4', label: 'Products Delivered' },
    { icon: <Award />, value: '1', label: 'Pinnacle Award' }
  ];

  const values = [
    {
      icon: <Code className="value-icon" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following industry best practices.'
    },
    {
      icon: <Lightbulb className="value-icon" />,
      title: 'Innovation',
      description: 'Always exploring new technologies and creative solutions to solve complex problems.'
    },
    {
      icon: <Users className="value-icon" />,
      title: 'Collaboration',
      description: 'Strong team player with excellent communication skills and agile methodology expertise.'
    },
    {
      icon: <Coffee className="value-icon" />,
      title: 'Dedication',
      description: 'Passionate about continuous learning and delivering high-quality results on time.'
    }
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
    <section id="about" className="about-section section">
      <div className="about-3d-background">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <FloatingElements />
          {/* Add the coding setup 3D model */}
          <group position={[3, -1, -2]} scale={0.3} rotation={[0, -0.5, 0]}>
            <CodingSetup3D />
          </group>
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="about-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            About Me
          </motion.h2>

          <div className="about-grid">
            <motion.div variants={itemVariants} className="about-text">
              <h3 className="about-subtitle">
                Experienced and Results-Driven <span className="highlight">Full Stack Developer</span>
              </h3>
              
              <p className="about-description">
                Experienced and results-driven Full Stack Developer with 3.5+ years of experience in designing, 
                developing, and deploying scalable web applications. Proficient in modern frontend and backend 
                technologies including React.js, Spring Boot, Node.js, MongoDB, and MySQL.
              </p>

              <p className="about-description">
                Demonstrated success in agile teams, contributing to <strong>15+ projects</strong> and 
                <strong>4 products</strong>. Seeking to leverage strong development and problem-solving skills 
                to build innovative software solutions.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <span className="highlight-number">3.5+</span>
                  <span className="highlight-text">Years of Professional Experience</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">Full Stack</span>
                  <span className="highlight-text">Development Expertise</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="about-image">
              <div className="image-container glass neon-border">
                <img 
                  src="/images/about-coding.jpg" 
                  alt="Divya coding"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300f5ff' font-size='20'%3ECoding Setup%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="image-overlay">
                  <div className="tech-icons">
                    <span className="tech-icon">⚛️</span>
                    <span className="tech-icon">🔧</span>
                    <span className="tech-icon">💻</span>
                    <span className="tech-icon">🚀</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="stats-container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item glass"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div variants={itemVariants} className="values-section">
            <h3 className="values-title">What I Bring to the Table</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card glass"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="value-header">
                    {value.icon}
                    <h4 className="value-title-text">{value.title}</h4>
                  </div>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;