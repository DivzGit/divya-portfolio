import React, { Suspense, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ComprehensiveScene from './ComprehensiveScene';
// import CodingSetup3D from './CodingSetup3D';
// import MorphingShapes from './MorphingShapes';
// import SimpleText3D from './SimpleText3D';
// import AdvancedParticles from '../ParticlesBackground/AdvancedParticles';
// import FloatingGeometry from './FloatingGeometry';
import './ThreeJSScene.css';

// Animated Geometric Shapes Component (Legacy)
const AnimatedShape = ({ position, color, geometry }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7}
          wireframe={Math.random() > 0.5}
          emissive={color}
          emissiveIntensity={0.2}
        />
        {geometry}
      </mesh>
    </Float>
  );
};

// Interactive Distortion Sphere
const DistortionSphere = () => {
  const sphereRef = useRef();
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={3}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#00f5ff"
          attach="material"
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.6}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

// Particle System
const ParticleField = () => {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={particlesPosition}
          count={particlesPosition.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff0080"
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Main 3D Scene
const Scene = () => {
  const geometries = [
    <boxGeometry args={[1, 1, 1]} />,
    <octahedronGeometry args={[1]} />,
    <tetrahedronGeometry args={[1]} />,
    <icosahedronGeometry args={[1]} />,
    <dodecahedronGeometry args={[1]} />,
  ];

  const colors = ['#00f5ff', '#ff0080', '#8b00ff', '#39ff14', '#ffff00'];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
      
      <DistortionSphere />
      <ParticleField />
      
      {/* Floating Geometric Shapes */}
      {Array.from({ length: 8 }, (_, i) => (
        <AnimatedShape
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          color={colors[i % colors.length]}
          geometry={geometries[i % geometries.length]}
        />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const ThreeJSScene = ({ 
  className = "", 
  showCodingSetup = false, 
  showText = false,
  showMorphing = true,
  interactive = false 
}) => {
  const [performanceMode, setPerformanceMode] = useState(false);

  // Auto-detect performance mode based on device
  React.useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency < 4;
    setPerformanceMode(isMobile || isLowEnd);
  }, []);

  return (
    <div className={`threejs-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: !performanceMode, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={performanceMode ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Advanced Lighting Setup */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff0080" />
          <pointLight position={[0, -10, 5]} intensity={0.6} color="#39ff14" />
          <spotLight
            position={[0, 8, 5]}
            angle={0.4}
            penumbra={1}
            intensity={1}
            color="#8b00ff"
            castShadow={!performanceMode}
          />
          
          {/* Stars Background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={performanceMode ? 1000 : 3000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5}
          />
          
          {/* Comprehensive 3D Scene with All Features */}
          <ComprehensiveScene 
            showCodingSetup={showCodingSetup}
            showText={showText}
            showMorphing={showMorphing}
            interactive={interactive}
          />
          
          {/* Environment - Using simple lighting instead of HDR */}
          <ambientLight intensity={0.2} />
          <hemisphereLight 
            skyColor="#87CEEB" 
            groundColor="#362d1d" 
            intensity={0.3} 
          />
          
          {/* Interactive Controls */}
          {interactive && !performanceMode && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              dampingFactor={0.05}
              enableDamping
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Performance Indicator */}
      {performanceMode && (
        <div className="performance-mode-indicator">
          <span>⚡ Performance Mode Active</span>
        </div>
      )}
    </div>
  );
};

export default ThreeJSScene;