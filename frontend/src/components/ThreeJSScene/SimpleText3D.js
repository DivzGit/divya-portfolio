import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const SimpleText3D = ({ text = "DIVYA", position = [0, 0, 0] }) => {
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle rotation
      textRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      textRef.current.scale.setScalar(hovered ? scale * 1.2 : scale);
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <Text
        ref={textRef}
        position={position}
        fontSize={2}
        color={hovered ? "#ff0080" : "#00f5ff"}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {text}
        <meshStandardMaterial
          color={hovered ? "#ff0080" : "#00f5ff"}
          emissive={hovered ? "#ff0080" : "#00f5ff"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Text>
    </Float>
  );
};

export default SimpleText3D;