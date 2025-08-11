import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Sphere, Cylinder, Plane, Text3D } from '@react-three/drei';
import * as THREE from 'three';

const Monitor = ({ position, rotation }) => {
  const monitorRef = useRef();

  useFrame((state) => {
    if (monitorRef.current) {
      monitorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={monitorRef} position={position} rotation={rotation}>
      {/* Monitor Stand */}
      <Cylinder position={[0, -0.8, 0]} args={[0.3, 0.3, 0.2]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
      <Box position={[0, -0.4, 0]} args={[0.8, 0.1, 0.4]}>
        <meshStandardMaterial color="#444" />
      </Box>
      
      {/* Monitor Screen */}
      <Box position={[0, 0.2, 0]} args={[2, 1.2, 0.1]}>
        <meshStandardMaterial color="#111" />
      </Box>
      
      {/* Screen Glow */}
      <Plane position={[0, 0.2, 0.06]} args={[1.8, 1]} rotation={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#00f5ff" 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Code Lines on Screen */}
      {[...Array(8)].map((_, i) => (
        <Plane key={i} position={[-0.7, 0.5 - i * 0.12, 0.07]} args={[Math.random() * 1.2 + 0.3, 0.03]}>
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#ff0080" : "#39ff14"} 
            transparent 
            opacity={0.8}
          />
        </Plane>
      ))}
    </group>
  );
};

const Keyboard = ({ position }) => {
  const keyboardRef = useRef();
  
  useFrame((state) => {
    if (keyboardRef.current) {
      keyboardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <group ref={keyboardRef} position={position}>
      {/* Keyboard Base */}
      <Box args={[1.5, 0.05, 0.5]}>
        <meshStandardMaterial color="#222" />
      </Box>
      
      {/* Keys */}
      {[...Array(15)].map((_, i) => (
        <Box 
          key={i}
          position={[-0.6 + (i % 5) * 0.3, 0.03, -0.15 + Math.floor(i / 5) * 0.15]}
          args={[0.08, 0.02, 0.08]}
        >
          <meshStandardMaterial 
            color="#333" 
            emissive={i === 7 ? "#00f5ff" : "#000"}
            emissiveIntensity={i === 7 ? 0.2 : 0}
          />
        </Box>
      ))}
    </group>
  );
};

const Mouse = ({ position }) => (
  <group position={position}>
    <Sphere args={[0.08, 8, 6]} scale={[1, 0.6, 1.2]}>
      <meshStandardMaterial color="#333" />
    </Sphere>
    <Sphere args={[0.02, 4, 4]} position={[0, 0.05, 0.02]}>
      <meshStandardMaterial color="#00f5ff" />
    </Sphere>
  </group>
);

const CoffeCup = ({ position }) => {
  const cupRef = useRef();
  
  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={cupRef} position={position}>
      {/* Cup */}
      <Cylinder args={[0.08, 0.06, 0.15]}>
        <meshStandardMaterial color="#444" />
      </Cylinder>
      {/* Coffee */}
      <Cylinder position={[0, 0.06, 0]} args={[0.075, 0.075, 0.02]}>
        <meshStandardMaterial color="#4a2c2a" />
      </Cylinder>
      {/* Steam */}
      {[...Array(3)].map((_, i) => (
        <Sphere 
          key={i}
          position={[0, 0.15 + i * 0.05, 0]}
          args={[0.01, 4, 4]}
        >
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3 - i * 0.1}
          />
        </Sphere>
      ))}
    </group>
  );
};

const FloatingCode = () => {
  const codeElements = useMemo(() => {
    const elements = [];
    const codeSnippets = ['{ }', '< >', '( )', '[ ]', '=>', '||', '&&', '!=='];
    
    for (let i = 0; i < 12; i++) {
      elements.push({
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ],
        speed: 0.3 + Math.random() * 0.5,
        color: ['#00f5ff', '#ff0080', '#39ff14', '#8b00ff'][Math.floor(Math.random() * 4)]
      });
    }
    return elements;
  }, []);

  return (
    <>
      {codeElements.map((element) => (
        <Float
          key={element.id}
          speed={element.speed}
          rotationIntensity={0.3}
          floatIntensity={0.8}
        >
          <Text3D
            position={element.position}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.15}
            height={0.02}
            curveSegments={12}
          >
            {element.text}
            <meshStandardMaterial 
              color={element.color}
              emissive={element.color}
              emissiveIntensity={0.2}
            />
          </Text3D>
        </Float>
      ))}
    </>
  );
};

const CodingSetup3D = () => {
  return (
    <group>
      {/* Main Monitor */}
      <Monitor position={[0, 0, 0]} rotation={[0, 0, 0]} />
      
      {/* Secondary Monitor */}
      <Monitor position={[2.5, 0.3, 0.5]} rotation={[0, -0.3, 0]} />
      
      {/* Desk Surface */}
      <Box position={[0, -1, 0]} args={[6, 0.1, 3]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Keyboard */}
      <Keyboard position={[0, -0.9, 0.8]} />
      
      {/* Mouse */}
      <Mouse position={[0.8, -0.85, 0.6]} />
      
      {/* Coffee Cup */}
      <CoffeCup position={[-1.5, -0.8, 0.5]} />
      
      {/* Books Stack */}
      <group position={[-2, -0.85, -0.5]}>
        <Box args={[0.3, 0.05, 0.4]}>
          <meshStandardMaterial color="#ff0080" />
        </Box>
        <Box position={[0, 0.05, 0]} args={[0.28, 0.05, 0.38]}>
          <meshStandardMaterial color="#00f5ff" />
        </Box>
        <Box position={[0, 0.1, 0]} args={[0.26, 0.05, 0.36]}>
          <meshStandardMaterial color="#39ff14" />
        </Box>
      </group>
      
      {/* Lamp */}
      <group position={[2, -0.5, -1]}>
        <Cylinder position={[0, 0, 0]} args={[0.05, 0.05, 0.8]}>
          <meshStandardMaterial color="#333" />
        </Cylinder>
        <Sphere position={[0, 0.5, 0]} args={[0.15, 8, 6]}>
          <meshStandardMaterial color="#444" emissive="#ffff99" emissiveIntensity={0.3} />
        </Sphere>
      </group>
      
      {/* Floating Code Elements */}
      <FloatingCode />
      
      {/* Ambient Particles */}
      {[...Array(20)].map((_, i) => (
        <Float
          key={i}
          speed={1.5 + Math.random()}
          rotationIntensity={0.1}
          floatIntensity={2}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            ]}
            args={[0.02, 4, 4]}
          >
            <meshBasicMaterial 
              color={['#00f5ff', '#ff0080', '#39ff14'][Math.floor(Math.random() * 3)]}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

export default CodingSetup3D;