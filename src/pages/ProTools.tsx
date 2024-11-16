import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProLayout from '../components/ProLayout';
import Dashboard from './pro/Dashboard';
import Construction from './pro/Construction';
import BlogEditor from './pro/BlogEditor';
import SocialMedia from './pro/SocialMedia';
import CmsViewer from './pro/CmsViewer';
import InteractiveDotGrid from '../components/InteractiveDotGrid';

const ProTools: React.FC = () => {
  return (
    <>
      <InteractiveDotGrid />
      <ProLayout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="construction" element={<Construction />} />
          <Route path="blog" element={<BlogEditor />} />
          <Route path="social" element={<SocialMedia />} />
          <Route path="cms" element={<CmsViewer />} />
        </Routes>
      </ProLayout>
    </>
  );
};

export default ProTools;