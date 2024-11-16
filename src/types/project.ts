export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Material {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalCost: number;
}

export interface ProjectStructure {
  id: string;
  type: string;
  description: string;
  dimensions: Dimensions;
  position: Position;
  config: Record<string, any>;
  materials: Material[];
  totalCost: number;
  visible: boolean;
}

export interface ProjectSummary {
  structures: ProjectStructure[];
  totalCost: number;
  taxRate: number;
}