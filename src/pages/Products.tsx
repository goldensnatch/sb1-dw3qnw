import React from 'react';
import { Card } from '../components/ui/card';

const Products: React.FC = () => {
  const products = [
    {
      category: 'Hardscape',
      items: [
        {
          name: 'Premium Pavers',
          description: 'High-quality concrete pavers in various styles and colors',
          image: 'https://images.unsplash.com/photo-1597857194115-754e8e08f490'
        },
        {
          name: 'Natural Stone',
          description: 'Authentic stone materials for walls and pathways',
          image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73'
        }
      ]
    },
    {
      category: 'Outdoor Living',
      items: [
        {
          name: 'Pergolas & Pavilions',
          description: 'Custom-built shade structures for your outdoor space',
          image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
        },
        {
          name: 'Outdoor Kitchens',
          description: 'Complete outdoor cooking and entertaining solutions',
          image: 'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      
      <div className="space-y-16">
        {products.map((category, index) => (
          <section key={index}>
            <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.items.map((product, productIndex) => (
                <Card key={productIndex} className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Products;