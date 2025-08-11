import React, { useState, useEffect } from 'react';
import './SimpleLaptop.css';

const SimpleLaptop = ({ className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const codeText = `const developer = {
  name: 'Divya',
  skills: ['React', 'Node.js'],
  passion: 'Creating UIs'
};

console.log('Hello World!');`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (textIndex < codeText.length) {
        setCurrentText(codeText.slice(0, textIndex + 1));
        setTextIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentText('');
          setTextIndex(0);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [textIndex, codeText]);

  return (
    <div className={`simple-laptop-container ${className}`}>
      <div className="laptop">
        {/* Screen */}
        <div className="screen">
          <div className="screen-inner">
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="btn red"></span>
                  <span className="btn yellow"></span>
                  <span className="btn green"></span>
                </div>
                <span className="terminal-title">VS Code - portfolio.js</span>
              </div>
              <div className="terminal-body">
                <pre className="code">
{currentText}<span className="cursor">|</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* Base */}
        <div className="base">
          <div className="keyboard">
            {/* Keyboard rows */}
            <div className="key-row">
              {Array.from({length: 14}, (_, i) => (
                <div key={i} className="key small"></div>
              ))}
            </div>
            <div className="key-row">
              {Array.from({length: 13}, (_, i) => (
                <div key={i} className="key small"></div>
              ))}
            </div>
            <div className="key-row">
              {Array.from({length: 12}, (_, i) => (
                <div key={i} className="key small"></div>
              ))}
            </div>
            <div className="key-row">
              <div className="key large"></div>
            </div>
          </div>
          <div className="trackpad"></div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="floating-code">
        <span className="float-item">{'<>'}</span>
        <span className="float-item">{'{ }'}</span>
        <span className="float-item">{'( )'}</span>
        <span className="float-item">{'=>'}</span>
      </div>
    </div>
  );
};

export default SimpleLaptop;