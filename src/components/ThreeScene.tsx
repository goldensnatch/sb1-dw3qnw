// Update the createKitchenLayout function in ThreeScene.tsx
function createKitchenLayout(
  scene: THREE.Scene,
  structure: ProjectStructure
) {
  const { dimensions, config, position } = structure;
  const { layout, blocks } = config;

  // Create materials
  const counterMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.4,
    metalness: 0.6
  });

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    roughness: 0.8,
    metalness: 0.1
  });

  // Create base cabinet and countertop for each section
  switch (layout) {
    case 'l-shaped':
      createLShapedKitchen(scene, dimensions, position, counterMaterial, baseMaterial);
      break;
    case 'u-shaped':
      createUShapedKitchen(scene, dimensions, position, counterMaterial, baseMaterial);
      break;
    case 'galley':
      createGalleyKitchen(scene, dimensions, position, counterMaterial, baseMaterial);
      break;
    default:
      createLinearKitchen(scene, dimensions, position, counterMaterial, baseMaterial);
  }

  // Add blocks
  blocks.forEach(block => {
    const blockDims = BLOCK_TYPES[block.type].size;
    const blockGeometry = new THREE.BoxGeometry(
      blockDims.width / 12,
      blockDims.height / 12,
      blockDims.depth / 12
    );
    const blockMaterial = new THREE.MeshStandardMaterial({
      color: 0xa0522d,
      roughness: 0.8
    });

    const mesh = new THREE.Mesh(blockGeometry, blockMaterial);
    mesh.position.set(
      position.x + block.position.x,
      position.y + blockDims.height / 24,
      position.z + block.position.z
    );
    mesh.rotation.set(
      block.rotation.x,
      block.rotation.y,
      block.rotation.z
    );
    scene.add(mesh);
  });
}

function createLinearKitchen(
  scene: THREE.Scene,
  dimensions: { length: number; width: number; height: number },
  position: { x: number; y: number; z: number },
  counterMaterial: THREE.Material,
  baseMaterial: THREE.Material
) {
  // Base cabinet
  const baseGeometry = new THREE.BoxGeometry(dimensions.length, 2.5, 2);
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.set(position.x, position.y + 1.25, position.z);
  scene.add(base);

  // Countertop
  const counterGeometry = new THREE.BoxGeometry(dimensions.length, 0.1, 2.2);
  const counter = new THREE.Mesh(counterGeometry, counterMaterial);
  counter.position.set(position.x, position.y + 2.55, position.z);
  scene.add(counter);
}

function createLShapedKitchen(
  scene: THREE.Scene,
  dimensions: { length: number; width: number; height: number },
  position: { x: number; y: number; z: number },
  counterMaterial: THREE.Material,
  baseMaterial: THREE.Material
) {
  // Main run
  createLinearKitchen(scene, 
    { ...dimensions, length: dimensions.length - 2 },
    position,
    counterMaterial,
    baseMaterial
  );

  // Return
  createLinearKitchen(scene,
    { ...dimensions, length: dimensions.width },
    {
      x: position.x + dimensions.length - 2,
      y: position.y,
      z: position.z + dimensions.width / 2 - 1
    },
    counterMaterial,
    baseMaterial
  );
}

// Add similar functions for U-shaped and Galley layouts...