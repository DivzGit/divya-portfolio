import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const WorkingParticles = ({ count = 1000 }) => {
  const particlesRef = useRef();
  const { mouse, viewport } = useThree();
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors
      const colorIndex = Math.floor(Math.random() * 3);
      colors[i3] = colorIndex === 0 ? 1 : 0;     // R
      colors[i3 + 1] = colorIndex === 1 ? 1 : 0; // G  
      colors[i3 + 2] = colorIndex === 2 ? 1 : 0; // B
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Simple wave motion
      positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.01;
      positions[i3] += Math.cos(time + positions[i3 + 1] * 0.01) * 0.005;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default WorkingParticles;