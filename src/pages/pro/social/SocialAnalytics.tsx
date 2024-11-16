import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { BarChart, LineChart } from '../../../components/ui/charts';
import type { Campaign } from '../../../api/social';

interface SocialAnalyticsProps {
  campaigns: Campaign[];
}

const SocialAnalytics: React.FC<SocialAnalyticsProps> = ({ campaigns }) => {
  const getAnalyticsData = () => {
    if (!campaigns.length) return [];
    
    return campaigns.map(campaign => ({
      name: campaign.title,
      impressions: campaign.analytics?.impressions || 0,
      engagements: campaign.analytics?.engagements || 0,
      clicks: campaign.analytics?.clicks || 0
    }));
  };

  const getPlatformBreakdown = () => {
    return campaigns.reduce((acc, campaign) => {
      acc[campaign.platform] = (acc[campaign.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  if (!campaigns.length) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            No campaign data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <BarChart data={getAnalyticsData()} />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={getAnalyticsData()} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(getPlatformBreakdown()).map(([platform, count]) => (
                <div 
                  key={platform} 
                  className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-200 capitalize">{platform}</span>
                  <span className="text-gray-300">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialAnalytics;