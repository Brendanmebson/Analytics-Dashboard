import { useState, useEffect, useRef } from 'react';
import { websocketService } from '../services/websocket';
import type { WebsiteMetrics } from '../types';
import type { RealtimeEvent } from '../types';

export const useRealTimeData = () => {
  const [metrics, setMetrics] = useState<WebsiteMetrics>({
    visitors: {
      id: 'visitors',
      name: 'Active Visitors',
      value: 1234,
      change: 12.5,
      trend: 'up',
      timestamp: new Date()
    },
    revenue: {
      id: 'revenue',
      name: 'Revenue',
      value: 45678,
      change: -2.3,
      trend: 'down',
      timestamp: new Date()
    },
    conversions: {
      id: 'conversions',
      name: 'Conversions',
      value: 89,
      change: 8.7,
      trend: 'up',
      timestamp: new Date()
    },
    bounceRate: {
      id: 'bounceRate',
      name: 'Bounce Rate',
      value: 34.2,
      change: -1.5,
      trend: 'down',
      timestamp: new Date()
    }
  });

  const [isConnected, setIsConnected] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const socket = websocketService.connect();
    
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    unsubscribeRef.current = websocketService.subscribe((event: RealtimeEvent) => {
      if (event.type === 'metric_update') {
        const { metric, value } = event.data;
        setMetrics(prev => ({
          ...prev,
          [metric]: {
            ...prev[metric as keyof WebsiteMetrics],
            value: Math.round(value),
            change: (Math.random() - 0.5) * 20,
            trend: Math.random() > 0.5 ? 'up' : 'down',
            timestamp: new Date()
          }
        }));
      }
    });

    // Start simulation for demo
    websocketService.startSimulation();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      websocketService.disconnect();
    };
  }, []);

  return { metrics, isConnected };
};