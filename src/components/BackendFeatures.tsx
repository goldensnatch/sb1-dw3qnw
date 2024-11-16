import React from 'react';
import { CuboidIcon, Calculator, Database, Users, Map, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ConstructionCalculator from './ConstructionCalculator';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isLocked?: boolean;
  onClick?: () => void;
}> = ({ icon, title, description, isLocked, onClick }) => (
  <div 
    className={`bg-white p-6 rounded-lg shadow-md relative ${!isLocked && 'cursor-pointer hover:shadow-lg transition-shadow'}`}
    onClick={!isLocked ? onClick : undefined}
  >
    <div className="mb-2">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
    {isLocked && (
      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
        <span className="text-white font-semibold">Login Required</span>
      </div>
    )}
  </div>
);

const BackendFeatures: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeFeature, setActiveFeature] = React.useState<string | null>(null);

  const features = [
    {
      icon: <CuboidIcon className="h-8 w-8" />,
      title: '3D Landscape Modeler',
      description: 'Create detailed 3D models of landscape designs with integrated material sheets.'
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: 'Construction Calculator',
      description: 'Professional-grade construction and material estimator for accurate project planning.'
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: 'Material Database',
      description: 'Comprehensive database of landscaping materials for easy reference and selection.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Custom CRM',
      description: 'Tailored customer relationship management system for landscaping businesses.'
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: 'Route Mapper',
      description: 'Optimize service routes for efficient project management and maintenance schedules.'
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Integrated Shop',
      description: 'Seamlessly connected e-commerce platform for landscaping products and services.'
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Professional Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isLocked={!isAuthenticated}
              onClick={() => feature.title === 'Construction Calculator' && setActiveFeature('calculator')}
            />
          ))}
        </div>

        {isAuthenticated && activeFeature === 'calculator' && (
          <div className="mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Construction Calculator</h3>
                <button 
                  onClick={() => setActiveFeature(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <ConstructionCalculator />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BackendFeatures;