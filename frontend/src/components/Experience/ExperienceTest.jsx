import React from 'react';
import EnhancedExperience from './EnhancedExperience';
import './ExperienceTest.css';

const ExperienceTest = () => {
  return (
    <div className="experience-test-container">
      <div className="test-header">
        <h1>Enhanced Professional Experience Design</h1>
        <p>Modern, interactive, and visually appealing experience section</p>
      </div>
      
      <div className="test-content">
        <EnhancedExperience />
      </div>
      
      <div className="test-features">
        <h2>✨ Enhanced Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎨 Modern Design</h3>
            <ul>
              <li>Glass morphism effects</li>
              <li>Gradient backgrounds</li>
              <li>Neon color scheme</li>
              <li>Smooth animations</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h3>📊 Interactive Elements</h3>
            <ul>
              <li>Expandable experience cards</li>
              <li>Filter tabs for categories</li>
              <li>Hover effects and transitions</li>
              <li>Progress indicators</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h3>📈 Enhanced Data Display</h3>
            <ul>
              <li>Achievement metrics with impact levels</li>
              <li>Company ratings and details</li>
              <li>Technology tags with hover effects</li>
              <li>Project showcases</li>
            </ul>
          </div>
          
          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <ul>
              <li>Mobile-first approach</li>
              <li>Adaptive layouts</li>
              <li>Touch-friendly interactions</li>
              <li>Accessibility features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTest;