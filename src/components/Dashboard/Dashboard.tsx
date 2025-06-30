import React from 'react';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { useChartData } from '../../hooks/useChartData';
import { Header } from '../Layout/Header';
import { MetricCard } from '../UI/MetricCard';
import { LineChart } from '../Charts/LineChart';
import { DonutChart } from '../Charts/DonutChart';
import { Card } from '../UI/Card';

export const Dashboard: React.FC = () => {
  const { metrics, isConnected } = useRealTimeData();
  const chartData = useChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isConnected={isConnected} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard metric={metrics.visitors} />
          <MetricCard metric={metrics.revenue} />
          <MetricCard metric={metrics.conversions} />
          <MetricCard metric={metrics.bounceRate} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Visitor Trends
            </h3>
            <LineChart data={chartData} />
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Device Distribution
            </h3>
            <DonutChart />
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Real-time Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">New user from USA</span>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600">Purchase completed</span>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Page view: /products</span>
                <span className="text-xs text-gray-500">7m ago</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Pages
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/dashboard</span>
                <span className="text-sm font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/products</span>
                <span className="text-sm font-medium">987</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">/about</span>
                <span className="text-sm font-medium">654</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Page Load Time</span>
                <span className="text-sm font-medium text-green-600">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Server Response</span>
                <span className="text-sm font-medium text-green-600">0.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};