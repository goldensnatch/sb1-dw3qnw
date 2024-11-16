export interface MaterialCosts {
  wood: {
    [key: string]: {
      premium: number;
      standard: number;
    };
  };
  roofing: {
    [key: string]: number;
  };
  posts: {
    [key: string]: number;
  };
  electrical: {
    [key: string]: number;
  };
}

export interface LumberSize {
  nominal: string;
  actual: string;
  type: 'post' | 'beam' | 'rafter';
}

export interface StructureFormData {
  type: string;
  length: string;
  width: string;
  height: string;
  material: string;
  grade: 'premium' | 'standard';
  postType: string;
  postSize: string;
  beamSize: string;
  rafterSize: string;
  roofing: string;
  electrical: {
    fans: number;
    lights: number;
    outlets: number;
  };
  attachedToHouse: boolean;
}

export interface BlockConfig {
  type: 'standard' | 'corner' | 'cap';
  size: {
    width: number;
    height: number;
    depth: number;
  };
  quantity: number;
}

export interface HardscapeConfig {
  pattern: 'running' | 'herringbone' | 'basketweave' | 'random';
  texture: 'smooth' | 'tumbled' | 'slate' | 'cobblestone';
  borderStyle: 'none' | 'single' | 'double';
  hatchType: 'none' | 'access' | 'drainage';
  hatchSize: {
    width: number;
    length: number;
  };
  hatchLocation: {
    x: number;
    y: number;
  };
}

export interface StructureCalculation {
  area: number;
  baseCost: number;
  markupCost: number;
  totalCost: number;
  postCount: number;
  details: {
    material: string;
    posts: string;
    roofing: string;
    electrical: string;
  };
}