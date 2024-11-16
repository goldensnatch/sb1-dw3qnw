import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Box } from 'lucide-react';
import HardscapeCalculator from './calculators/HardscapeCalculator';
import SoftscapeCalculator from './calculators/SoftscapeCalculator';
import OverheadStructureCalculator from './calculators/OverheadStructureCalculator';
import OutdoorKitchenCalculator from './calculators/OutdoorKitchenCalculator';
import type { ProjectStructure } from '../types/project';

interface ConstructionCalculatorProps {
  onAddStructure?: (structure: Omit<ProjectStructure, 'id' | 'visible'>) => void;
}

const ConstructionCalculator: React.FC<ConstructionCalculatorProps> = ({ onAddStructure }) => {
  const [activeTab, setActiveTab] = useState('hardscape');
  const [currentStructure, setCurrentStructure] = useState<Partial<ProjectStructure> | null>(null);

  const handleStructureCalculated = (
    type: ProjectStructure['type'],
    dimensions: ProjectStructure['dimensions'],
    config: ProjectStructure['config'],
    materials: ProjectStructure['materials'],
    totalCost: number
  ) => {
    setCurrentStructure({
      type,
      description: `${type} - ${dimensions.length}'x${dimensions.width}'x${dimensions.height}'`,
      dimensions,
      position: { x: 0, y: 0, z: 0 },
      config,
      materials,
      totalCost
    });
  };

  const addToModeler = () => {
    if (currentStructure && onAddStructure) {
      onAddStructure(currentStructure as Omit<ProjectStructure, 'id' | 'visible'>);
      setCurrentStructure(null);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hardscape">Hardscape</TabsTrigger>
            <TabsTrigger value="softscape">Softscape</TabsTrigger>
            <TabsTrigger value="overhead">Overhead</TabsTrigger>
            <TabsTrigger value="living">Living</TabsTrigger>
          </TabsList>

          <TabsContent value="hardscape" className="space-y-6">
            <HardscapeCalculator onStructureCalculated={handleStructureCalculated} />
          </TabsContent>

          <TabsContent value="softscape" className="space-y-6">
            <SoftscapeCalculator onStructureCalculated={handleStructureCalculated} />
          </TabsContent>

          <TabsContent value="overhead" className="space-y-6">
            <OverheadStructureCalculator onStructureCalculated={handleStructureCalculated} />
          </TabsContent>

          <TabsContent value="living" className="space-y-6">
            <OutdoorKitchenCalculator onStructureCalculated={handleStructureCalculated} />
          </TabsContent>
        </Tabs>

        {currentStructure && (
          <div className="mt-6">
            <Button 
              onClick={addToModeler}
              className="w-full flex items-center justify-center gap-2"
            >
              <Box className="w-4 h-4" />
              Add to 3D Modeler
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConstructionCalculator;