import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  LayoutDashboard, 
  Box, 
  PenTool, 
  Share2, 
  Database,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const ProLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/pro-tools' },
    { icon: Box, label: 'Construction', path: '/pro-tools/construction' },
    { icon: PenTool, label: 'Blog Editor', path: '/pro-tools/blog' },
    { icon: Share2, label: 'Social Media', path: '/pro-tools/social' },
    { icon: Database, label: 'CMS', path: '/pro-tools/cms' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4">
        <div className="mb-8">
          <Leaf className="h-8 w-8 text-green-500" />
        </div>

        <nav className="flex-1 w-full">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center py-3 text-sm",
                    "hover:bg-gray-700 transition-colors",
                    location.pathname === item.path 
                      ? "text-green-500 bg-gray-700" 
                      : "text-gray-400"
                  )}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white p-3 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-20 min-h-screen bg-gray-900">
        {children}
      </div>
    </div>
  );
};

export default ProLayout;