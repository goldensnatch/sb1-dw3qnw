import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Users, 
  Eye, 
  Save,
  Send
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

const BlogEditor: React.FC = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    scheduledDate: null as Date | null
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    // Save post logic
    console.log('Saving post:', post);
  };

  const handleSchedule = () => {
    // Schedule post logic
    console.log('Scheduling post for:', post.scheduledDate);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Blog Editor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Post Title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Write your post content in Markdown..."
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  className="min-h-[400px] bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex justify-between">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Draft
                </Button>
                <Button onClick={handleSchedule} className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Preview</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-gray-400"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <h1>{post.title || 'Untitled Post'}</h1>
              <ReactMarkdown>{post.content || 'No content yet...'}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditor;