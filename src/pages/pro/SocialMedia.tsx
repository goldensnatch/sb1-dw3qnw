import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectItem } from '../../components/ui/select';
import { 
  Calendar, 
  Settings, 
  Facebook, 
  Instagram, 
  Mail, 
  FileText,
  BarChart,
  Activity 
} from 'lucide-react';
import { socialApi, type Campaign, type ApiLog } from '../../api/social';
import SocialAnalytics from './social/SocialAnalytics';
import ApiLogs from './social/ApiLogs';

const SocialMedia: React.FC = () => {
  // ... existing state ...
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCampaigns();
    loadLogs();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await socialApi.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    }
  };

  const loadLogs = async () => {
    try {
      const data = await socialApi.getLogs();
      setLogs(data);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { content } = await socialApi.generateCampaign({
        topic,
        platform,
        tone,
        keywords: topic.split(' ')
      });
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Social Media Manager</h1>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="bg-gray-700">
          <TabsTrigger value="generator" className="text-gray-100">
            <FileText className="w-4 h-4 mr-2" />
            Content Generator
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-gray-100">
            <BarChart className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="logs" className="text-gray-100">
            <Activity className="w-4 h-4 mr-2" />
            API Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          {/* Existing content generator UI */}
        </TabsContent>

        <TabsContent value="analytics">
          <SocialAnalytics campaigns={campaigns} />
        </TabsContent>

        <TabsContent value="logs">
          <ApiLogs logs={logs} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMedia;