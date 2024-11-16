import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { ProjectStructure } from '../types/project';

interface ProjectModelerProps {
  structures: ProjectStructure[];
}

const ProjectModeler: React.FC<ProjectModelerProps> = ({ structures }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
  } | null>(null);

  // Scene setup useEffect remains the same...

  // Update scene when structures change
  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene } = sceneRef.current;

    // Clear existing structures
    scene.children = scene.children.filter(child => 
      child instanceof THREE.Light || child instanceof THREE.GridHelper
    );

    // Add new structures
    structures.forEach(structure => {
      if (!structure.visible) return;

      switch (structure.type) {
        case 'pergola':
          createPergola(scene, structure);
          break;
        case 'outdoor-kitchen':
          createKitchenLayout(scene, structure);
          break;
        case 'hardscape':
          createHardscape(scene, structure);
          break;
        // Add more structure types as needed
      }
    });
  }, [structures]);

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-900 rounded-lg" />
  );
};

// Helper functions for creating different structure types...

export default ProjectModeler;