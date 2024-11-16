import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface BasicCalculatorProps {
  onStructureCalculated?: (
    type: string,
    dimensions: { length: number; width: number; height: number },
    config: any,
    materials: any[],
    totalCost: number
  ) => void;
}

const BasicCalculator: React.FC<BasicCalculatorProps> = ({ onStructureCalculated }) => {
  const [materialType, setMaterialType] = useState('concrete');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    depth: ''
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
    const volume = (area * depth) / 12; // Convert depth to feet
    const materials = [];

    if (materialType === 'concrete') {
      const concreteYards = (volume / 27) * 1.1; // Add 10% waste factor
      materials.push({
        name: 'Concrete',
        quantity: Math.ceil(concreteYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 150,
        totalCost: Math.ceil(concreteYards * 150)
      });

      // Add base materials
      const baseDepth = 4; // inches
      const baseVolume = (area * baseDepth) / 12;
      const gravelYards = (baseVolume / 27) * 1.15; // Add 15% compaction factor
      
      materials.push({
        name: 'Gravel Base',
        quantity: Math.ceil(gravelYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 45,
        totalCost: Math.ceil(gravelYards * 45)
      });
    } else if (materialType === 'pavers') {
      const paverSqft = area * 1.1; // Add 10% waste factor
      materials.push({
        name: 'Pavers',
        quantity: Math.ceil(paverSqft),
        unit: 'sq ft',
        unitPrice: 6.50,
        totalCost: Math.ceil(paverSqft * 6.50)
      });

      // Calculate sand and base materials
      const sandDepth = 1; // inch
      const sandVolume = (area * sandDepth) / 12;
      const sandYards = (sandVolume / 27) * 1.15;

      materials.push({
        name: 'Sand Setting Bed',
        quantity: Math.ceil(sandYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 35,
        totalCost: Math.ceil(sandYards * 35)
      });

      const baseGravelDepth = 4; // inches
      const baseGravelVolume = (area * baseGravelDepth) / 12;
      const baseGravelYards = (baseGravelVolume / 27) * 1.15;

      materials.push({
        name: 'Gravel Base',
        quantity: Math.ceil(baseGravelYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 45,
        totalCost: Math.ceil(baseGravelYards * 45)
      });
    }

    const totalCost = materials.reduce((sum, item) => sum + item.totalCost, 0);

    if (onStructureCalculated) {
      onStructureCalculated(
        materialType,
        {
          length,
          width,
          height: depth / 12
        },
        { type: materialType },
        materials,
        totalCost
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Material Type</Label>
        <Select
          value={materialType}
          onChange={(value) => setMaterialType(value)}
        >
          <SelectItem value="concrete">Concrete</SelectItem>
          <SelectItem value="pavers">Pavers</SelectItem>
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

      <Button onClick={calculateMaterials} className="w-full">
        Calculate Materials
      </Button>
    </div>
  );
};

export default BasicCalculator;