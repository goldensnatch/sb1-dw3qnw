import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const InteractiveDotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, z: 0 });
  const particlesRef = useRef<any[]>([]);

  const theme = {
    dark: {
      background: '#0f172a', // Slate 900
      dots: 'rgba(148, 163, 184, 0.4)', // Slate 400
      grid: 'rgba(148, 163, 184, 0.15)',
      gridMajor: 'rgba(148, 163, 184, 0.25)',
      interactive: '#0ea5e9' // Sky 500
    },
    light: {
      background: '#f8fafc', // Slate 50
      dots: 'rgba(71, 85, 105, 0.3)', // Slate 600
      grid: 'rgba(71, 85, 105, 0.1)',
      gridMajor: 'rgba(71, 85, 105, 0.2)',
      interactive: '#0284c7' // Sky 600
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ... rest of the useEffect implementation ...
    
    return () => {
      // Cleanup
    };
  }, [isDarkMode]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 transition-colors duration-300"
      />
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm
                 hover:bg-opacity-30 transition-all duration-300 z-10"
        style={{
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
      >
        {isDarkMode ? 
          <Sun className="w-6 h-6 text-white" /> :
          <Moon className="w-6 h-6 text-black" />
        }
      </button>
    </div>
  );
};

export default InteractiveDotGrid;