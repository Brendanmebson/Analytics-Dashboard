import { io, Socket } from 'socket.io-client';
import type { RealtimeEvent } from '../types';

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, (data: any) => void> = new Map();

  connect(url: string = 'ws://localhost:3001') {
    this.socket = io(url);
    
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('realtime_data', (event: RealtimeEvent) => {
      this.listeners.forEach((callback) => callback(event));
    });

    return this.socket;
  }

  subscribe(callback: (event: RealtimeEvent) => void) {
    const id = Math.random().toString(36);
    this.listeners.set(id, callback);
    
    return () => {
      this.listeners.delete(id);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  // Simulate real-time data for demo purposes
  startSimulation() {
    if (!this.socket) return;

    const metrics = ['visitors', 'revenue', 'conversions', 'bounceRate'];
    
    setInterval(() => {
      const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
      const event: RealtimeEvent = {
        type: 'metric_update',
        data: {
          metric: randomMetric,
          value: Math.random() * 1000,
          timestamp: new Date()
        },
        timestamp: new Date()
      };
      
      this.listeners.forEach(callback => callback(event));
    }, 2000);
  }
}

export const websocketService = new WebSocketService();