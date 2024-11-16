import React, { useState } from 'react';
import KitchenLayoutWizard from './KitchenLayoutWizard';
import KitchenBlockForm from './KitchenBlockForm';
import { LIVING_PROJECT_TYPES } from '../../utils/constants';

interface OutdoorKitchenCalculatorProps {
  onStructureCalculated?: (
    type: string,
    dimensions: { length: number; width: number; height: number },
    config: any,
    materials: any[],
    totalCost: number
  ) => void;
}

const OutdoorKitchenCalculator: React.FC<OutdoorKitchenCalculatorProps> = ({
  onStructureCalculated
}) => {
  const [kitchenConfig, setKitchenConfig] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);

  const getWidthForLayout = (layout: string): number => {
    switch (layout) {
      case 'l-shaped':
      case 'u-shaped':
        return 8; // Standard depth for corner layouts
      case 'galley':
        return 10; // Standard width for galley layout
      default:
        return 4; // Standard counter depth for linear layout
    }
  };

  const calculateMaterials = (config: any) => {
    const materials = [];
    let totalCost = 0;

    // Base cabinet calculation
    const linearFeet = getLinearFeet(config.layout, config.size);
    const baseCabinetCost = 350; // Cost per linear foot
    
    materials.push({
      name: 'Base Cabinets',
      quantity: linearFeet,
      unit: 'linear ft',
      unitPrice: baseCabinetCost,
      totalCost: linearFeet * baseCabinetCost
    });

    // Countertop calculation
    const countertopSqft = linearFeet * 2.5; // Standard 30" depth
    const countertopCost = 85; // Cost per square foot
    
    materials.push({
      name: 'Granite Countertop',
      quantity: countertopSqft,
      unit: 'sq ft',
      unitPrice: countertopCost,
      totalCost: countertopSqft * countertopCost
    });

    // Block calculation
    blocks.forEach(block => {
      const blockCost = calculateBlockCost(block);
      materials.push({
        name: `${block.type} Block`,
        quantity: block.quantity,
        unit: 'pieces',
        unitPrice: blockCost / block.quantity,
        totalCost: blockCost
      });
      totalCost += blockCost;
    });

    totalCost = materials.reduce((sum, item) => sum + item.totalCost, 0);

    if (onStructureCalculated) {
      onStructureCalculated(
        'outdoor-kitchen',
        {
          length: config.size,
          width: getWidthForLayout(config.layout),
          height: 3 // Standard counter height
        },
        {
          ...config,
          blocks
        },
        materials,
        totalCost
      );
    }
  };

  const getLinearFeet = (layout: string, size: number): number => {
    switch (layout) {
      case 'l-shaped':
        return size + getWidthForLayout(layout);
      case 'u-shaped':
        return size + (getWidthForLayout(layout) * 2);
      case 'galley':
        return size * 2;
      default:
        return size;
    }
  };

  const calculateBlockCost = (block: any): number => {
    const baseCost = {
      standard: 45,
      corner: 65,
      cap: 35
    };
    return block.quantity * baseCost[block.type];
  };

  const handleWizardComplete = (config: any) => {
    setKitchenConfig(config);
    calculateMaterials(config);
  };

  const handleBlocksChange = (newBlocks: any[]) => {
    setBlocks(newBlocks);
    if (kitchenConfig) {
      calculateMaterials(kitchenConfig);
    }
  };

  return (
    <div className="space-y-6">
      <KitchenLayoutWizard onComplete={handleWizardComplete} />
      {kitchenConfig && (
        <KitchenBlockForm
          blocks={blocks}
          onBlocksChange={handleBlocksChange}
        />
      )}
    </div>
  );
};

export default OutdoorKitchenCalculator;