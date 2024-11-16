import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import type { ApiLog } from '../../../api/social';

interface ApiLogsProps {
  logs: ApiLog[];
}

const ApiLogs: React.FC<ApiLogsProps> = ({ logs }) => {
  if (!logs.length) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            No API logs available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">API Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-lg ${
                log.status >= 400 ? 'bg-red-900/50' : 'bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    log.method === 'GET' ? 'bg-blue-600' :
                    log.method === 'POST' ? 'bg-green-600' :
                    'bg-yellow-600'
                  }`}>
                    {log.method}
                  </span>
                  <span className="ml-2 text-gray-300">{log.endpoint}</span>
                </div>
                <div className="text-sm">
                  <span className={`${
                    log.status >= 400 ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {log.status}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {log.duration}ms
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiLogs;