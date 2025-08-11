import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const MorphingGeometry = ({ position, color, scale = 1 }) => {
  const meshRef = useRef();
  const geometryRef = useRef();
  
  // Create morphing geometry
  const geometries = useMemo(() => {
    const box = new THREE.BoxGeometry(1, 1, 1);
    const sphere = new THREE.SphereGeometry(0.7, 16, 16);
    const octahedron = new THREE.OctahedronGeometry(0.8);
    const torus = new THREE.TorusGeometry(0.6, 0.3, 8, 16);
    
    return [box, sphere, octahedron, torus];
  }, []);
  
  const [currentGeometry, setCurrentGeometry] = React.useState(0);
  const morphProgress = useRef(0);
  const morphSpeed = useRef(0.02);
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      // Rotation animation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      
      // Scale pulsing
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale * pulseScale);
      
      // Morphing logic
      morphProgress.current += morphSpeed.current;
      if (morphProgress.current >= 1) {
        morphProgress.current = 0;
        setCurrentGeometry((prev) => (prev + 1) % geometries.length);
      }
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} geometry={geometries[currentGeometry]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
          wireframe={Math.random() > 0.5}
        />
      </mesh>
    </Float>
  );
};

const WireframeTorusKnot = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });
  
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#8b00ff"
          emissive="#8b00ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef();
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    const colorPalette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#ff0080'),
      new THREE.Color('#39ff14'),
      new THREE.Color('#8b00ff')
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Positions
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Colors
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);
  
  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        positions[i3] += particles.velocities[i3];
        positions[i3 + 1] += particles.velocities[i3 + 1];
        positions[i3 + 2] += particles.velocities[i3 + 2];
        
        // Boundary check
        if (Math.abs(positions[i3]) > 10) particles.velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 10) particles.velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 10) particles.velocities[i3 + 2] *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  );
};

const ConnectedNodes = () => {
  const linesRef = useRef();
  const nodesRef = useRef();
  
  const nodePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push([
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ]);
    }
    return positions;
  }, []);
  
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = new THREE.Vector3(...nodePositions[i])
          .distanceTo(new THREE.Vector3(...nodePositions[j]));
        
        if (distance < 8) {
          lines.push(nodePositions[i], nodePositions[j]);
        }
      }
    }
    return lines;
  }, [nodePositions]);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });
  
  return (
    <group>
      {/* Connection Lines */}
      <line ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={new Float32Array(connections.flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </line>
      
      {/* Nodes */}
      {nodePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial 
            color="#ff0080" 
            emissive="#ff0080"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const MorphingShapes = () => {
  return (
    <group>
      {/* Main Morphing Shapes */}
      <MorphingGeometry position={[-5, 2, -3]} color="#00f5ff" scale={1.5} />
      <MorphingGeometry position={[3, -1, 2]} color="#ff0080" scale={1.2} />
      <MorphingGeometry position={[0, 3, -5]} color="#39ff14" scale={0.8} />
      <MorphingGeometry position={[-3, -2, 4]} color="#8b00ff" scale={1.3} />
      
      {/* Wireframe Torus Knots */}
      <WireframeTorusKnot position={[6, 0, -2]} />
      <WireframeTorusKnot position={[-4, 4, 3]} />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Connected Node Network */}
      <ConnectedNodes />
      
      {/* Additional Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={0.5} floatIntensity={3}>
          <mesh
            position={[
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            <dodecahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color={['#00f5ff', '#ff0080', '#39ff14', '#8b00ff'][Math.floor(Math.random() * 4)]}
              emissive={['#00f5ff', '#ff0080', '#39ff14', '#8b00ff'][Math.floor(Math.random() * 4)]}
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
              wireframe={Math.random() > 0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export default MorphingShapes;