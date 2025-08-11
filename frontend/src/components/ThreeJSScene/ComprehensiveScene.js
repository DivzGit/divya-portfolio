import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Box, Sphere, Octahedron, Text } from '@react-three/drei';
import * as THREE from 'three';

// Interactive Floating Shape
const InteractiveShape = ({ position, geometry, color, scale = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Base rotation
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
      
      // Mouse interaction
      const mouseX = mouse.x * viewport.width / 2;
      const mouseY = mouse.y * viewport.height / 2;
      
      const dx = position[0] - mouseX;
      const dy = position[1] - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) {
        const force = (3 - distance) / 3;
        meshRef.current.position.x = position[0] + Math.cos(Math.atan2(dy, dx)) * force * 0.5;
        meshRef.current.position.y = position[1] + Math.sin(Math.atan2(dy, dx)) * force * 0.5;
      } else {
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0], 0.02);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.02);
      }
      
      // Scale on hover
      const targetScale = hovered ? scale * 1.5 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  
  const GeometryComponent = geometry;
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <GeometryComponent />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={hovered ? 0.9 : 0.7}
        />
      </mesh>
    </Float>
  );
};

// Morphing Shape
const MorphingShape = ({ position, colors }) => {
  const meshRef = useRef();
  const [currentGeometry, setCurrentGeometry] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  
  const geometries = [
    () => <boxGeometry args={[1, 1, 1]} />,
    () => <sphereGeometry args={[0.7, 16, 16]} />,
    () => <octahedronGeometry args={[0.8]} />,
    () => <tetrahedronGeometry args={[0.9]} />
  ];
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotation
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      
      // Morphing logic (change geometry every 3 seconds)
      if (Math.floor(time) % 3 === 0 && Math.floor(time * 10) % 10 === 0) {
        setCurrentGeometry(prev => (prev + 1) % geometries.length);
        setCurrentColor(prev => (prev + 1) % colors.length);
      }
      
      // Scale animation
      const scale = 1 + Math.sin(time * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });
  
  const CurrentGeometry = geometries[currentGeometry];
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={3}>
      <mesh ref={meshRef} position={position}>
        <CurrentGeometry />
        <meshStandardMaterial
          color={colors[currentColor]}
          emissive={colors[currentColor]}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Simple 3D Computer Setup
const Simple3DComputer = ({ position }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={0.5}>
      {/* Monitor */}
      <Box position={[0, 0.2, 0]} args={[2, 1.2, 0.1]}>
        <meshStandardMaterial color="#111" />
      </Box>
      {/* Screen glow */}
      <Box position={[0, 0.2, 0.01]} args={[1.8, 1, 0.01]}>
        <meshStandardMaterial 
          color="#00f5ff" 
          emissive="#00f5ff" 
          emissiveIntensity={0.3}
        />
      </Box>
      {/* Stand */}
      <Box position={[0, -0.4, 0]} args={[0.8, 0.1, 0.4]}>
        <meshStandardMaterial color="#444" />
      </Box>
      {/* Keyboard */}
      <Box position={[0, -0.9, 0.8]} args={[1.5, 0.05, 0.5]}>
        <meshStandardMaterial color="#222" />
      </Box>
      {/* Coffee Cup */}
      <group position={[-1.5, -0.8, 0.5]}>
        <Sphere args={[0.08, 8, 6]} scale={[1, 1.5, 1]}>
          <meshStandardMaterial color="#4a2c2a" />
        </Sphere>
        {/* Steam particles */}
        <Sphere position={[0, 0.15, 0]} args={[0.01, 4, 4]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Sphere>
      </group>
    </group>
  );
};

// Interactive 3D Text
const Interactive3DText = ({ text, position }) => {
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;
      
      // Wave animation
      textRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
      textRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      
      // Scale on hover
      const scale = hovered ? 1.2 : 1;
      textRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <Text
        ref={textRef}
        position={position}
        fontSize={1.5}
        color={hovered ? "#ff0080" : "#00f5ff"}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {text}
      </Text>
    </Float>
  );
};

// Particle System
const ParticleSystem = ({ count = 1000 }) => {
  const particlesRef = useRef();
  const { mouse, viewport } = useThree();
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorPalette = [
      [0, 0.96, 1],      // Cyan
      [1, 0, 0.5],       // Pink
      [0.22, 1, 0.08],   // Green
      [0.55, 0, 1],      // Purple
      [1, 1, 0]          // Yellow
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];
      
      sizes[i] = Math.random() * 3 + 1;
    }
    
    return { positions, colors, sizes };
  }, [count]);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const colors = particlesRef.current.geometry.attributes.color.array;
    const time = state.clock.elapsedTime;
    
    // Mouse position
    const mouseX = mouse.x * viewport.width / 2;
    const mouseY = mouse.y * viewport.height / 2;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Wave motion
      positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.01;
      positions[i3] += Math.cos(time + positions[i3 + 1] * 0.01) * 0.005;
      
      // Mouse interaction
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 2) {
        const force = (2 - distance) / 2;
        const angle = Math.atan2(dy, dx);
        
        positions[i3] += Math.cos(angle) * force * 0.1;
        positions[i3 + 1] += Math.sin(angle) * force * 0.1;
        
        // Brighten colors
        colors[i3] = Math.min(1, colors[i3] * (1 + force));
        colors[i3 + 1] = Math.min(1, colors[i3 + 1] * (1 + force));
        colors[i3 + 2] = Math.min(1, colors[i3 + 2] * (1 + force));
      }
      
      // Boundary wrapping
      if (positions[i3] > 10) positions[i3] = -10;
      if (positions[i3] < -10) positions[i3] = 10;
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particleData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main Comprehensive Scene
const ComprehensiveScene = ({ 
  showCodingSetup = false, 
  showText = false, 
  showMorphing = true, 
  interactive = false 
}) => {
  const colors = ['#00f5ff', '#ff0080', '#8b00ff', '#39ff14', '#ffff00'];
  
  const shapes = useMemo(() => {
    const geometries = [
      () => <boxGeometry args={[1, 1, 1]} />,
      () => <sphereGeometry args={[0.7, 16, 16]} />,
      () => <octahedronGeometry args={[0.8]} />,
      () => <tetrahedronGeometry args={[0.9]} />
    ];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ],
      geometry: geometries[Math.floor(Math.random() * geometries.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff0080" />
      <pointLight position={[0, -10, 5]} intensity={0.6} color="#39ff14" />
      
      {/* Particle System */}
      <ParticleSystem count={800} />
      
      {/* Interactive Floating Shapes */}
      {shapes.slice(0, 6).map((shape) => (
        <InteractiveShape
          key={shape.id}
          position={shape.position}
          geometry={shape.geometry}
          color={shape.color}
          scale={shape.scale}
        />
      ))}
      
      {/* Morphing Shapes */}
      {showMorphing && shapes.slice(6, 8).map((shape) => (
        <MorphingShape
          key={`morph-${shape.id}`}
          position={shape.position}
          colors={colors}
        />
      ))}
      
      {/* 3D Computer Setup */}
      {showCodingSetup && (
        <Simple3DComputer position={[0, -2, -3]} />
      )}
      
      {/* Interactive 3D Text */}
      {showText && (
        <Interactive3DText text="DIVYA" position={[0, 0, 2]} />
      )}
    </>
  );
};

export default ComprehensiveScene;