import React from 'react';
import EnhancedLaptop3D from './EnhancedLaptop3D';
import './LaptopTest.css';

const LaptopTest = () => {
  return (
    <div className="laptop-test-container">
      <h2>Enhanced 3D Laptop Test</h2>
      <div className="laptop-test-wrapper">
        <EnhancedLaptop3D />
      </div>
      <div className="test-info">
        <h3>Features:</h3>
        <ul>
          <li>✨ Interactive 3D laptop model</li>
          <li>💻 Live coding animation on screen</li>
          <li>🎨 Neon glow effects</li>
          <li>🖱️ Mouse-responsive rotation</li>
          <li>⚡ Optimized performance</li>
          <li>📱 Responsive design</li>
        </ul>
      </div>
    </div>
  );
};

export default LaptopTest;