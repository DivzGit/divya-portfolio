import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, TrendingUp } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const experiences = [
    {
      id: 1,
      company: "HEPL",
      position: "Software Engineer",
      duration: "2022 - Present",
      location: "India",
      type: "Full-Time",
      logo: "/images/hepl-logo.png",
      website: "https://hepl.com",
      description: "Led full-stack development of 8+ projects and 4 products using Spring Boot, React.js, MongoDB, and MySQL. Built RESTful APIs with Spring Boot, integrating with frontend via Axios and Redux.",
      achievements: [
        "Led full-stack development of 8+ projects and 4 products using Spring Boot, React.js, MongoDB, and MySQL",
        "Built RESTful APIs with Spring Boot, integrating with frontend via Axios and Redux",
        "Designed responsive UIs using React and MUI, reducing user drop-off by 30%",
        "Participated in daily standups and sprint planning as part of an Agile team",
        "Created Swagger-based API documentation for enhanced maintainability",
        "Honored with the Pinnacle Award for exceptional performance and consistent delivery of high-quality solutions"
      ],
      technologies: ["React.js", "Spring Boot", "MongoDB", "MySQL", "JWT Auth", "Ant Design", "SAP Integration", "Together AI", "Swagger API"],
      current: true
    },
    {
      id: 2,
      company: "FANISKO PRIVATE LIMITED",
      position: "Software Developer",
      duration: "2021 - 2022",
      location: "India",
      type: "Full-Time",
      logo: "/images/fanisko-logo.png",
      website: "https://fanisko.com",
      description: "Led full-stack development of 8+ projects and 4 products using Spring Boot, React.js, MongoDB, and MySQL. Built RESTful APIs with Spring Boot, integrating with frontend via Axios and Redux.",
      achievements: [
        "Led full-stack development of 8+ projects and 4 products using Spring Boot, React.js, MongoDB, and MySQL",
        "Built RESTful APIs with Spring Boot, integrating with frontend via Axios and Redux",
        "Designed responsive UIs using React and MUI, reducing user drop-off by 30%",
        "Participated in daily standups and sprint planning as part of an Agile team",
        "Created Swagger-based API documentation for enhanced maintainability"
      ],
      technologies: ["React.js", "JavaScript", "Bootstrap", "Spring Boot", "MySQL", "MongoDB"],
      current: false
    }
  ];

  const education = [
    {
      degree: "BE - Computer Science Engineering",
      institution: "CK COLLEGE OF ENGINEERING & TECHNOLOGY",
      duration: "2016 - 2020",
      location: "India",
      grade: "First Class",
      description: "Specialized in Computer Science Engineering with focus on software development and programming fundamentals"
    }
  ];

  const certifications = [
    { name: "Pinnacle Award - HEPL", issuer: "HEPL", year: "2023" },
    { name: "Full Stack Development", issuer: "Professional Experience", year: "2022" },
    { name: "Spring Boot & React.js", issuer: "Industry Projects", year: "2022" },
    { name: "Agile Development Methodology", issuer: "Team Collaboration", year: "2021" }
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
    <section id="experience" className="experience-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="experience-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Experience & Education
          </motion.h2>

          <motion.p variants={itemVariants} className="experience-intro">
            My professional journey in software development, showcasing growth, 
            achievements, and continuous learning in the ever-evolving tech landscape.
          </motion.p>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="experience-timeline">
            <h3 className="timeline-title">
              <Briefcase className="title-icon" />
              Professional Experience
            </h3>
            
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`timeline-item ${exp.current ? 'current' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-marker">
                    {exp.current && <div className="current-indicator"></div>}
                  </div>
                  
                  <div className="timeline-content glass">
                    <div className="experience-header">
                      <div className="company-info">
                        <img 
                          src={exp.logo} 
                          alt={exp.company}
                          className="company-logo"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23333' rx='10'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300f5ff' font-size='20'%3E${exp.company.charAt(0)}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <div className="company-details">
                          <h4 className="position">{exp.position}</h4>
                          <div className="company-name">
                            <a href={exp.website} target="_blank" rel="noopener noreferrer">
                              {exp.company}
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="experience-meta">
                        <div className="duration">
                          <Calendar size={16} />
                          {exp.duration}
                        </div>
                        <div className="location">
                          <MapPin size={16} />
                          {exp.location}
                        </div>
                        <div className={`job-type ${exp.type.toLowerCase().replace('-', '')}`}>
                          {exp.type}
                        </div>
                        {exp.current && (
                          <div className="current-badge">
                            <TrendingUp size={14} />
                            Current
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="job-description">{exp.description}</p>

                    <div className="achievements">
                      <h5>Key Achievements:</h5>
                      <ul>
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="experience-technologies">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <div className="education-certifications">
            {/* Education */}
            <motion.div variants={itemVariants} className="education-section">
              <h3 className="section-subtitle">Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="education-item glass">
                  <div className="education-header">
                    <h4 className="degree">{edu.degree}</h4>
                    <div className="education-meta">
                      <span className="grade">{edu.grade}</span>
                      <span className="duration">{edu.duration}</span>
                    </div>
                  </div>
                  <div className="institution">{edu.institution}, {edu.location}</div>
                  <p className="education-description">{edu.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="certifications-section">
              <h3 className="section-subtitle">Certifications</h3>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item glass">
                    <Award className="cert-icon" />
                    <div className="cert-details">
                      <h4 className="cert-name">{cert.name}</h4>
                      <div className="cert-issuer">{cert.issuer}</div>
                      <div className="cert-year">{cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;