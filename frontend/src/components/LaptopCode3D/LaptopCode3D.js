import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
import * as THREE from 'three';

// 3D Laptop Component
const Laptop3D = ({ position = [0, 0, 0] }) => {
  const laptopRef = useRef();
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  // Sample code for typing effect
  const codeText = `const developer = {
  name: 'Divya',
  skills: ['React', 'Node.js'],
  passion: 'Creating UIs'
};`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (textIndex < codeText.length) {
        setCurrentText(codeText.slice(0, textIndex + 1));
        setTextIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentText('');
          setTextIndex(0);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [textIndex, codeText]);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={laptopRef} position={position}>
      {/* Laptop Base */}
      <Box args={[3.2, 0.15, 2.2]} position={[0, -0.6, 0]}>
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Laptop Screen Frame */}
      <Box args={[3, 2, 0.1]} position={[0, 0.3, -1]} rotation={[-0.15, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
        />
      </Box>
      
      {/* Screen */}
      <Box args={[2.7, 1.7, 0.05]} position={[0, 0.3, -0.95]} rotation={[-0.15, 0, 0]}>
        <meshStandardMaterial 
          color="#000000" 
          emissive="#001122"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Code Display using Html */}
      <Html
        position={[0, 0.3, -0.9]}
        rotation={[-0.15, 0, 0]}
        transform
        occlude
        style={{
          width: '220px',
          height: '140px',
          background: 'rgba(0, 0, 0, 0.95)',
          color: '#00f5ff',
          fontFamily: 'Courier New, monospace',
          fontSize: '9px',
          padding: '10px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 245, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
          lineHeight: '1.3'
        }}
      >
        <div>
          <div style={{ color: '#ff0080', marginBottom: '4px' }}>// Divya's Code</div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {currentText}
            <span style={{ 
              animation: 'blink 1s infinite',
              color: '#00f5ff' 
            }}>|</span>
          </pre>
        </div>
      </Html>

      {/* Keyboard */}
      <Box args={[2.6, 0.05, 1.6]} position={[0, -0.52, 0.1]}>
        <meshStandardMaterial 
          color="#333333" 
          metalness={0.3}
          roughness={0.7}
        />
      </Box>

      {/* Trackpad */}
      <Box args={[1, 0.02, 0.7]} position={[0, -0.5, 0.7]}>
        <meshStandardMaterial 
          color="#222222" 
          metalness={0.5}
          roughness={0.5}
        />
      </Box>

      {/* Screen Glow */}
      <pointLight 
        position={[0, 0.5, -0.5]} 
        intensity={0.8} 
        color="#00f5ff" 
        distance={4}
      />
      
      {/* Ambient lighting for the laptop */}
      <pointLight 
        position={[0, -0.3, 1]} 
        intensity={0.3} 
        color="#ffffff" 
        distance={3}
      />
    </group>
  );
};

// Main Component
const LaptopCode3D = ({ className = "", style = {} }) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6} 
          color="#ffffff" 
          castShadow
        />
        <pointLight 
          position={[-3, 3, 3]} 
          intensity={0.4} 
          color="#00f5ff" 
        />
        <pointLight 
          position={[3, -2, 2]} 
          intensity={0.3} 
          color="#ff0080" 
        />
        
        <Laptop3D position={[0, 0, 0]} />
      </Canvas>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LaptopCode3D;