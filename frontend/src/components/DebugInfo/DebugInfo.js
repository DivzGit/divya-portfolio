import React, { useEffect, useState } from 'react';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkSections = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const info = {};
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        info[sectionId] = {
          exists: !!element,
          visible: element ? element.offsetHeight > 0 : false,
          position: element ? element.getBoundingClientRect() : null
        };
      });
      
      setDebugInfo(info);
    };

    // Check immediately and after a delay
    checkSections();
    setTimeout(checkSections, 2000);
  }, []);

  // Only show in development or when there are issues
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00f5ff',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Debug Info:</h4>
      {Object.entries(debugInfo).map(([section, info]) => (
        <div key={section} style={{ marginBottom: '5px' }}>
          <strong>{section}:</strong> 
          {info.exists ? '✅' : '❌'} exists, 
          {info.visible ? '👁️' : '🙈'} visible
        </div>
      ))}
    </div>
  );
};

export default DebugInfo;