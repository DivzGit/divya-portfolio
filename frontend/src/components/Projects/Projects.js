import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Eye, Code } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "GoalSync – AI-Powered OKR Management Platform",
      description: "Developed an advanced AI-powered OKR platform for Cavininfotech to streamline goal tracking and boost employee engagement. Features multi-level cascading objectives (Organization → Team → Individual), real-time progress tracking, intelligent goal recommendations, and comprehensive analytics dashboard. Implemented role-based access control and automated performance insights.",
      technologies: ["React.js", "Node.js", "AI/ML", "MongoDB", "JWT Auth", "Chart.js", "Socket.io"],
      image: "/images/goalsync-cavininfotech.jpg",
      github: "https://github.com/cavininfotech/goalsync",
      demo: "https://goalsync.in/",
      category: "fullstack",
      featured: true
    },
    {
      id: 2,
      title: "Budgie – Smart Budget Management System",
      description: "Built a comprehensive budget management platform for Cavininfotech that helps individuals and businesses track expenses, set financial goals, and generate intelligent spending insights. Features include expense categorization, budget alerts, financial forecasting, and detailed reporting with visual analytics.",
      technologies: ["React.js", "Spring Boot", "PostgreSQL", "Chart.js", "JWT Auth", "Material-UI"],
      image: "/images/budgie-cavininfotech.jpg",
      github: "https://github.com/cavininfotech/budgie",
      demo: "https://budgie.co.in/#/login",
      category: "fullstack",
      featured: true
    },
    {
      id: 3,
      title: "Cavins Pro – Supply Chain & E-Auction Platform",
      description: "Developed an enterprise platform to streamline procurement, inventory, logistics, and online auctions. Integrated with SAP for real-time supply chain synchronization and inventory visibility. Built SCM modules for vendor selection, order processing, and logistics tracking with automated workflows.",
      technologies: ["React.js", "Spring Boot", "SAP Integration", "MySQL"],
      image: "/images/cavins-pro.jpg",
      github: "https://github.com",
      demo: "https://cavins-pro-demo.com",
      category: "fullstack",
      featured: true
    },
    {
      id: 4,
      title: "Meeting Agenda - AI-Based Meeting Agenda Builder",
      description: "AI-powered system to generate meeting agendas from user input. Integrated Together AI APIs and enabled JSON-driven collaboration tools for enhanced productivity.",
      technologies: ["React.js", "Spring Boot", "MongoDB", "Together AI"],
      image: "/images/meeting-agenda.jpg",
      github: "https://github.com",
      demo: "https://meeting-agenda-demo.com",
      category: "fullstack",
      featured: true
    },
    {
      id: 5,
      title: "Fantasy Boss – Fantasy Cricket Platform",
      description: "Created a fantasy platform to manage teams, leagues, and leaderboards. Integrated real-time scoring APIs and dynamic UI for match tracking with comprehensive user engagement features.",
      technologies: ["React.js", "JavaScript", "Bootstrap", "Spring Boot", "MySQL"],
      image: "/images/fantasy-boss.jpg",
      github: "https://github.com",
      demo: "https://fantasy-boss-demo.com",
      category: "fullstack",
      featured: false
    },
    {
      id: 6,
      title: "Crickbuster – Live Match Tracking Dashboard",
      description: "Built a real-time match tracking system with reduced latency by 40%. Used optimized APIs and MongoDB for fast and efficient data rendering with live score updates.",
      technologies: ["React.js", "Spring Boot", "MongoDB"],
      image: "/images/crickbuster.jpg",
      github: "https://github.com",
      demo: "https://crickbuster-demo.com",
      category: "fullstack",
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <section id="projects" className="projects-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="projects-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Featured Projects
          </motion.h2>

          <motion.p variants={itemVariants} className="projects-intro">
            Here are some of my recent projects that showcase my skills in full-stack development, 
            modern web technologies, and problem-solving abilities.
          </motion.p>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="project-filters">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="projects-grid" variants={containerVariants}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card glass ${project.featured ? 'featured' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                layout
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300f5ff' font-size='16'%3E${project.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Code size={16} />
                      Code
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link primary"
                    >
                      <Eye size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div variants={itemVariants} className="github-cta">
            <h3>Want to see more?</h3>
            <p>Check out my GitHub profile for more projects and contributions</p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-neon"
            >
              <Github size={20} />
              View GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;