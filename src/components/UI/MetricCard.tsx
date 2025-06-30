import React from 'react';
import type { MetricData } from '../../types';
import { Card } from './Card';

interface MetricCardProps {
  metric: MetricData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const trendColor = metric.trend === 'up' ? 'text-green-500' : 
                    metric.trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  const trendIcon = metric.trend === 'up' ? '↗' : 
                   metric.trend === 'down' ? '↘' : '→';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{metric.name}</p>
          <p className="text-2xl font-bold text-gray-900">
            {metric.name === 'Revenue' ? `$${metric.value.toLocaleString()}` : metric.value.toLocaleString()}
            {metric.name === 'Bounce Rate' && '%'}
          </p>
        </div>
        <div className={`flex items-center ${trendColor}`}>
          <span className="text-lg">{trendIcon}</span>
          <span className="ml-1 text-sm font-medium">
            {Math.abs(metric.change)}%
          </span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500">
          Last updated: {metric.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );
};