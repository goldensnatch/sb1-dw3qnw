import React from 'react';
import { Card } from '../../components/ui/card';
import { 
  BarChart as BarChartIcon, 
  Users, 
  FileText, 
  Share,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import { BarChart, LineChart } from '../../components/ui/charts';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Active Projects', 
      value: '12', 
      change: '+2',
      icon: BarChartIcon, 
      color: 'bg-sky-500/20',
      iconColor: 'text-sky-500'
    },
    { 
      label: 'Total Customers', 
      value: '48', 
      change: '+5',
      icon: Users, 
      color: 'bg-emerald-500/20',
      iconColor: 'text-emerald-500'
    },
    { 
      label: 'Blog Posts', 
      value: '24', 
      change: '+3',
      icon: FileText, 
      color: 'bg-violet-500/20',
      iconColor: 'text-violet-500'
    },
    { 
      label: 'Social Posts', 
      value: '156', 
      change: '+12',
      icon: Share, 
      color: 'bg-amber-500/20',
      iconColor: 'text-amber-500'
    }
  ];

  const recentActivity = [
    {
      type: 'project',
      title: 'Modern Backyard Renovation',
      status: 'In Progress',
      time: '2 hours ago'
    },
    {
      type: 'post',
      title: 'Spring Gardening Tips',
      status: 'Published',
      time: '5 hours ago'
    },
    {
      type: 'customer',
      title: 'New Client Consultation',
      status: 'Scheduled',
      time: 'Tomorrow'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Last updated: Just now</span>
          <button className="text-sky-500 hover:text-sky-400">
            <TrendingUp className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Performance Overview</h2>
            <div className="h-[300px]">
              <LineChart data={[]} />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-1 p-1.5 rounded-lg ${
                    activity.type === 'project' ? 'bg-sky-500/20 text-sky-500' :
                    activity.type === 'post' ? 'bg-violet-500/20 text-violet-500' :
                    'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {activity.type === 'project' ? <CheckCircle className="h-4 w-4" /> :
                     activity.type === 'post' ? <FileText className="h-4 w-4" /> :
                     <Calendar className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  <span className={`ml-auto text-xs font-medium ${
                    activity.status === 'In Progress' ? 'text-sky-500' :
                    activity.status === 'Published' ? 'text-emerald-500' :
                    'text-amber-500'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;