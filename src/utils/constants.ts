// Add to existing constants.ts
export const BLOCK_TYPES = {
  standard: {
    name: 'Standard Block',
    size: { width: 16, height: 8, depth: 8 }
  },
  corner: {
    name: 'Corner Block',
    size: { width: 16, height: 8, depth: 16 }
  },
  cap: {
    name: 'Cap Block',
    size: { width: 16, height: 4, depth: 8 }
  }
};

export const PAVER_PATTERNS = [
  { id: 'running', name: 'Running Bond' },
  { id: 'herringbone', name: 'Herringbone' },
  { id: 'basketweave', name: 'Basketweave' },
  { id: 'random', name: 'Random' }
];

export const PAVER_TEXTURES = [
  { id: 'smooth', name: 'Smooth' },
  { id: 'tumbled', name: 'Tumbled' },
  { id: 'slate', name: 'Slate' },
  { id: 'cobblestone', name: 'Cobblestone' }
];

export const BORDER_STYLES = [
  { id: 'none', name: 'No Border' },
  { id: 'single', name: 'Single Row' },
  { id: 'double', name: 'Double Row' }
];

export const HATCH_TYPES = [
  { id: 'none', name: 'No Hatch' },
  { id: 'access', name: 'Access Hatch' },
  { id: 'drainage', name: 'Drainage Hatch' }
];

export const LUMBER_SIZES = {
  posts: [
    { nominal: '4x4', actual: '3.5" x 3.5"' },
    { nominal: '6x6', actual: '5.5" x 5.5"' },
    { nominal: '8x8', actual: '7.5" x 7.5"' }
  ],
  beams: [
    { nominal: '2x6', actual: '1.5" x 5.5"' },
    { nominal: '2x8', actual: '1.5" x 7.25"' },
    { nominal: '2x10', actual: '1.5" x 9.25"' },
    { nominal: '2x12', actual: '1.5" x 11.25"' }
  ],
  rafters: [
    { nominal: '2x4', actual: '1.5" x 3.5"' },
    { nominal: '2x6', actual: '1.5" x 5.5"' },
    { nominal: '2x8', actual: '1.5" x 7.25"' }
  ]
};

export const LIVING_PROJECT_TYPES = {
  'outdoor-kitchen': {
    name: 'Outdoor Kitchen',
    sizes: {
      min: 4,
      max: 14,
      default: 7
    },
    layouts: ['linear', 'l-shaped', 'u-shaped', 'galley']
  },
  'fire-pit': {
    name: 'Fire Pit',
    sizes: {
      min: 3,
      max: 6,
      default: 4
    }
  },
  'pizza-oven': {
    name: 'Pizza Oven',
    sizes: {
      min: 4,
      max: 8,
      default: 6
    }
  },
  'wood-storage': {
    name: 'Wood Storage',
    sizes: {
      min: 4,
      max: 12,
      default: 8
    }
  }
};