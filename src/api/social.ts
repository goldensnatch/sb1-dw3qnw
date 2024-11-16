import { fetchApi } from './client';

export interface Campaign {
  id: string;
  title: string;
  platform: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: string;
  analytics?: CampaignAnalytics;
  createdAt: string;
}

export interface CampaignAnalytics {
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  likes: number;
}

export interface ApiLog {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  duration: number;
  timestamp: string;
}

// Mock data for development
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Garden Tips',
    platform: 'facebook',
    content: 'Get your garden ready for summer...',
    status: 'published',
    analytics: {
      impressions: 1200,
      engagements: 450,
      clicks: 89,
      shares: 25,
      likes: 145
    },
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Spring Planting Guide',
    platform: 'instagram',
    content: 'The perfect time to start planting...',
    status: 'scheduled',
    scheduledFor: '2024-03-01T09:00:00Z',
    analytics: {
      impressions: 800,
      engagements: 320,
      clicks: 65,
      shares: 18,
      likes: 95
    },
    createdAt: '2024-01-20T15:30:00Z'
  }
];

const mockLogs: ApiLog[] = [
  {
    id: '1',
    endpoint: '/api/social/campaigns',
    method: 'GET',
    status: 200,
    duration: 145,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    endpoint: '/api/social/generate',
    method: 'POST',
    status: 201,
    duration: 2450,
    timestamp: new Date().toISOString()
  }
];

export const socialApi = {
  generateCampaign: async (prompt: {
    topic: string;
    platform: string;
    tone: string;
    keywords: string[];
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      content: `Generated content about ${prompt.topic} for ${prompt.platform} in ${prompt.tone} tone.`
    };
  },

  getCampaigns: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCampaigns;
  },

  getAnalytics: async (campaignId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const campaign = mockCampaigns.find(c => c.id === campaignId);
    return campaign?.analytics || {
      impressions: 0,
      engagements: 0,
      clicks: 0,
      shares: 0,
      likes: 0
    };
  },

  getLogs: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockLogs;
  },

  scheduleCampaign: async (campaign: Omit<Campaign, 'id' | 'createdAt'>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    return newCampaign;
  }
};