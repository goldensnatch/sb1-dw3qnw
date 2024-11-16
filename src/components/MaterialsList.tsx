import React from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ProjectStructure } from '../types/project';

interface MaterialsListProps {
  structures: ProjectStructure[];
  selectedStructure: string | null;
  onSelectStructure: (id: string | null) => void;
}

const MaterialsList: React.FC<MaterialsListProps> = ({
  structures,
  selectedStructure,
  onSelectStructure
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Materials List</h2>
      <div className="max-h-96 overflow-y-auto space-y-2">
        {structures.map(structure => (
          <div key={structure.id} className="border border-gray-700 rounded-lg">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center text-white hover:bg-gray-700"
              onClick={() => onSelectStructure(
                selectedStructure === structure.id ? null : structure.id
              )}
            >
              <span className="font-medium">{structure.type}</span>
              {selectedStructure === structure.id ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            {selectedStructure === structure.id && (
              <div className="p-4 space-y-2 bg-gray-900 rounded-b-lg">
                {structure.materials.map((material, index) => (
                  <div key={index} className="grid grid-cols-4 text-sm text-gray-300">
                    <div className="col-span-2">{material.name}</div>
                    <div>{material.quantity} {material.unit}</div>
                    <div className="text-right">${material.totalCost.toFixed(2)}</div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-700 mt-2">
                  <div className="flex justify-between font-medium text-white">
                    <span>Structure Total:</span>
                    <span>${structure.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {structures.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No structures added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsList;