import React, { useState } from 'react';
import { Button } from '../ui/button';
import HardscapeForm from './HardscapeForm';
import type { HardscapeConfig } from '../../types/calculator';

interface HardscapeCalculatorProps {
  onStructureCalculated?: (
    type: string,
    dimensions: { length: number; width: number; height: number },
    config: any,
    materials: any[],
    totalCost: number
  ) => void;
}

const HardscapeCalculator: React.FC<HardscapeCalculatorProps> = ({ onStructureCalculated }) => {
  const [projectType, setProjectType] = useState('patio');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    depth: ''
  });
  const [config, setConfig] = useState<HardscapeConfig>({
    pattern: 'running',
    texture: 'smooth',
    borderStyle: 'none',
    hatchType: 'none',
    hatchSize: {
      width: 24,
      length: 24
    },
    hatchLocation: {
      x: 0,
      y: 0
    }
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

    // Base materials for all hardscape types
    const baseDepth = 4; // inches
    const baseVolume = (area * baseDepth) / 12;
    const baseYards = (baseVolume / 27) * 1.15; // Add 15% compaction factor

    materials.push({
      name: 'Gravel Base',
      quantity: Math.ceil(baseYards * 10) / 10,
      unit: 'yards³',
      unitPrice: 45,
      totalCost: Math.ceil(baseYards * 45)
    });

    if (projectType === 'patio' || projectType === 'walkway') {
      // Paver calculations with selected pattern and texture
      const paverSqft = area * 1.1; // Add 10% waste factor
      const paverPrice = getPaverPrice(config.texture, config.pattern);
      
      materials.push({
        name: `${config.texture} Pavers (${config.pattern} pattern)`,
        quantity: Math.ceil(paverSqft),
        unit: 'sq ft',
        unitPrice: paverPrice,
        totalCost: Math.ceil(paverSqft * paverPrice)
      });

      // Sand bed
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

      // Add border if selected
      if (config.borderStyle !== 'none') {
        const perimeter = 2 * (length + width);
        const borderRows = config.borderStyle === 'double' ? 2 : 1;
        const borderPavers = Math.ceil(perimeter * borderRows * 1.1); // 10% waste

        materials.push({
          name: `Border Pavers (${config.borderStyle})`,
          quantity: borderPavers,
          unit: 'linear ft',
          unitPrice: 8.50,
          totalCost: borderPavers * 8.50
        });
      }

      // Add hatch if selected
      if (config.hatchType !== 'none') {
        materials.push({
          name: `${config.hatchType} Hatch`,
          quantity: 1,
          unit: 'piece',
          unitPrice: config.hatchType === 'access' ? 250 : 175,
          totalCost: config.hatchType === 'access' ? 250 : 175
        });
      }
    } else if (projectType === 'concrete-pad') {
      const concreteYards = (area * (depth / 12)) / 27 * 1.1; // Add 10% waste
      materials.push({
        name: 'Concrete',
        quantity: Math.ceil(concreteYards * 10) / 10,
        unit: 'yards³',
        unitPrice: 150,
        totalCost: Math.ceil(concreteYards * 150)
      });

      // Add rebar if depth > 4 inches
      if (depth > 4) {
        const rebarSqft = area * 1.1;
        materials.push({
          name: 'Rebar Grid',
          quantity: Math.ceil(rebarSqft),
          unit: 'sq ft',
          unitPrice: 2.50,
          totalCost: Math.ceil(rebarSqft * 2.50)
        });
      }
    }

    const totalCost = materials.reduce((sum, item) => sum + item.totalCost, 0);

    if (onStructureCalculated) {
      onStructureCalculated(
        'hardscape',
        { length, width, height: depth / 12 },
        { projectType, ...config },
        materials,
        totalCost
      );
    }
  };

  return (
    <div className="space-y-6">
      <HardscapeForm
        projectType={projectType}
        dimensions={dimensions}
        config={config}
        onProjectTypeChange={setProjectType}
        onDimensionsChange={setDimensions}
        onConfigChange={setConfig}
      />

      <Button onClick={calculateMaterials} className="w-full">
        Calculate Materials
      </Button>
    </div>
  );
};

function getPaverPrice(texture: string, pattern: string): number {
  const basePrice = {
    smooth: 6.50,
    tumbled: 7.50,
    slate: 8.50,
    cobblestone: 9.50
  }[texture] || 6.50;

  const patternMultiplier = {
    running: 1.0,
    herringbone: 1.15,
    basketweave: 1.1,
    random: 1.2
  }[pattern] || 1.0;

  return basePrice * patternMultiplier;
}

export default HardscapeCalculator;