import React, { useState } from 'react';
import ConstructionCalculator from '../../components/ConstructionCalculator';
import ProjectModeler from '../../components/ProjectModeler';
import ProjectInvoice from '../../components/ProjectInvoice';
import MaterialsList from '../../components/MaterialsList';
import type { ProjectStructure } from '../../types/project';

const Construction: React.FC = () => {
  const [structures, setStructures] = useState<ProjectStructure[]>([]);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);

  const handleAddStructure = (structure: Omit<ProjectStructure, 'id' | 'visible'>) => {
    const newStructure: ProjectStructure = {
      ...structure,
      id: Date.now().toString(),
      visible: true
    };
    setStructures(prev => [...prev, newStructure]);
  };

  const handleRemoveStructure = (id: string) => {
    setStructures(prev => prev.filter(s => s.id !== id));
    if (selectedStructure === id) {
      setSelectedStructure(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Construction Tools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ConstructionCalculator onAddStructure={handleAddStructure} />
          <MaterialsList 
            structures={structures}
            selectedStructure={selectedStructure}
            onSelectStructure={setSelectedStructure}
          />
          <ProjectInvoice 
            structures={structures}
            onRemoveStructure={handleRemoveStructure}
          />
        </div>

        {/* Right Column */}
        <div className="h-[calc(100vh-12rem)] bg-gray-800 rounded-lg overflow-hidden">
          <ProjectModeler structures={structures} />
        </div>
      </div>
    </div>
  );
};

export default Construction;