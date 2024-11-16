import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { LIVING_PROJECT_TYPES } from '../../utils/constants';

interface KitchenLayoutWizardProps {
  onComplete: (config: any) => void;
}

const KitchenLayoutWizard: React.FC<KitchenLayoutWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    layout: 'linear',
    size: 7,
    appliances: [],
    accessories: []
  });

  const layouts = [
    { id: 'linear', name: 'Linear', image: '/images/kitchen/linear.svg' },
    { id: 'l-shaped', name: 'L-Shaped', image: '/images/kitchen/l-shaped.svg' },
    { id: 'u-shaped', name: 'U-Shaped', image: '/images/kitchen/u-shaped.svg' },
    { id: 'galley', name: 'Galley', image: '/images/kitchen/galley.svg' }
  ];

  const steps = [
    {
      title: 'Kitchen Layout',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {layouts.map(layout => (
            <div
              key={layout.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                config.layout === layout.id ? 'border-primary bg-primary/10' : 'hover:bg-gray-50'
              }`}
              onClick={() => setConfig(prev => ({ ...prev, layout: layout.id }))}
            >
              <img src={layout.image} alt={layout.name} className="w-full mb-2" />
              <p className="text-center font-medium">{layout.name}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Island Size',
      content: (
        <div className="space-y-8">
          <div className="aspect-video relative">
            <img
              src={`/images/kitchen/${config.layout}-${config.size}ft.svg`}
              alt="Kitchen layout"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <p className="text-center font-medium">{config.size}ft Island</p>
            <Slider
              min={LIVING_PROJECT_TYPES['outdoor-kitchen'].sizes.min}
              max={LIVING_PROJECT_TYPES['outdoor-kitchen'].sizes.max}
              step={1}
              value={[config.size]}
              onValueChange={([value]) => setConfig(prev => ({ ...prev, size: value }))}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{LIVING_PROJECT_TYPES['outdoor-kitchen'].sizes.min}ft</span>
              <span>{LIVING_PROJECT_TYPES['outdoor-kitchen'].sizes.max}ft</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete(config);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i + 1 === step
                  ? 'bg-primary text-white'
                  : i + 1 < step
                  ? 'bg-primary/20'
                  : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  i + 1 < step ? 'bg-primary/20' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {steps[step - 1].content}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {step === steps.length ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default KitchenLayoutWizard;