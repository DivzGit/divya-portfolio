import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import EnhancedExperience from './components/Experience/EnhancedExperience';
import Contact from './components/Contact/Contact';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import ThreeJSScene from './components/ThreeJSScene/ThreeJSScene';

function App() {
  return (
    <Router>
      <div className="App">
        <ParticlesBackground />
        <ThreeJSScene />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <EnhancedExperience />
              <Contact />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
