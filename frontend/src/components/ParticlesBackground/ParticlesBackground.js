import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import './ParticlesBackground.css';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#00f5ff", "#ff0080", "#8b00ff", "#39ff14"],
      },
      links: {
        color: "#00f5ff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.1,
        },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 0.1,
        },
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        polygon: {
          sides: 6,
        },
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 20,
          minimumValue: 0.1,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />
    </div>
  );
};

export default ParticlesBackground;