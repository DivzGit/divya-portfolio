const express = require('express');
const router = express.Router();

// Sample skills data
const skills = {
  frontend: [
    { name: 'React.js', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 }
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express.js', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'MySQL', level: 80 },
    { name: 'REST APIs', level: 85 }
  ],
  tools: [
    { name: 'Git & GitHub', level: 85 },
    { name: 'VS Code', level: 90 },
    { name: 'npm/yarn', level: 80 },
    { name: 'Postman', level: 85 }
  ]
};

// GET /api/skills
router.get('/', (req, res) => {
  res.json(skills);
});

// GET /api/skills/:category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  
  if (!skills[category]) {
    return res.status(404).json({ message: 'Skill category not found' });
  }
  
  res.json({
    category,
    skills: skills[category]
  });
});

module.exports = router;