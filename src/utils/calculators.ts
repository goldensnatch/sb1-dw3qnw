import { MaterialCosts, ProjectComponent } from '../types/calculator';

export const defaultMaterialCosts: MaterialCosts = {
  concrete_per_yard: 150.00,
  gravel_per_ton: 45.00,
  topsoil_per_yard: 35.00,
  mulch_per_yard: 45.00,
  sod_per_sqft: 0.85,
  pavers_per_sqft: 6.50,
  plants: {
    "1_gallon": 12.00,
    "5_gallon": 35.00,
    "15_gallon": 125.00,
    "24_box": 350.00
  }
};

export class LandscapeEstimator {
  private costs: MaterialCosts;
  private markup_rate: number;

  constructor(materialCosts: MaterialCosts = defaultMaterialCosts) {
    this.costs = materialCosts;
    this.markup_rate = 0.30;
  }

  setMarkup(rate: number): void {
    this.markup_rate = rate;
  }

  calculateHardscape(length: number, width: number, depthInches: number, materialType: 'concrete' | 'pavers'): ProjectComponent {
    const areaSqft = length * width;
    const volumeCuft = (areaSqft * depthInches) / 12;
    const volumeYards = volumeCuft / 27;

    let baseCost = 0;
    const materials: Record<string, number> = {
      area_sqft: areaSqft,
      volume_cuft: volumeCuft,
      volume_yards: volumeYards,
    };

    if (materialType === 'concrete') {
      const yardsNeeded = volumeYards * 1.1; // 10% waste factor
      baseCost = yardsNeeded * this.costs.concrete_per_yard;
      materials.concrete_yards = yardsNeeded;
    } else {
      const paverCost = areaSqft * this.costs.pavers_per_sqft;
      const baseGravelYards = (volumeCuft * 0.75) / 27;
      const gravelCost = baseGravelYards * (this.costs.gravel_per_ton * 1.4);
      baseCost = paverCost + gravelCost;
      materials.paver_sqft = areaSqft;
      materials.gravel_yards = baseGravelYards;
    }

    return {
      type: materialType,
      materials,
      baseCost,
      markupCost: baseCost * this.markup_rate,
      totalCost: baseCost * (1 + this.markup_rate)
    };
  }

  calculatePlantingArea(
    length: number,
    width: number,
    soilDepthInches: number,
    plantQuantities: Record<string, number>,
    includeMulch = true
  ): ProjectComponent {
    const areaSqft = length * width;
    const soilVolumeCuft = (areaSqft * soilDepthInches) / 12;
    const soilYards = soilVolumeCuft / 27;
    const soilCost = soilYards * this.costs.topsoil_per_yard;
    const plantCost = Object.entries(plantQuantities).reduce(
      (sum, [size, qty]) => sum + (this.costs.plants[size] * qty), 0
    );

    const materials: Record<string, number> = {
      area_sqft: areaSqft,
      soil_yards: soilYards,
    };

    let baseCost = soilCost + plantCost;

    if (includeMulch) {
      const mulchDepthInches = 3;
      const mulchVolumeCuft = (areaSqft * mulchDepthInches) / 12;
      const mulchYards = mulchVolumeCuft / 27;
      const mulchCost = mulchYards * this.costs.mulch_per_yard;
      materials.mulch_yards = mulchYards;
      baseCost += mulchCost;
    }

    return {
      type: 'planting',
      materials,
      baseCost,
      markupCost: baseCost * this.markup_rate,
      totalCost: baseCost * (1 + this.markup_rate)
    };
  }

  calculateLawnArea(
    length: number,
    width: number,
    soilDepthInches: number,
    material: 'sod' = 'sod'
  ): ProjectComponent {
    const areaSqft = length * width;
    const soilVolumeCuft = (areaSqft * soilDepthInches) / 12;
    const soilYards = soilVolumeCuft / 27;
    const soilCost = soilYards * this.costs.topsoil_per_yard;

    const sodSqft = areaSqft * 1.05; // 5% waste factor
    const materialCost = sodSqft * this.costs.sod_per_sqft;
    const baseCost = soilCost + materialCost;

    return {
      type: 'lawn',
      materials: {
        area_sqft: areaSqft,
        soil_yards: soilYards,
        sod_sqft: sodSqft
      },
      baseCost,
      markupCost: baseCost * this.markup_rate,
      totalCost: baseCost * (1 + this.markup_rate)
    };
  }

  generateEstimateSummary(components: ProjectComponent[]) {
    const totalBaseCost = components.reduce((sum, comp) => sum + comp.baseCost, 0);
    const totalMarkup = components.reduce((sum, comp) => sum + comp.markupCost, 0);

    return {
      components,
      totalBaseCost,
      totalMarkup,
      projectTotal: totalBaseCost + totalMarkup
    };
  }
}