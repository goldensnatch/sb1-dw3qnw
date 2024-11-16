import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProLayout from './components/ProLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/Login';
import ProTools from './pages/ProTools';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/pro-tools/*"
          element={
            <ProtectedRoute>
              <ProTools />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;