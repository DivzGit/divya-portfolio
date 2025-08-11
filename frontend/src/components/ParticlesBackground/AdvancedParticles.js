import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const AdvancedParticles = ({ 
  count = 2000, 
  interactive = true, 
  connectionDistance = 150,
  mouseInfluence = 200 
}) => {
  const particlesRef = useRef();
  const linesRef = useRef();
  const { mouse, viewport } = useThree();
  
  // Particle system data
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const originalPositions = new Float32Array(count * 3);
    
    const colorPalette = [
      new THREE.Color('#00f5ff'), // Cyan
      new THREE.Color('#ff0080'), // Pink
      new THREE.Color('#39ff14'), // Green
      new THREE.Color('#8b00ff'), // Purple
      new THREE.Color('#ffff00'), // Yellow
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in 3D space
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Store original positions for reset
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Random colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = Math.random() * 3 + 1;
    }
    
    return { positions, velocities, colors, sizes, originalPositions };
  }, [count, viewport]);
  
  // Connection lines data
  const connectionData = useMemo(() => {
    const maxConnections = Math.min(count * 2, 4000); // Limit connections for performance
    const linePositions = new Float32Array(maxConnections * 6); // 2 points per line, 3 coords per point
    const lineColors = new Float32Array(maxConnections * 6); // 2 colors per line, 3 components per color
    
    return { linePositions, lineColors, maxConnections };
  }, [count]);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const colors = particlesRef.current.geometry.attributes.color.array;
    const sizes = particlesRef.current.geometry.attributes.size.array;
    
    // Mouse position in world coordinates
    const mouseX = mouse.x * viewport.width / 2;
    const mouseY = mouse.y * viewport.height / 2;
    
    let connectionCount = 0;
    const { linePositions, lineColors, maxConnections } = connectionData;
    
    // Update particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply velocities
      positions[i3] += particleData.velocities[i3];
      positions[i3 + 1] += particleData.velocities[i3 + 1];
      positions[i3 + 2] += particleData.velocities[i3 + 2];
      
      // Boundary wrapping
      if (positions[i3] > viewport.width) positions[i3] = -viewport.width;
      if (positions[i3] < -viewport.width) positions[i3] = viewport.width;
      if (positions[i3 + 1] > viewport.height) positions[i3 + 1] = -viewport.height;
      if (positions[i3 + 1] < -viewport.height) positions[i3 + 1] = viewport.height;
      if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
      if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;
      
      // Mouse interaction
      if (interactive) {
        const dx = positions[i3] - mouseX;
        const dy = positions[i3 + 1] - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          const angle = Math.atan2(dy, dx);
          
          // Repel particles from mouse
          positions[i3] += Math.cos(angle) * force * 2;
          positions[i3 + 1] += Math.sin(angle) * force * 2;
          
          // Change color intensity based on proximity
          const intensity = 1 + force * 2;
          colors[i3] = particleData.colors[i3] * intensity;
          colors[i3 + 1] = particleData.colors[i3 + 1] * intensity;
          colors[i3 + 2] = particleData.colors[i3 + 2] * intensity;
          
          // Increase size
          sizes[i] = particleData.sizes[i] * (1 + force);
        } else {
          // Reset to original colors and sizes
          colors[i3] = particleData.colors[i3];
          colors[i3 + 1] = particleData.colors[i3 + 1];
          colors[i3 + 2] = particleData.colors[i3 + 2];
          sizes[i] = particleData.sizes[i];
        }
      }
      
      // Wave motion
      const time = state.clock.elapsedTime;
      positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.1;
      positions[i3] += Math.cos(time + positions[i3 + 1] * 0.01) * 0.05;
      
      // Create connections to nearby particles
      if (connectionCount < maxConnections - 1) {
        for (let j = i + 1; j < count && connectionCount < maxConnections - 1; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < connectionDistance) {
            const lineIndex = connectionCount * 6;
            
            // Line start point
            linePositions[lineIndex] = positions[i3];
            linePositions[lineIndex + 1] = positions[i3 + 1];
            linePositions[lineIndex + 2] = positions[i3 + 2];
            
            // Line end point
            linePositions[lineIndex + 3] = positions[j3];
            linePositions[lineIndex + 4] = positions[j3 + 1];
            linePositions[lineIndex + 5] = positions[j3 + 2];
            
            // Line colors (fade based on distance)
            const opacity = 1 - (distance / connectionDistance);
            lineColors[lineIndex] = colors[i3] * opacity;
            lineColors[lineIndex + 1] = colors[i3 + 1] * opacity;
            lineColors[lineIndex + 2] = colors[i3 + 2] * opacity;
            lineColors[lineIndex + 3] = colors[j3] * opacity;
            lineColors[lineIndex + 4] = colors[j3 + 1] * opacity;
            lineColors[lineIndex + 5] = colors[j3 + 2] * opacity;
            
            connectionCount++;
          }
        }
      }
    }
    
    // Update geometry attributes
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;
    
    // Update connection lines
    if (linesRef.current && connectionCount > 0) {
      linesRef.current.geometry.setDrawRange(0, connectionCount * 2);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {/* Particle Points */}
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
          size={2}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connectionData.maxConnections * 2}
            array={connectionData.linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connectionData.maxConnections * 2}
            array={connectionData.lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default AdvancedParticles;