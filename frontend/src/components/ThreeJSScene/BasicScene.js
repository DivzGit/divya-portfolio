import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Sphere } from '@react-three/drei';

const RotatingBox = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} position={position} args={[1, 1, 1]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
    </Float>
  );
};

const BasicScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
      
      <RotatingBox position={[-2, 0, 0]} color="#00f5ff" />
      <RotatingBox position={[2, 0, 0]} color="#ff0080" />
      <RotatingBox position={[0, 2, 0]} color="#39ff14" />
      <RotatingBox position={[0, -2, 0]} color="#8b00ff" />
      
      <Sphere position={[0, 0, 0]} args={[0.5, 16, 16]}>
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00"
          emissiveIntensity={0.3}
          wireframe
        />
      </Sphere>
    </>
  );
};

export default BasicScene;