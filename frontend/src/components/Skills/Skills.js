import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      color: '#00f5ff',
      skills: [
        { name: 'React.js', level: 90, icon: '⚛️' },
        { name: 'JavaScript', level: 85, icon: '🟨' },
        { name: 'HTML5', level: 95, icon: '🔶' },
        { name: 'CSS3', level: 90, icon: '🎨' },
        { name: 'Redux', level: 80, icon: '🔄' },
        { name: 'Material-UI (MUI)', level: 85, icon: '🎯' },
        { name: 'Ant Design', level: 80, icon: '🐜' },
        { name: 'Bootstrap', level: 85, icon: '📱' }
      ]
    },
    backend: {
      title: 'Backend Development',
      color: '#ff0080',
      skills: [
        { name: 'Spring Boot', level: 90, icon: '🍃' },
        { name: 'Java', level: 85, icon: '☕' },
        { name: 'Node.js', level: 80, icon: '💚' },
        { name: 'MongoDB', level: 85, icon: '🍃' },
        { name: 'MySQL', level: 85, icon: '🐬' },
        { name: 'REST APIs', level: 90, icon: '🔌' },
        { name: 'JWT Auth', level: 80, icon: '🔐' },
        { name: 'SAP Integration', level: 75, icon: '🔗' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      color: '#8b00ff',
      skills: [
        { name: 'Swagger API', level: 85, icon: '📋' },
        { name: 'Postman API', level: 90, icon: '📮' },
        { name: 'Together AI', level: 75, icon: '🤖' },
        { name: 'Git & GitHub', level: 85, icon: '🐙' },
        { name: 'VS Code', level: 90, icon: '💻' },
        { name: 'Axios', level: 85, icon: '🔄' },
        { name: 'Maven', level: 80, icon: '📦' },
        { name: 'IntelliJ IDEA', level: 85, icon: '💡' }
      ]
    },
    soft: {
      title: 'Professional Skills',
      color: '#39ff14',
      skills: [
        { name: 'Agile/Scrum', level: 90, icon: '🔄' },
        { name: 'Team Leadership', level: 85, icon: '👑' },
        { name: 'Problem Solving', level: 90, icon: '🧩' },
        { name: 'Project Management', level: 80, icon: '📈' },
        { name: 'Communication', level: 85, icon: '💬' },
        { name: 'Code Review', level: 85, icon: '🔍' },
        { name: 'Mentoring', level: 80, icon: '👥' },
        { name: 'Documentation', level: 85, icon: '📝' }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2
      }
    })
  };

  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="skills-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Skills & Expertise
          </motion.h2>

          <motion.p variants={itemVariants} className="skills-intro">
            With 3.5 years of professional experience, I've developed expertise across 
            the full stack of web development technologies and modern best practices.
          </motion.p>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="category-tabs">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                style={{
                  '--tab-color': skillCategories[category].color
                }}
              >
                {skillCategories[category].title}
              </button>
            ))}
          </motion.div>

          {/* Active Skills Category */}
          <motion.div 
            className="skills-category"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="skills-grid">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card glass"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -5,
                    boxShadow: `0 10px 30px ${skillCategories[activeCategory].color}20`
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <h3 className="skill-name">{skill.name}</h3>
                    <span 
                      className="skill-percentage"
                      style={{ color: skillCategories[activeCategory].color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      variants={skillVariants}
                      custom={skill.level}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      style={{
                        background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}80)`
                      }}
                    />
                  </div>
                  
                  <div className="skill-level-text">
                    {skill.level >= 85 ? 'Expert' : 
                     skill.level >= 75 ? 'Advanced' : 
                     skill.level >= 65 ? 'Intermediate' : 'Learning'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="skills-additional">
            <div className="additional-grid">
              <div className="additional-item glass">
                <h4>🎯 Current Focus</h4>
                <p>Advanced Spring Boot microservices, React optimization, and AI integration with Together AI APIs</p>
              </div>
              <div className="additional-item glass">
                <h4>📚 Key Achievements</h4>
                <p>Pinnacle Award recipient, 30% user drop-off reduction, and successful delivery of 15+ projects</p>
              </div>
              <div className="additional-item glass">
                <h4>💡 Approach</h4>
                <p>Agile methodologies, clean code practices, and scalable enterprise solutions</p>
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="experience-timeline">
            <h3 className="timeline-title">Professional Journey</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>2022 - Present</h4>
                  <p>Software Engineer at HEPL - Leading enterprise projects and AI integration</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>2021 - 2022</h4>
                  <p>Software Developer at Fanisko - Full stack development and fantasy platforms</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>2016 - 2020</h4>
                  <p>BE Computer Science Engineering - Foundation in software development</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;