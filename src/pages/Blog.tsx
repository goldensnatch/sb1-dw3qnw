import React from 'react';
import { Card } from '../components/ui/card';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "10 Trending Landscape Design Ideas for 2024",
      excerpt: "Discover the latest trends in outdoor living spaces and how to incorporate them into your landscape design.",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01",
      date: "January 15, 2024",
      category: "Design Trends"
    },
    {
      title: "Sustainable Landscaping: A Guide to Eco-Friendly Practices",
      excerpt: "Learn how to create beautiful outdoor spaces while minimizing environmental impact through sustainable practices.",
      image: "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1",
      date: "January 10, 2024",
      category: "Sustainability"
    },
    {
      title: "Maximizing Small Outdoor Spaces",
      excerpt: "Creative solutions and design tips for making the most of limited outdoor areas in urban environments.",
      image: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b",
      date: "January 5, 2024",
      category: "Design Tips"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Landscape Design Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-600">{post.category}</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Read More →
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
          View All Posts
        </button>
      </div>
    </div>
  );
};

export default Blog;