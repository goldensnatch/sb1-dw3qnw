import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BLOCK_TYPES } from '../utils/constants';

interface BlockAlignerProps {
  blockType: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  onPositionChange: (position: { x: number; y: number; z: number }) => void;
  onRotationChange: (rotation: { x: number; y: number; z: number }) => void;
}

const BlockAligner: React.FC<BlockAlignerProps> = ({
  blockType,
  position,
  rotation,
  onPositionChange,
  onRotationChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    block: THREE.Mesh;
    pivotHelpers: THREE.AxesHelper[];
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create block
    const blockDimensions = BLOCK_TYPES[blockType].size;
    const geometry = new THREE.BoxGeometry(
      blockDimensions.width / 12,
      blockDimensions.height / 12,
      blockDimensions.depth / 12
    );
    const material = new THREE.MeshStandardMaterial({
      color: 0xa0522d,
      roughness: 0.8,
      metalness: 0.1
    });
    const block = new THREE.Mesh(geometry, material);
    block.castShadow = true;
    block.receiveShadow = true;
    scene.add(block);

    // Add pivot helpers
    const pivotHelpers: THREE.AxesHelper[] = [];
    const axisLength = 2;
    ['x', 'y', 'z'].forEach((axis, index) => {
      const helper = new THREE.AxesHelper(axisLength);
      helper.position.setComponent(index, axisLength / 2);
      helper.visible = false;
      scene.add(helper);
      pivotHelpers.push(helper);
    });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      block,
      pivotHelpers
    };

    // Add click handlers for pivot controls
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('click', (event) => {
      mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(pivotHelpers);
      if (intersects.length > 0) {
        const axis = intersects[0].object.userData.axis;
        const rotation = { ...block.rotation };
        rotation[axis] += Math.PI / 2;
        block.rotation.set(rotation.x, rotation.y, rotation.z);
        onRotationChange({
          x: rotation.x,
          y: rotation.y,
          z: rotation.z
        });
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const { camera, renderer } = sceneRef.current;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [blockType]);

  // Update block position and rotation when props change
  useEffect(() => {
    if (!sceneRef.current) return;
    const { block } = sceneRef.current;
    block.position.set(position.x, position.y, position.z);
    block.rotation.set(rotation.x, rotation.y, rotation.z);
  }, [position, rotation]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-64 bg-gray-900 rounded-lg"
      style={{ cursor: 'pointer' }}
    />
  );
};

export default BlockAligner;