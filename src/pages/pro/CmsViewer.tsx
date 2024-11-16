import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Settings,
  FolderTree,
  Globe,
  Plus
} from 'lucide-react';

const CmsViewer: React.FC = () => {
  const [pages, setPages] = useState([
    { id: '1', title: 'Home', path: '/', published: true },
    { id: '2', title: 'About', path: '/about', published: true },
    { id: '3', title: 'Services', path: '/services', published: false }
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Content Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pages.map(page => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-white">{page.title}</h3>
                    <p className="text-sm text-gray-400">{page.path}</p>
                  </div>
                  <Badge
                    variant={page.published ? 'default' : 'secondary'}
                  >
                    {page.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Media Library</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Media items would go here */}
            </div>
            <Button className="w-full mt-4">
              <ImageIcon className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Site Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Site Title
                </label>
                <Input
                  defaultValue="New Leaf Exteriors"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Site Description
                </label>
                <Textarea
                  defaultValue="Expert landscape design and construction services"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CmsViewer;