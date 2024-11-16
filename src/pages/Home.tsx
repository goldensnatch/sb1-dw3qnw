import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Ruler, Workflow, Phone } from 'lucide-react';

const Home: React.FC = () => {
  // ... existing imports and projects array ...

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform Your Outdoor Space with New Leaf Exteriors
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Expert landscape design, construction, and maintenance services to bring your vision to life.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the sections remain the same */}
        {/* ... */}
      </main>
    </div>
  );
};

export default Home;