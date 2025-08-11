import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveShape = ({ 
  geometry, 
  position, 
  color, 
  scale = 1, 
  rotationSpeed = 1,
  hoverScale = 1.5,
  emissiveIntensity = 0.2 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { mouse, viewport } = useThree();
  
  const initialPosition = useMemo(() => position, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Base rotation
      meshRef.current.rotation.x = time * rotationSpeed * 0.3;
      meshRef.current.rotation.y = time * rotationSpeed * 0.2;
      meshRef.current.rotation.z = time * rotationSpeed * 0.1;
      
      // Mouse interaction - attraction/repulsion
      const mouseX = mouse.x * viewport.width / 2;
      const mouseY = mouse.y * viewport.height / 2;
      
      const dx = initialPosition[0] - mouseX;
      const dy = initialPosition[1] - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) {
        const force = (3 - distance) / 3;
        const angle = Math.atan2(dy, dx);
        
        // Gentle attraction to mouse
        meshRef.current.position.x = initialPosition[0] - Math.cos(angle) * force * 0.5;
        meshRef.current.position.y = initialPosition[1] - Math.sin(angle) * force * 0.5;
        
        // Increase rotation speed when near mouse
        meshRef.current.rotation.x += force * 0.1;
        meshRef.current.rotation.y += force * 0.1;
      } else {
        // Return to original position
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
          initialPosition[0],
          0.02
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          initialPosition[1],
          0.02
        );
      }
      
      // Hover effects
      const targetScale = hovered ? hoverScale : (clicked ? 0.8 : 1);
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale * scale, targetScale * scale, targetScale * scale),
        0.1
      );
      
      // Pulsing effect
      const pulse = Math.sin(time * 3) * 0.1 + 1;
      if (hovered) {
        meshRef.current.scale.multiplyScalar(pulse);
      }
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        geometry={geometry}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? emissiveIntensity * 2 : emissiveIntensity}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          wireframe={clicked}
        />
      </mesh>
    </Float>
  );
};

const MorphingShape = ({ position, colors, scale = 1 }) => {
  const meshRef = useRef();
  const [currentGeometry, setCurrentGeometry] = useState(0);
  const [morphProgress, setMorphProgress] = useState(0);
  
  const geometries = useMemo(() => [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.7, 16, 16),
    new THREE.OctahedronGeometry(0.8),
    new THREE.TetrahedronGeometry(0.9),
    new THREE.DodecahedronGeometry(0.7),
    new THREE.IcosahedronGeometry(0.8)
  ], []);
  
  const [currentColor, setCurrentColor] = useState(0);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotation
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.2;
      
      // Morphing logic
      setMorphProgress(prev => {
        const newProgress = prev + 0.01;
        if (newProgress >= 1) {
          setCurrentGeometry(prev => (prev + 1) % geometries.length);
          setCurrentColor(prev => (prev + 1) % colors.length);
          return 0;
        }
        return newProgress;
      });
      
      // Scale animation
      const scaleMultiplier = 1 + Math.sin(time * 2) * 0.2;
      meshRef.current.scale.setScalar(scale * scaleMultiplier);
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={3}>
      <mesh
        ref={meshRef}
        position={position}
        geometry={geometries[currentGeometry]}
      >
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

const ParticleTrail = ({ position, color }) => {
  const trailRef = useRef();
  const trailLength = 20;
  
  const trailPositions = useMemo(() => {
    const positions = new Float32Array(trailLength * 3);
    for (let i = 0; i < trailLength; i++) {
      const i3 = i * 3;
      positions[i3] = position[0];
      positions[i3 + 1] = position[1];
      positions[i3 + 2] = position[2];
    }
    return positions;
  }, [position]);
  
  const trailOpacities = useMemo(() => {
    const opacities = new Float32Array(trailLength);
    for (let i = 0; i < trailLength; i++) {
      opacities[i] = (i / trailLength) * 0.5;
    }
    return opacities;
  }, []);
  
  useFrame((state) => {
    if (trailRef.current) {
      const time = state.clock.elapsedTime;
      const positions = trailRef.current.geometry.attributes.position.array;
      
      // Update trail positions
      for (let i = trailLength - 1; i > 0; i--) {
        const i3 = i * 3;
        const prev3 = (i - 1) * 3;
        positions[i3] = positions[prev3];
        positions[i3 + 1] = positions[prev3 + 1];
        positions[i3 + 2] = positions[prev3 + 2];
      }
      
      // Update head position with circular motion
      positions[0] = position[0] + Math.cos(time * 2) * 2;
      positions[1] = position[1] + Math.sin(time * 2) * 2;
      positions[2] = position[2] + Math.sin(time * 3) * 1;
      
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={trailRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={trailLength}
          array={trailPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={trailLength}
          array={trailOpacities}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.1}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FloatingGeometry = ({ count = 15, interactive = true }) => {
  const geometries = useMemo(() => [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.7, 16, 16),
    new THREE.OctahedronGeometry(0.8),
    new THREE.TetrahedronGeometry(0.9),
    new THREE.ConeGeometry(0.6, 1.2, 8),
    new THREE.CylinderGeometry(0.5, 0.5, 1, 8),
    new THREE.TorusGeometry(0.6, 0.3, 8, 16),
    new THREE.DodecahedronGeometry(0.7),
    new THREE.IcosahedronGeometry(0.8),
    new THREE.TorusKnotGeometry(0.5, 0.2, 64, 8)
  ], []);
  
  const colors = useMemo(() => [
    '#00f5ff', // Cyan
    '#ff0080', // Pink
    '#39ff14', // Green
    '#8b00ff', // Purple
    '#ffff00', // Yellow
    '#ff4500', // Orange
    '#00ffff', // Aqua
    '#ff1493', // Deep Pink
    '#7fff00', // Chartreuse
    '#ff6347'  // Tomato
  ], []);
  
  const shapes = useMemo(() => {
    const shapeArray = [];
    for (let i = 0; i < count; i++) {
      shapeArray.push({
        id: i,
        geometry: geometries[Math.floor(Math.random() * geometries.length)],
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.5 + Math.random() * 1,
        rotationSpeed: 0.5 + Math.random() * 1.5,
        hoverScale: 1.2 + Math.random() * 0.8,
        emissiveIntensity: 0.1 + Math.random() * 0.3
      });
    }
    return shapeArray;
  }, [count, geometries, colors]);
  
  return (
    <group>
      {/* Interactive Shapes */}
      {shapes.slice(0, Math.floor(count * 0.7)).map((shape) => (
        <InteractiveShape
          key={shape.id}
          geometry={shape.geometry}
          position={shape.position}
          color={shape.color}
          scale={shape.scale}
          rotationSpeed={shape.rotationSpeed}
          hoverScale={shape.hoverScale}
          emissiveIntensity={shape.emissiveIntensity}
        />
      ))}
      
      {/* Morphing Shapes */}
      {shapes.slice(Math.floor(count * 0.7), Math.floor(count * 0.9)).map((shape) => (
        <MorphingShape
          key={`morph-${shape.id}`}
          position={shape.position}
          colors={colors}
          scale={shape.scale}
        />
      ))}
      
      {/* Particle Trails */}
      {shapes.slice(Math.floor(count * 0.9)).map((shape) => (
        <ParticleTrail
          key={`trail-${shape.id}`}
          position={shape.position}
          color={shape.color}
        />
      ))}
    </group>
  );
};

export default FloatingGeometry;