import React from 'react';
import { LIVING_PROJECT_TYPES } from '../../utils/constants';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface LivingProjectSelectorProps {
  onSelect: (type: string) => void;
}

const LivingProjectSelector: React.FC<LivingProjectSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(LIVING_PROJECT_TYPES).map(([type, data]) => (
        <Card 
          key={type}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelect(type)}
        >
          <div className="aspect-square relative mb-2">
            <img
              src={`/images/living/${type}.svg`}
              alt={data.name}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-center font-medium">{data.name}</h3>
        </Card>
      ))}
    </div>
  );
}

export default LivingProjectSelector;