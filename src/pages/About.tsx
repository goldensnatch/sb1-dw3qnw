import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About New Leaf Exteriors</h1>
        
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1557429287-b2e26467fc2b"
            alt="Team at work"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2010, New Leaf Exteriors has been transforming outdoor spaces into beautiful, 
              functional environments that enhance our clients' lives. Our passion for excellence and 
              attention to detail has made us a leader in landscape design and construction.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-6">
              We strive to create exceptional outdoor living spaces that reflect our clients' unique 
              style while maintaining the highest standards of craftsmanship and environmental 
              responsibility.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="mb-6">
              Our team consists of experienced designers, skilled craftsmen, and dedicated project 
              managers who work together to bring your vision to life. We believe in continuous 
              learning and staying current with the latest trends and technologies in landscape design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="font-bold text-4xl text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-4xl text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-4xl text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;