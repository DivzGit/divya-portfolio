import React, { useState, useEffect } from 'react';
import './LaptopCodeCSS.css';

const LaptopCodeCSS = ({ className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const codeLines = [
    "const developer = {",
    "  name: 'Divya',", 
    "  skills: ['React', 'Node.js'],",
    "  passion: 'Creating UIs',",
    "  status: 'Always coding'",
    "};",
    "",
    "function buildAwesome() {",
    "  return code + creativity;",
    "}"
  ];

  const fullText = codeLines.join('\n');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (textIndex < fullText.length) {
          setCurrentText(fullText.slice(0, textIndex + 1));
          setTextIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (textIndex > 0) {
          setCurrentText(fullText.slice(0, textIndex - 1));
          setTextIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [textIndex, isDeleting, fullText]);

  return (
    <div className={`laptop-css-container ${className}`}>
      <div className="laptop-wrapper">
        {/* Laptop Screen */}
        <div className="laptop-screen">
          <div className="screen-frame">
            <div className="screen-content">
              <div className="code-editor">
                <div className="editor-header">
                  <div className="editor-buttons">
                    <span className="btn-close"></span>
                    <span className="btn-minimize"></span>
                    <span className="btn-maximize"></span>
                  </div>
                  <div className="editor-title">portfolio.js</div>
                </div>
                <div className="editor-body">
                  <pre className="code-text">
                    {currentText}
                    <span className="cursor-blink">|</span>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base */}
        <div className="laptop-base">
          <div className="keyboard">
            <div className="key-row">
              {Array.from({length: 12}, (_, i) => (
                <div key={i} className="key" style={{'--i': i}}></div>
              ))}
            </div>
            <div className="key-row">
              {Array.from({length: 11}, (_, i) => (
                <div key={i} className="key" style={{'--i': i + 12}}></div>
              ))}
            </div>
            <div className="key-row">
              {Array.from({length: 10}, (_, i) => (
                <div key={i} className="key" style={{'--i': i + 23}}></div>
              ))}
            </div>
            <div className="key-row">
              <div className="key spacebar" style={{'--i': 33}}></div>
            </div>
          </div>
          <div className="trackpad"></div>
        </div>
      </div>
      
      {/* Floating Code Particles */}
      <div className="code-particles">
        <span className="particle">{'<>'}</span>
        <span className="particle">{'{ }'}</span>
        <span className="particle">{'( )'}</span>
        <span className="particle">{'[ ]'}</span>
        <span className="particle">{'=>'}</span>
        <span className="particle">{'</'}</span>
      </div>
    </div>
  );
};

export default LaptopCodeCSS;