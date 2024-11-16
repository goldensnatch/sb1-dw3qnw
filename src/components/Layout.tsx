import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      navigate('/pro-tools');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold">
                {isAuthenticated ? 'NLX:Atlas Pro' : 'New Leaf Exteriors'}
              </span>
            </button>
          </div>

          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-green-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-600 hover:text-green-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-green-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-600 hover:text-green-600"
                >
                  Blog
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/pro-tools" 
                      className="text-gray-600 hover:text-green-600"
                    >
                      Pro Tools
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="text-gray-600 hover:text-green-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@newleafexteriors.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
                <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
                <li>
                  <Link to="/login" className="hover:text-green-400">Admin Login</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400">Facebook</a>
                <a href="#" className="hover:text-green-400">Twitter</a>
                <a href="#" className="hover:text-green-400">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} New Leaf Exteriors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;