const express = require('express');
const router = express.Router();

// Sample projects data (in a real app, this would come from MongoDB)
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with React.js frontend and Node.js backend",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Redux"],
    image: "/images/project1.jpg",
    github: "https://github.com/divya/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    technologies: ["React.js", "Socket.io", "Node.js", "MySQL"],
    image: "/images/project2.jpg",
    github: "https://github.com/divya/taskmanager",
    demo: "https://taskmanager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Modern weather application with location-based forecasts",
    technologies: ["React.js", "Weather API", "Chart.js", "CSS3"],
    image: "/images/project3.jpg",
    github: "https://github.com/divya/weather-app",
    demo: "https://weather-demo.com",
    featured: false
  }
];

// GET /api/projects
router.get('/', (req, res) => {
  const { featured } = req.query;
  
  let filteredProjects = projects;
  
  if (featured === 'true') {
    filteredProjects = projects.filter(project => project.featured);
  }
  
  res.json({
    projects: filteredProjects,
    total: filteredProjects.length
  });
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  res.json(project);
});

module.exports = router;