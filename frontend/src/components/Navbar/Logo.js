import React from 'react';
import { motion } from 'framer-motion';
import './Logo.css';

const Logo = ({ className = "" }) => {
  return (
    <motion.div 
      className={`creative-logo ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="logo-container">
        {/* Outer Ring */}
        <motion.div 
          className="logo-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="ring-dots">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="dot"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-25px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Logo Content */}
        <div className="logo-content">
          {/* Letter D */}
          <motion.div 
            className="letter letter-d"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <svg viewBox="0 0 50 60" className="letter-svg">
              <defs>
                <linearGradient id="gradientD" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="50%" stopColor="#0080ff" />
                  <stop offset="100%" stopColor="#8b00ff" />
                </linearGradient>
                <filter id="glowD">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M5 10 L5 50 L25 50 C35 50 40 40 40 30 C40 20 35 10 25 10 Z M15 20 L25 20 C28 20 30 22 30 30 C30 38 28 40 25 40 L15 40 Z"
                fill="url(#gradientD)"
                filter="url(#glowD)"
                className="letter-path"
              />
            </svg>
          </motion.div>

          {/* Connecting Element */}
          <motion.div 
            className="connector"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />

          {/* Letter P */}
          <motion.div 
            className="letter letter-p"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <svg viewBox="0 0 50 60" className="letter-svg">
              <defs>
                <linearGradient id="gradientP" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0080" />
                  <stop offset="50%" stopColor="#ff4040" />
                  <stop offset="100%" stopColor="#ffb000" />
                </linearGradient>
                <filter id="glowP">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M5 10 L5 50 M5 10 L25 10 C35 10 40 15 40 25 C40 35 35 30 25 30 L5 30"
                fill="none"
                stroke="url(#gradientP)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glowP)"
                className="letter-path"
              />
            </svg>
          </motion.div>
        </div>

        {/* Animated Particles */}
        <div className="logo-particles">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [-20, -40, -20],
                x: [0, Math.sin(i) * 10, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 10}%`,
                background: i % 2 === 0 ? '#00f5ff' : '#ff0080'
              }}
            />
          ))}
        </div>

        {/* Pulse Effect */}
        <motion.div
          className="pulse-ring"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Logo Text */}
      <motion.div 
        className="logo-text-container"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="logo-main-text">Divya Priya</span>
        <span className="logo-sub-text">Portfolio</span>
      </motion.div>
    </motion.div>
  );
};

export default Logo;