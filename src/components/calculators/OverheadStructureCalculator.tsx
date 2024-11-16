import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Trash2 } from 'lucide-react';
import OverheadStructureForm from './OverheadStructureForm';
import { calculateStructure } from '../../utils/structureCalculator';
import type { StructureFormData, StructureCalculation } from '../../types/calculator';

interface StructureData extends StructureFormData, StructureCalculation {}

interface OverheadStructureCalculatorProps {
  onAddToInvoice?: (items: any[]) => void;
  onStructureCalculated?: (
    type: string,
    dimensions: { length: number; width: number; height: number },
    config: any,
    materials: any[],
    totalCost: number
  ) => void;
}

const OverheadStructureCalculator: React.FC<OverheadStructureCalculatorProps> = ({ 
  onAddToInvoice,
  onStructureCalculated
}) => {
  const [structures, setStructures] = useState<StructureData[]>([]);
  const [currentForm, setCurrentForm] = useState<StructureFormData>({
    type: 'pergola',
    length: '',
    width: '',
    height: '',
    material: 'cedar',
    grade: 'standard',
    postType: 'wood',
    postSize: '6x6',
    beamSize: '2x8',
    rafterSize: '2x6',
    roofing: 'none',
    electrical: {
      fans: 0,
      lights: 0,
      outlets: 0
    },
    attachedToHouse: false
  });

  const handleAddStructure = () => {
    const calculation = calculateStructure(currentForm);
    const newStructure = { ...currentForm, ...calculation };
    setStructures(prev => [...prev, newStructure]);

    if (onStructureCalculated) {
      const materials = [
        {
          name: `${currentForm.material} Posts (${currentForm.postSize})`,
          quantity: calculation.postCount,
          unit: 'pieces',
          unitPrice: calculation.baseCost / calculation.postCount,
          totalCost: calculation.baseCost
        },
        // Add beams
        {
          name: `${currentForm.material} Beams (${currentForm.beamSize})`,
          quantity: Math.ceil(parseFloat(currentForm.length) / 8),
          unit: 'pieces',
          unitPrice: 45,
          totalCost: Math.ceil(parseFloat(currentForm.length) / 8) * 45
        },
        // Add rafters
        {
          name: `${currentForm.material} Rafters (${currentForm.rafterSize})`,
          quantity: Math.ceil(parseFloat(currentForm.width) / 2),
          unit: 'pieces',
          unitPrice: 35,
          totalCost: Math.ceil(parseFloat(currentForm.width) / 2) * 35
        }
      ];

      onStructureCalculated(
        currentForm.type,
        {
          length: parseFloat(currentForm.length),
          width: parseFloat(currentForm.width),
          height: parseFloat(currentForm.height)
        },
        {
          material: currentForm.material,
          postSize: currentForm.postSize,
          beamSize: currentForm.beamSize,
          rafterSize: currentForm.rafterSize,
          roofing: currentForm.roofing,
          electrical: currentForm.electrical,
          attachedToHouse: currentForm.attachedToHouse
        },
        materials,
        calculation.totalCost
      );
    }
  };

  const handleRemoveStructure = (index: number) => {
    setStructures(prev => prev.filter((_, i) => i !== index));
  };

  const addToInvoice = () => {
    if (structures.length > 0 && onAddToInvoice) {
      const items = structures.flatMap(structure => {
        const items = [];
        
        if (!structure.attachedToHouse) {
          items.push({
            name: `${structure.material} Posts (${structure.postSize})`,
            quantity: structure.postCount,
            unit: 'pieces',
            unitPrice: structure.baseCost / structure.postCount,
            totalCost: structure.baseCost
          });
        }

        const beamLength = parseFloat(structure.length);
        items.push({
          name: `${structure.material} Beams (${structure.beamSize})`,
          quantity: Math.ceil(beamLength / 8),
          unit: 'pieces',
          unitPrice: 45,
          totalCost: Math.ceil(beamLength / 8) * 45
        });

        const rafterCount = Math.ceil(parseFloat(structure.width) / 2);
        items.push({
          name: `${structure.material} Rafters (${structure.rafterSize})`,
          quantity: rafterCount,
          unit: 'pieces',
          unitPrice: 35,
          totalCost: rafterCount * 35
        });

        if (structure.electrical.fans > 0) {
          items.push({
            name: 'Outdoor Rated Fans',
            quantity: structure.electrical.fans,
            unit: 'pieces',
            unitPrice: 350,
            totalCost: structure.electrical.fans * 350
          });
        }

        if (structure.electrical.lights > 0) {
          items.push({
            name: 'LED Light Fixtures',
            quantity: structure.electrical.lights,
            unit: 'pieces',
            unitPrice: 250,
            totalCost: structure.electrical.lights * 250
          });
        }

        if (structure.electrical.outlets > 0) {
          items.push({
            name: 'GFCI Outlets',
            quantity: structure.electrical.outlets,
            unit: 'pieces',
            unitPrice: 150,
            totalCost: structure.electrical.outlets * 150
          });
        }

        return items;
      });

      onAddToInvoice(items);
      setStructures([]);
      setCurrentForm({
        ...currentForm,
        length: '',
        width: '',
        height: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <OverheadStructureForm 
        form={currentForm}
        onChange={setCurrentForm}
      />

      <div className="flex gap-4">
        <Button onClick={handleAddStructure} className="flex-1">
          Add Structure
        </Button>
        {structures.length > 0 && (
          <Button onClick={addToInvoice} className="flex-1">
            Add to Invoice
          </Button>
        )}
      </div>

      {structures.map((structure, index) => (
        <Alert key={index}>
          <AlertDescription>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-medium">
                  {structure.type.replace('_', ' ')} - {structure.length}' x {structure.width}'
                </div>
                <div className="text-sm text-gray-500">
                  {structure.details.material} | {structure.details.posts}
                  {structure.details.roofing && ` | ${structure.details.roofing}`}
                  {structure.details.electrical && ` | ${structure.details.electrical}`}
                </div>
                <div className="font-medium">
                  Total Cost: ${structure.totalCost.toFixed(2)}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveStructure(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default OverheadStructureCalculator;