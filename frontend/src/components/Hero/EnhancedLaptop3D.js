import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Float, Text } from '@react-three/drei';
import './EnhancedLaptop3D.css';

// 3D Laptop Model Component
const Laptop3DModel = ({ mousePosition }) => {
  const laptopRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    if (laptopRef.current) {
      // Subtle rotation based on mouse position
      laptopRef.current.rotation.y = (mousePosition.x * 0.3) * 0.01;
      laptopRef.current.rotation.x = (mousePosition.y * 0.2) * 0.01;
      
      // Gentle floating animation
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Laptop Base */}
      <Box args={[3, 0.2, 2]} position={[0, -0.8, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </Box>
      
      {/* Laptop Screen */}
      <Box args={[2.8, 1.8, 0.1]} position={[0, 0.2, -0.9]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.1} 
          roughness={0.9}
        />
      </Box>
      
      {/* Screen Bezel */}
      <Box args={[2.9, 1.9, 0.05]} position={[0, 0.2, -0.95]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.6} 
          roughness={0.4}
        />
      </Box>
      
      {/* Keyboard */}
      <Box args={[2.5, 0.05, 1.5]} position={[0, -0.7, 0.2]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.3} 
          roughness={0.7}
        />
      </Box>
      
      {/* Trackpad */}
      <Box args={[0.8, 0.02, 0.6]} position={[0, -0.68, 0.6]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Box>
      
      {/* Floating Code Elements */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[-1.5, 1.5, 0]}
          fontSize={0.2}
          color="#00f5ff"
          anchorX="center"
          anchorY="middle"
        >
          {'</>'}
        </Text>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text
          position={[1.5, 1.2, 0.5]}
          fontSize={0.15}
          color="#ff0080"
          anchorX="center"
          anchorY="middle"
        >
          {'{ }'}
        </Text>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[0.05]} position={[-2, 0.5, 1]}>
          <meshStandardMaterial color="#8b00ff" emissive="#8b00ff" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    </group>
  );
};

// Enhanced Screen Content Component
const EnhancedScreenContent = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeLines = [
    "const developer = {",
    "  name: 'Divya Priya',",
    "  role: 'Full Stack Developer',",
    "  skills: ['React', 'Spring Boot', 'Node.js'],",
    "  passion: 'Creating Amazing UIs',",
    "  status: 'Available for opportunities'",
    "};",
    "",
    "// Building the future, one line at a time",
    "console.log('Welcome to my portfolio!');"
  ];

  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        // Reset animation after completion
        setTimeout(() => {
          setCurrentLine(0);
          setCurrentChar(0);
        }, 3000);
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, isTyping, codeLines]);

  return (
    <div className="enhanced-screen-content">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn red"></span>
          <span className="btn yellow"></span>
          <span className="btn green"></span>
        </div>
        <span className="terminal-title">portfolio.js - Visual Studio Code</span>
      </div>
      
      <div className="code-area">
        {codeLines.map((line, lineIndex) => (
          <div 
            key={lineIndex} 
            className={`code-line ${
              lineIndex < currentLine ? 'completed' : 
              lineIndex === currentLine ? 'current' : 'pending'
            }`}
          >
            <span className="line-number">{lineIndex + 1}</span>
            <span className="code-text">
              {lineIndex < currentLine 
                ? line 
                : lineIndex === currentLine 
                  ? line.slice(0, currentChar)
                  : ''
              }
              {lineIndex === currentLine && (
                <span className="typing-cursor">|</span>
              )}
            </span>
          </div>
        ))}
      </div>
      
      <div className="status-bar">
        <div className="status-item">
          <span>●</span>
          <span>JavaScript</span>
        </div>
        <div className="status-item">
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

const EnhancedLaptop3D = ({ className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: (event.clientX - centerX) / rect.width,
        y: (event.clientY - centerY) / rect.height
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`enhanced-laptop-3d ${isLoaded ? 'loaded' : ''} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!isLoaded && (
        <div className="enhanced-loading-overlay">
          <div className="loading-spinner"></div>
          <p>Initializing 3D Environment...</p>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff0080" />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5}
          color="#8b00ff"
        />
        
        <Laptop3DModel mousePosition={mousePosition} />
      </Canvas>
      
      {/* Screen Content Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: '60%',
          height: '45%',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        <EnhancedScreenContent />
      </div>
      
      <div className="enhanced-interaction-hints">
        <div className="hint">
          <span className="hint-icon">🖱️</span>
          <span>Move mouse to interact</span>
        </div>
        <div className="hint">
          <span className="hint-icon">✨</span>
          <span>Live coding demo</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLaptop3D;