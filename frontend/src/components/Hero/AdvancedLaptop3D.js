import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Float, Text } from '@react-three/drei';
import './AdvancedLaptop3D.css';

// Advanced 3D Laptop Model
const AdvancedLaptopModel = ({ mousePosition }) => {
  const laptopRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (laptopRef.current) {
      // More responsive mouse interaction
      laptopRef.current.rotation.y = (mousePosition.x * 0.5) * 0.02;
      laptopRef.current.rotation.x = (mousePosition.y * 0.3) * 0.02;
      
      // Dynamic floating with time-based variation
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      laptopRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }

    // Animate floating particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Main Laptop Body */}
      <Box args={[3.2, 0.25, 2.2]} position={[0, -0.8, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1}
        />
      </Box>
      
      {/* Screen */}
      <Box args={[2.9, 1.9, 0.08]} position={[0, 0.2, -0.9]} rotation={[-0.08, 0, 0]}>
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.1} 
          roughness={0.9}
        />
      </Box>
      
      {/* Screen Frame */}
      <Box args={[3.0, 2.0, 0.06]} position={[0, 0.2, -0.94]} rotation={[-0.08, 0, 0]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.7} 
          roughness={0.3}
        />
      </Box>
      
      {/* Keyboard Area */}
      <Box args={[2.6, 0.08, 1.6]} position={[0, -0.7, 0.2]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.4} 
          roughness={0.6}
        />
      </Box>
      
      {/* Individual Keys */}
      {Array.from({ length: 48 }, (_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        const x = (col - 5.5) * 0.2;
        const z = (row - 1.5) * 0.2 + 0.2;
        
        return (
          <Box 
            key={i}
            args={[0.15, 0.03, 0.15]} 
            position={[x, -0.66, z]}
          >
            <meshStandardMaterial 
              color="#333333" 
              metalness={0.2} 
              roughness={0.8}
            />
          </Box>
        );
      })}
      
      {/* Trackpad */}
      <Box args={[0.9, 0.02, 0.7]} position={[0, -0.68, 0.7]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.95} 
          roughness={0.05}
        />
      </Box>
      
      {/* Floating Code Particles */}
      <group ref={particlesRef}>
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
          <Text
            position={[-2, 1.8, 0.5]}
            fontSize={0.25}
            color="#00f5ff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/helvetiker_regular.typeface.json"
          >
            React
          </Text>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
          <Text
            position={[2, 1.5, -0.5]}
            fontSize={0.2}
            color="#ff0080"
            anchorX="center"
            anchorY="middle"
            font="/fonts/helvetiker_regular.typeface.json"
          >
            Node.js
          </Text>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1}>
          <Text
            position={[-1.5, 2.2, -1]}
            fontSize={0.18}
            color="#8b00ff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/helvetiker_regular.typeface.json"
          >
            MongoDB
          </Text>
        </Float>
        
        {/* Geometric Elements */}
        <Float speed={1.3} rotationIntensity={1} floatIntensity={0.8}>
          <Sphere args={[0.08]} position={[-2.5, 0.8, 1.2]}>
            <meshStandardMaterial 
              color="#00f5ff" 
              emissive="#00f5ff" 
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
        
        <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.3}>
          <Box args={[0.1, 0.1, 0.1]} position={[2.5, 0.5, 1.5]}>
            <meshStandardMaterial 
              color="#ff0080" 
              emissive="#ff0080" 
              emissiveIntensity={0.3}
              wireframe
            />
          </Box>
        </Float>
      </group>
    </group>
  );
};

// Advanced Screen Content
const AdvancedScreenContent = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const codeLines = [
    "// Advanced Full Stack Development",
    "const portfolio = {",
    "  developer: 'Divya Priya',",
    "  experience: '3.5+ years',",
    "  specialization: 'Full Stack',",
    "  technologies: {",
    "    frontend: ['React.js', 'Vue.js', 'Angular'],",
    "    backend: ['Spring Boot', 'Node.js', 'Express'],",
    "    database: ['MongoDB', 'MySQL', 'PostgreSQL'],",
    "    cloud: ['AWS', 'Docker', 'Kubernetes']",
    "  },",
    "  achievements: {",
    "    projects: 15,",
    "    products: 4,",
    "    awards: ['Pinnacle Award 2023']",
    "  }",
    "};",
    "",
    "// Ready to build amazing solutions!",
    "console.log('Let\\'s create something extraordinary!');"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLines < codeLines.length) {
        if (currentChar < codeLines[visibleLines].length) {
          setCurrentChar(prev => prev + 1);
        } else {
          setVisibleLines(prev => prev + 1);
          setCurrentChar(0);
        }
      } else if (!isComplete) {
        setIsComplete(true);
        // Reset after showing complete code
        setTimeout(() => {
          setVisibleLines(0);
          setCurrentChar(0);
          setIsComplete(false);
        }, 4000);
      }
    }, isComplete ? 100 : 60);

    return () => clearTimeout(timer);
  }, [visibleLines, currentChar, isComplete, codeLines]);

  return (
    <div className="screen-content">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn red"></span>
          <span className="btn yellow"></span>
          <span className="btn green"></span>
        </div>
        <span className="terminal-title">advanced-portfolio.js</span>
      </div>
      
      <div className="code-area">
        {codeLines.map((line, index) => (
          <div 
            key={index} 
            className={`code-line ${index < visibleLines ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <span className="line-number">{index + 1}</span>
            <span className="code-text">
              {index < visibleLines 
                ? line 
                : index === visibleLines 
                  ? line.slice(0, currentChar)
                  : ''
              }
              {index === visibleLines && !isComplete && (
                <span className="cursor-blink">|</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvancedLaptop3D = ({ className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

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

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="laptop-3d-error">
        <div className="error-message">
          <h3>3D Model Loading Error</h3>
          <p>Unable to load the 3D laptop model. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`laptop-3d-advanced ${isLoaded ? 'loaded' : ''} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading Advanced 3D Model...</p>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        onError={handleError}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff0080" />
        <spotLight 
          position={[0, 8, 8]} 
          angle={0.2} 
          penumbra={1} 
          intensity={0.8}
          color="#8b00ff"
          castShadow
        />
        
        <AdvancedLaptopModel mousePosition={mousePosition} />
      </Canvas>
      
      {/* Screen Content Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '22%',
          left: '18%',
          width: '64%',
          height: '48%',
          zIndex: 5,
          pointerEvents: 'none',
          transform: 'perspective(1000px) rotateX(-5deg)'
        }}
      >
        <AdvancedScreenContent />
      </div>
      
      <div className="interaction-hints">
        <div className="hint">
          <span className="hint-icon">🖱️</span>
          <span>Interactive 3D</span>
        </div>
        <div className="hint">
          <span className="hint-icon">⚡</span>
          <span>Live Demo</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLaptop3D;