import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Award, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Code,
  Zap,
  Target,
  BookOpen,
  Trophy,
  Building,
  Clock,
  ArrowRight
} from 'lucide-react';
import './EnhancedExperience.css';

const EnhancedExperience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [expandedExperience, setExpandedExperience] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const experiences = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      duration: "Jan 2022 - Present",
      location: "Remote",
      type: "Full-Time",
      category: "development",
      logo: "/images/company1.png",
      website: "https://techsolutions.com",
      companySize: "500+ employees",
      industry: "Enterprise Software",
      description: "Leading development of enterprise web applications using React.js, Node.js, and MongoDB. Mentoring junior developers and implementing best practices for scalable architecture.",
      achievements: [
        {
          text: "Increased application performance by 40% through optimization",
          impact: "high",
          metric: "40%"
        },
        {
          text: "Led a team of 4 developers on multiple projects",
          impact: "medium",
          metric: "4 devs"
        },
        {
          text: "Implemented CI/CD pipeline reducing deployment time by 60%",
          impact: "high",
          metric: "60%"
        },
        {
          text: "Designed and developed RESTful APIs serving 10k+ daily requests",
          impact: "high",
          metric: "10k+"
        }
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "AWS", "Docker", "Redis", "TypeScript", "GraphQL"],
      responsibilities: [
        "Architected and developed scalable web applications",
        "Mentored junior developers and conducted code reviews",
        "Collaborated with product managers and designers",
        "Implemented automated testing and deployment pipelines"
      ],
      projects: [
        {
          name: "Enterprise Dashboard",
          description: "Real-time analytics dashboard for enterprise clients",
          technologies: ["React", "D3.js", "Node.js"]
        },
        {
          name: "API Gateway",
          description: "Microservices API gateway handling 50k+ requests/day",
          technologies: ["Node.js", "Redis", "Docker"]
        }
      ],
      current: true,
      rating: 5
    },
    {
      id: 2,
      company: "Digital Innovations Pvt Ltd",
      position: "Full Stack Developer",
      duration: "Jun 2021 - Dec 2021",
      location: "Bangalore, India",
      type: "Full-Time",
      category: "development",
      logo: "/images/company2.png",
      website: "https://digitalinnovations.com",
      companySize: "100-200 employees",
      industry: "Digital Agency",
      description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create responsive user interfaces and optimized user experiences.",
      achievements: [
        {
          text: "Delivered 8+ projects on time and within budget",
          impact: "medium",
          metric: "8+"
        },
        {
          text: "Improved code quality through implementation of ESLint and Prettier",
          impact: "medium",
          metric: "100%"
        },
        {
          text: "Reduced bug reports by 35% through comprehensive testing",
          impact: "high",
          metric: "35%"
        },
        {
          text: "Mentored 2 junior developers in React.js best practices",
          impact: "medium",
          metric: "2 devs"
        }
      ],
      technologies: ["React.js", "Express.js", "MySQL", "Git", "Webpack", "Sass"],
      responsibilities: [
        "Developed responsive web applications for various clients",
        "Collaborated with UI/UX designers for pixel-perfect implementations",
        "Optimized application performance and loading times",
        "Maintained and updated existing client projects"
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-featured e-commerce solution with payment integration",
          technologies: ["React", "Node.js", "MySQL"]
        }
      ],
      current: false,
      rating: 4
    },
    {
      id: 3,
      company: "WebCraft Studios",
      position: "Frontend Developer",
      duration: "Jan 2021 - May 2021",
      location: "Mumbai, India",
      type: "Full-Time",
      category: "frontend",
      logo: "/images/company3.png",
      website: "https://webcraft.com",
      companySize: "50-100 employees",
      industry: "Web Development",
      description: "Focused on creating responsive and interactive user interfaces for various client projects. Worked closely with UI/UX designers to implement pixel-perfect designs with modern web technologies.",
      achievements: [
        {
          text: "Converted 15+ PSD designs to responsive React components",
          impact: "medium",
          metric: "15+"
        },
        {
          text: "Improved website loading speed by 50% through optimization",
          impact: "high",
          metric: "50%"
        },
        {
          text: "Implemented modern CSS techniques including Flexbox and Grid",
          impact: "medium",
          metric: "100%"
        },
        {
          text: "Collaborated with backend team to integrate REST APIs",
          impact: "medium",
          metric: "API"
        }
      ],
      technologies: ["React.js", "JavaScript", "CSS3", "HTML5", "Sass", "Bootstrap"],
      responsibilities: [
        "Created responsive and interactive user interfaces",
        "Converted design mockups to functional web components",
        "Optimized frontend performance and accessibility",
        "Collaborated with backend developers for API integration"
      ],
      projects: [
        {
          name: "Corporate Website",
          description: "Modern corporate website with CMS integration",
          technologies: ["React", "CSS3", "JavaScript"]
        }
      ],
      current: false,
      rating: 4
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "XYZ University",
      duration: "2017 - 2021",
      location: "India",
      grade: "8.5 CGPA",
      description: "Specialized in Software Engineering and Web Technologies",
      courses: ["Data Structures", "Algorithms", "Database Systems", "Web Development", "Software Engineering"],
      projects: [
        "Final Year Project: E-learning Platform using MERN Stack",
        "Database Management System for Library"
      ]
    }
  ];

  const certifications = [
    { 
      name: "AWS Certified Developer", 
      issuer: "Amazon Web Services", 
      year: "2023",
      level: "Associate",
      credentialId: "AWS-DEV-2023-001",
      skills: ["Cloud Computing", "AWS Services", "Serverless"]
    },
    { 
      name: "React Developer Certification", 
      issuer: "Meta", 
      year: "2022",
      level: "Professional",
      credentialId: "META-REACT-2022-001",
      skills: ["React.js", "JavaScript", "Frontend Development"]
    },
    { 
      name: "Node.js Application Developer", 
      issuer: "OpenJS Foundation", 
      year: "2022",
      level: "Professional",
      credentialId: "NODEJS-2022-001",
      skills: ["Node.js", "Backend Development", "API Development"]
    },
    { 
      name: "MongoDB Certified Developer", 
      issuer: "MongoDB Inc.", 
      year: "2021",
      level: "Associate",
      credentialId: "MONGO-DEV-2021-001",
      skills: ["MongoDB", "Database Design", "NoSQL"]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Experience', icon: Briefcase },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Star },
    { id: 'current', label: 'Current', icon: TrendingUp }
  ];

  const filteredExperiences = experiences.filter(exp => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'current') return exp.current;
    return exp.category === activeFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const toggleExperience = (id) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'var(--neon-green)';
      case 'medium': return 'var(--neon-cyan)';
      default: return 'var(--neon-purple)';
    }
  };

  return (
    <section id="experience" className="enhanced-experience-section section" ref={containerRef}>
      {/* Animated Background */}
      <div className="experience-bg-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-shape shape-${i + 1}`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="enhanced-experience-content"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="experience-header">
            <div className="header-content">
              <motion.h2 
                className="section-title enhanced-title"
                style={{ y, opacity }}
              >
                Professional Journey
              </motion.h2>
              <motion.p className="experience-intro enhanced-intro">
                Transforming ideas into reality through code. My journey of growth, 
                innovation, and continuous learning in the dynamic world of technology.
              </motion.p>
            </div>
            
            {/* Stats Cards */}
            <motion.div className="experience-stats" variants={itemVariants}>
              <div className="stat-card">
                <div className="stat-icon">
                  <Clock />
                </div>
                <div className="stat-content">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Building />
                </div>
                <div className="stat-content">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Companies</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Target />
                </div>
                <div className="stat-content">
                  <div className="stat-number">25+</div>
                  <div className="stat-label">Projects</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Users />
                </div>
                <div className="stat-content">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Team Members</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="experience-filters">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <IconComponent size={18} />
                  {filter.label}
                </button>
              );
            })}
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="enhanced-experience-timeline">
            <div className="timeline-container">
              <div className="timeline-line">
                <motion.div 
                  className="timeline-progress"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>
              
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`enhanced-timeline-item ${exp.current ? 'current' : ''} ${expandedExperience === exp.id ? 'expanded' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-marker-enhanced">
                    <div className="marker-outer">
                      <div className="marker-inner">
                        {exp.current && <div className="current-pulse"></div>}
                        <Briefcase size={16} />
                      </div>
                    </div>
                    <div className="marker-line"></div>
                  </div>
                  
                  <div className="enhanced-timeline-content glass-enhanced">
                    {/* Experience Header */}
                    <div className="enhanced-experience-header">
                      <div className="company-section">
                        <div className="company-logo-container">
                          <img 
                            src={exp.logo} 
                            alt={exp.company}
                            className="enhanced-company-logo"
                            onError={(e) => {
                              e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23333' rx='12'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300f5ff' font-size='24'%3E${exp.company.charAt(0)}%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                          <div className="company-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < exp.rating ? 'filled' : ''} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="company-details-enhanced">
                          <h3 className="position-enhanced">{exp.position}</h3>
                          <div className="company-name-enhanced">
                            <a href={exp.website} target="_blank" rel="noopener noreferrer">
                              {exp.company}
                              <ExternalLink size={16} />
                            </a>
                          </div>
                          <div className="company-meta">
                            <span className="company-size">{exp.companySize}</span>
                            <span className="company-industry">{exp.industry}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="experience-meta-enhanced">
                        <div className="meta-item">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="meta-item">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                        <div className={`job-type-enhanced ${exp.type.toLowerCase().replace('-', '')}`}>
                          {exp.type}
                        </div>
                        {exp.current && (
                          <div className="current-badge-enhanced">
                            <TrendingUp size={14} />
                            Current Role
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Experience Description */}
                    <p className="job-description-enhanced">{exp.description}</p>

                    {/* Key Achievements */}
                    <div className="achievements-enhanced">
                      <h4 className="achievements-title">
                        <Trophy size={18} />
                        Key Achievements
                      </h4>
                      <div className="achievements-grid">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            className="achievement-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <div className="achievement-metric" style={{ color: getImpactColor(achievement.impact) }}>
                              {achievement.metric}
                            </div>
                            <div className="achievement-text">{achievement.text}</div>
                            <div className={`impact-indicator ${achievement.impact}`}>
                              {achievement.impact} impact
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="technologies-enhanced">
                      <h4 className="tech-title">
                        <Code size={18} />
                        Technologies Used
                      </h4>
                      <div className="tech-tags-enhanced">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="tech-tag-enhanced"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      className="expand-btn"
                      onClick={() => toggleExperience(exp.id)}
                    >
                      {expandedExperience === exp.id ? (
                        <>
                          <ChevronUp size={18} />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} />
                          Show More Details
                        </>
                      )}
                    </button>

                    {/* Expanded Content */}
                    <motion.div
                      className="expanded-content"
                      initial={false}
                      animate={{
                        height: expandedExperience === exp.id ? 'auto' : 0,
                        opacity: expandedExperience === exp.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedExperience === exp.id && (
                        <div className="expanded-details">
                          {/* Responsibilities */}
                          <div className="responsibilities-section">
                            <h4>
                              <Zap size={18} />
                              Key Responsibilities
                            </h4>
                            <ul className="responsibilities-list">
                              {exp.responsibilities.map((resp, respIndex) => (
                                <li key={respIndex}>{resp}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Projects */}
                          <div className="projects-section">
                            <h4>
                              <Target size={18} />
                              Notable Projects
                            </h4>
                            <div className="projects-grid">
                              {exp.projects.map((project, projIndex) => (
                                <div key={projIndex} className="project-card">
                                  <h5>{project.name}</h5>
                                  <p>{project.description}</p>
                                  <div className="project-tech">
                                    {project.technologies.map((tech, techIndex) => (
                                      <span key={techIndex} className="project-tech-tag">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <div className="education-certifications-enhanced">
            {/* Education */}
            <motion.div variants={itemVariants} className="education-section-enhanced">
              <h3 className="section-subtitle-enhanced">
                <BookOpen size={24} />
                Education
              </h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-item-enhanced glass-enhanced"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="education-header-enhanced">
                    <div className="education-main">
                      <h4 className="degree-enhanced">{edu.degree}</h4>
                      <div className="institution-enhanced">{edu.institution}, {edu.location}</div>
                      <p className="education-description-enhanced">{edu.description}</p>
                    </div>
                    <div className="education-meta-enhanced">
                      <div className="grade-enhanced">{edu.grade}</div>
                      <div className="duration-enhanced">{edu.duration}</div>
                    </div>
                  </div>
                  
                  <div className="education-details">
                    <div className="courses-section">
                      <h5>Key Courses:</h5>
                      <div className="courses-list">
                        {edu.courses.map((course, courseIndex) => (
                          <span key={courseIndex} className="course-tag">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="projects-section">
                      <h5>Academic Projects:</h5>
                      <ul className="academic-projects">
                        {edu.projects.map((project, projIndex) => (
                          <li key={projIndex}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="certifications-section-enhanced">
              <h3 className="section-subtitle-enhanced">
                <Award size={24} />
                Certifications
              </h3>
              <div className="certifications-grid-enhanced">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="certification-item-enhanced glass-enhanced"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="cert-header">
                      <Award className="cert-icon-enhanced" />
                      <div className="cert-level">{cert.level}</div>
                    </div>
                    <div className="cert-details-enhanced">
                      <h4 className="cert-name-enhanced">{cert.name}</h4>
                      <div className="cert-issuer-enhanced">{cert.issuer}</div>
                      <div className="cert-year-enhanced">{cert.year}</div>
                      <div className="cert-id">ID: {cert.credentialId}</div>
                    </div>
                    <div className="cert-skills">
                      {cert.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="cert-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="cert-action">
                      <ArrowRight size={16} />
                      View Certificate
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedExperience;