import React, { Suspense } from 'react';
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
import DebugInfo from './components/DebugInfo/DebugInfo';

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    color: '#00f5ff',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#ff6b6b',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong!</h2>
          <p>Please refresh the page or contact support.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              backgroundColor: '#00f5ff',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
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
                  <DebugInfo />
                </>
              } />
              {/* Catch all route for SPA */}
              <Route path="*" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <EnhancedExperience />
                  <Contact />
                  <DebugInfo />
                </>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
