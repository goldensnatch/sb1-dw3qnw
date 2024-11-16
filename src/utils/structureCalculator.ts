import { MaterialCosts, StructureFormData, StructureCalculation } from '../types/calculator';

export const defaultMaterialCosts: MaterialCosts = {
  wood: {
    cedar: { premium: 95, standard: 75 },
    redwood: { premium: 105, standard: 85 },
    pine: { premium: 65, standard: 45 },
    composite: { premium: 125, standard: 95 }
  },
  roofing: {
    metal: 22,
    polycarbonate: 18,
    aluminum: 25,
    shingles: 15,
    none: 0
  },
  posts: {
    wood: 250,
    stone_wrapped: 850,
    aluminum: 450
  },
  electrical: {
    fan: 350,
    light: 250,
    outlet: 150
  }
};

export function calculateStructure(data: StructureFormData, costs: MaterialCosts = defaultMaterialCosts): StructureCalculation {
  const area = parseFloat(data.length) * parseFloat(data.width);
  let totalCost = 0;

  const baseCostPerSqFt = costs.wood[data.material][data.grade];
  totalCost += area * baseCostPerSqFt;

  const postCount = data.attachedToHouse ? 2 : 4;
  totalCost += costs.posts[data.postType] * postCount;

  if (data.roofing !== 'none') {
    totalCost += area * costs.roofing[data.roofing];
  }

  totalCost += data.electrical.fans * costs.electrical.fan;
  totalCost += data.electrical.lights * costs.electrical.light;
  totalCost += data.electrical.outlets * costs.electrical.outlet;

  const typeMultipliers = {
    pavilion: 1.4,
    covered_patio: 1.5,
    arbor: 0.7,
    pergola: 1.0
  };

  totalCost *= typeMultipliers[data.type];
  const markupCost = totalCost * 0.30;

  return {
    area,
    baseCost: totalCost,
    markupCost,
    totalCost: totalCost + markupCost,
    postCount,
    details: {
      material: `${data.grade} ${data.material}`,
      posts: `${postCount} ${data.postType.replace('_', ' ')} posts`,
      roofing: data.roofing !== 'none' ? `${data.roofing} roofing` : 'open top',
      electrical: Object.entries(data.electrical)
        .filter(([_, count]) => count > 0)
        .map(([item, count]) => `${count} ${item}`)
        .join(', ')
    }
  };
}