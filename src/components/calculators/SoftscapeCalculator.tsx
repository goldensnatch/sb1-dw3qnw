import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface SoftscapeCalculatorProps {
  onStructureCalculated?: (
    type: string,
    dimensions: { length: number; width: number; height: number },
    config: any,
    materials: any[],
    totalCost: number
  ) => void;
}

const SoftscapeCalculator: React.FC<SoftscapeCalculatorProps> = ({ onStructureCalculated }) => {
  const [type, setType] = useState('turf');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    depth: ''
  });

  const [config, setConfig] = useState({
    turfType: 'premium',
    soilType: 'topsoil',
    plantingDensity: 'medium',
    plants: [] as { type: string; size: string; quantity: number }[]
  });

  const calculateMaterials = () => {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const depth = parseFloat(dimensions.depth);

    if (!length || !width || !depth) {
      alert('Please enter all dimensions');
      return;
    }

    const area = length * width;
    const materials = [];

    if (type === 'turf') {
      const turfPrices = {
        economy: 4.50,
        standard: 6.50,
        premium: 8.50
      };
      
      const turfSqft = area * 1.15; // 15% waste factor
      materials.push({
        name: `${config.turfType} Artificial Turf`,
        quantity: Math.ceil(turfSqft),
        unit: 'sq ft',
        unitPrice: turfPrices[config.turfType],
        totalCost: Math.ceil(turfSqft * turfPrices[config.turfType])
      });

      // Add base materials
      const baseDepth = 3; // inches
      const baseVolume = (area * baseDepth) / 12;
      const baseYards = (baseVolume / 27) * 1.15;

      materials.push({
        name: 'Crushed Rock Base',
        quantity: Math.ceil(baseYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 45,
        totalCost: Math.ceil(baseYards * 45)
      });
    } else if (type === 'garden') {
      const soilVolume = (area * depth) / 12 / 27; // Convert to cubic yards
      const soilPrices = {
        topsoil: 35,
        planting: 45,
        premium: 65
      };

      materials.push({
        name: `${config.soilType} Soil`,
        quantity: Math.ceil(soilVolume * 10) / 10,
        unit: 'yards³',
        unitPrice: soilPrices[config.soilType],
        totalCost: Math.ceil(soilVolume * soilPrices[config.soilType])
      });

      // Add mulch
      const mulchDepth = 3; // inches
      const mulchVolume = (area * mulchDepth) / 12 / 27;
      materials.push({
        name: 'Premium Mulch',
        quantity: Math.ceil(mulchVolume * 10) / 10,
        unit: 'yards³',
        unitPrice: 45,
        totalCost: Math.ceil(mulchVolume * 45)
      });

      // Add plants if any
      config.plants.forEach(plant => {
        materials.push({
          name: `${plant.type} (${plant.size})`,
          quantity: plant.quantity,
          unit: 'each',
          unitPrice: getPlantPrice(plant.type, plant.size),
          totalCost: plant.quantity * getPlantPrice(plant.type, plant.size)
        });
      });
    }

    const totalCost = materials.reduce((sum, item) => sum + item.totalCost, 0);

    if (onStructureCalculated) {
      onStructureCalculated(
        type,
        { length, width, height: depth / 12 },
        config,
        materials,
        totalCost
      );
    }
  };

  const getPlantPrice = (type: string, size: string) => {
    const prices = {
      shrub: { '1gal': 12, '5gal': 35, '15gal': 85 },
      tree: { '15gal': 125, '24box': 350, '36box': 750 },
      perennial: { '1gal': 8, '5gal': 25 }
    };
    return prices[type]?.[size] || 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Type</Label>
        <Select value={type} onChange={(value) => setType(value)}>
          <SelectItem value="turf">Artificial Turf</SelectItem>
          <SelectItem value="garden">Garden Bed</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Length (ft)</Label>
          <Input
            type="number"
            value={dimensions.length}
            onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
          />
        </div>
        <div>
          <Label>Width (ft)</Label>
          <Input
            type="number"
            value={dimensions.width}
            onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
          />
        </div>
        <div>
          <Label>Depth (inches)</Label>
          <Input
            type="number"
            value={dimensions.depth}
            onChange={(e) => setDimensions(prev => ({ ...prev, depth: e.target.value }))}
          />
        </div>
      </div>

      <Separator />

      {type === 'turf' ? (
        <div>
          <Label>Turf Quality</Label>
          <Select
            value={config.turfType}
            onChange={(value) => setConfig(prev => ({ ...prev, turfType: value }))}
          >
            <SelectItem value="economy">Economy Grade</SelectItem>
            <SelectItem value="standard">Standard Grade</SelectItem>
            <SelectItem value="premium">Premium Grade</SelectItem>
          </Select>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label>Soil Type</Label>
            <Select
              value={config.soilType}
              onChange={(value) => setConfig(prev => ({ ...prev, soilType: value }))}
            >
              <SelectItem value="topsoil">Basic Topsoil</SelectItem>
              <SelectItem value="planting">Planting Mix</SelectItem>
              <SelectItem value="premium">Premium Garden Soil</SelectItem>
            </Select>
          </div>

          <div>
            <Label>Planting Density</Label>
            <Select
              value={config.plantingDensity}
              onChange={(value) => setConfig(prev => ({ ...prev, plantingDensity: value }))}
            >
              <SelectItem value="low">Low Density</SelectItem>
              <SelectItem value="medium">Medium Density</SelectItem>
              <SelectItem value="high">High Density</SelectItem>
            </Select>
          </div>
        </div>
      )}

      <Button onClick={calculateMaterials} className="w-full">
        Calculate Materials
      </Button>
    </div>
  );
};

export default SoftscapeCalculator;