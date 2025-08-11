import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveTextChar = ({ char, position, index, isHovered, mousePosition }) => {
  const meshRef = useRef();
  const initialPosition = useMemo(() => position, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Wave animation
      const waveOffset = Math.sin(time * 2 + index * 0.3) * 0.2;
      meshRef.current.position.y = initialPosition[1] + waveOffset;
      
      // Interactive hover effect
      if (isHovered && mousePosition) {
        const distance = new THREE.Vector3(...position)
          .distanceTo(new THREE.Vector3(mousePosition.x * 5, mousePosition.y * 3, 0));
        
        const influence = Math.max(0, 3 - distance);
        const pushX = (position[0] - mousePosition.x * 5) * influence * 0.1;
        const pushY = (position[1] - mousePosition.y * 3) * influence * 0.1;
        
        meshRef.current.position.x = initialPosition[0] + pushX;
        meshRef.current.position.y += pushY;
        meshRef.current.rotation.z = pushX * 0.1;
      } else {
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x, 
          initialPosition[0], 
          0.1
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z, 
          0, 
          0.1
        );
      }
      
      // Floating rotation
      meshRef.current.rotation.x = Math.sin(time + index) * 0.1;
    }
  });
  
  return (
    <Text3D
      ref={meshRef}
      position={position}
      font="/fonts/helvetiker_bold.typeface.json"
      size={0.8}
      height={0.15}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
    >
      {char}
      <meshStandardMaterial
        color={isHovered ? "#ff0080" : "#00f5ff"}
        emissive={isHovered ? "#ff0080" : "#00f5ff"}
        emissiveIntensity={isHovered ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </Text3D>
  );
};

const GlitchText = ({ text, position }) => {
  const groupRef = useRef();
  const [glitchActive, setGlitchActive] = useState(false);
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  
  useFrame((state) => {
    if (groupRef.current) {
      if (Math.random() > 0.98) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
      }
      
      if (glitchActive) {
        groupRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.1;
        groupRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.1;
      } else {
        groupRef.current.position.x = THREE.MathUtils.lerp(
          groupRef.current.position.x,
          position[0],
          0.2
        );
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          position[1],
          0.2
        );
      }
    }
  });
  
  const displayText = glitchActive 
    ? text.split('').map(char => 
        Math.random() > 0.7 
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char
      ).join('')
    : text;
  
  return (
    <group ref={groupRef}>
      <Text3D
        position={position}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
      >
        {displayText}
        <meshStandardMaterial
          color={glitchActive ? "#ff0080" : "#39ff14"}
          emissive={glitchActive ? "#ff0080" : "#39ff14"}
          emissiveIntensity={glitchActive ? 0.8 : 0.3}
        />
      </Text3D>
    </group>
  );
};

const MatrixRainText = ({ position }) => {
  const groupRef = useRef();
  const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  const [rainChars, setRainChars] = useState([]);
  
  React.useEffect(() => {
    const columns = 10;
    const rows = 15;
    const chars_array = [];
    
    for (let i = 0; i < columns * rows; i++) {
      chars_array.push({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random(),
        speed: 0.02 + Math.random() * 0.03,
        position: [
          (i % columns - columns / 2) * 0.3,
          (Math.floor(i / columns) - rows / 2) * 0.4,
          0
        ]
      });
    }
    
    setRainChars(chars_array);
  }, []);
  
  useFrame(() => {
    if (Math.random() > 0.95) {
      setRainChars(prev => prev.map(item => ({
        ...item,
        char: Math.random() > 0.7 
          ? chars[Math.floor(Math.random() * chars.length)]
          : item.char,
        opacity: Math.random() > 0.8 ? Math.random() : item.opacity
      })));
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {rainChars.map((item, index) => (
        <Text3D
          key={index}
          position={item.position}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.15}
          height={0.02}
        >
          {item.char}
          <meshBasicMaterial
            color="#39ff14"
            transparent
            opacity={item.opacity}
          />
        </Text3D>
      ))}
    </group>
  );
};

const HolographicText = ({ text, position }) => {
  const groupRef = useRef();
  const [layers] = useState(5);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {[...Array(layers)].map((_, i) => (
        <Text3D
          key={i}
          position={[0, 0, i * 0.05]}
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.6}
          height={0.02}
          curveSegments={12}
        >
          {text}
          <meshBasicMaterial
            color={['#00f5ff', '#0080ff', '#0040ff', '#002080', '#001040'][i]}
            transparent
            opacity={1 - (i * 0.15)}
          />
        </Text3D>
      ))}
    </group>
  );
};

const Interactive3DText = ({ mainText = "DIVYA", subText = "SOFTWARE ENGINEER" }) => {
  const { mouse } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  
  const mainTextChars = mainText.split('');
  const charPositions = useMemo(() => {
    return mainTextChars.map((_, index) => [
      (index - mainTextChars.length / 2) * 0.9,
      0,
      0
    ]);
  }, [mainTextChars]);
  
  return (
    <group
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Main Interactive Text */}
      <group position={[0, 2, 0]}>
        {mainTextChars.map((char, index) => (
          <InteractiveTextChar
            key={index}
            char={char}
            position={charPositions[index]}
            index={index}
            isHovered={isHovered}
            mousePosition={mouse}
          />
        ))}
      </group>
      
      {/* Subtitle with Glitch Effect */}
      <GlitchText 
        text={subText}
        position={[0, 0.5, 0]}
      />
      
      {/* Matrix Rain Effect */}
      <MatrixRainText position={[-8, 0, -5]} />
      <MatrixRainText position={[8, 0, -5]} />
      
      {/* Holographic Text */}
      <HolographicText 
        text="3.5+ YEARS"
        position={[-4, -2, 0]}
      />
      
      {/* Floating Tech Words */}
      {['REACT', 'NODE', 'JS', 'CSS', 'API'].map((word, index) => (
        <Float
          key={word}
          speed={2 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={2}
        >
          <Text3D
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.3}
            height={0.05}
          >
            {word}
            <meshStandardMaterial
              color={['#00f5ff', '#ff0080', '#39ff14', '#8b00ff'][index % 4]}
              emissive={['#00f5ff', '#ff0080', '#39ff14', '#8b00ff'][index % 4]}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </Text3D>
        </Float>
      ))}
      
      {/* Wireframe Text Outlines */}
      <Text3D
        position={[0, 2, -0.5]}
        font="/fonts/helvetiker_bold.typeface.json"
        size={0.85}
        height={0.2}
      >
        {mainText}
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Text3D>
    </group>
  );
};

export default Interactive3DText;