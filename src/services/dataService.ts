import type { MetricData, HistoricalData, FilterOptions, AdvancedAnalytics } from '../types';

class DataService {
  private cache: Map<string, any> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetchMetrics(filters?: FilterOptions): Promise<MetricData[]> {
    const cacheKey = `metrics_${JSON.stringify(filters)}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) return cached;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const metrics: MetricData[] = [
      {
        id: 'visitors',
        name: 'Active Visitors',
        value: Math.floor(Math.random() * 2000) + 1000,
        change: (Math.random() - 0.5) * 30,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        timestamp: new Date(),
        history: this.generateHistoricalData(30),
        forecast: Math.floor(Math.random() * 2000) + 1200,
        target: 1500
      },
      {
        id: 'revenue',
        name: 'Revenue',
        value: Math.floor(Math.random() * 50000) + 30000,
        change: (Math.random() - 0.5) * 25,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        timestamp: new Date(),
        history: this.generateHistoricalData(30),
        forecast: Math.floor(Math.random() * 55000) + 35000,
        target: 45000
      },
      {
        id: 'conversions',
        name: 'Conversions',
        value: Math.floor(Math.random() * 200) + 50,
        change: (Math.random() - 0.5) * 40,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        timestamp: new Date(),
        history: this.generateHistoricalData(30),
        forecast: Math.floor(Math.random() * 220) + 60,
        target: 150
      },
      {
        id: 'bounceRate',
        name: 'Bounce Rate',
        value: Math.random() * 30 + 25,
        change: (Math.random() - 0.5) * 15,
        trend: Math.random() > 0.5 ? 'down' : 'up',
        timestamp: new Date(),
        history: this.generateHistoricalData(30),
        forecast: Math.random() * 28 + 22,
        target: 30
      }
    ];

    this.setCache(cacheKey, metrics);
    return metrics;
  }

  async fetchAdvancedAnalytics(): Promise<AdvancedAnalytics> {
    const cacheKey = 'advanced_analytics';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) return cached;

    await new Promise(resolve => setTimeout(resolve, 800));

    const analytics: AdvancedAnalytics = {
      predictions: [
        {
          metric: 'visitors',
          predictedValue: 1800,
          confidence: 0.85,
          date: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          metric: 'revenue',
          predictedValue: 48000,
          confidence: 0.78,
          date: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      ],
      anomalies: [
        {
          metric: 'conversions',
          value: 25,
          expectedValue: 85,
          severity: 'high',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          description: 'Conversion rate dropped significantly compared to historical average'
        }
      ],
      insights: [
        {
          id: '1',
          type: 'trend',
          title: 'Mobile Traffic Increasing',
          description: 'Mobile traffic has increased by 35% over the last 7 days',
          impact: 'high',
          actionable: true,
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'opportunity',
          title: 'Weekend Performance',
          description: 'Weekend conversions are 20% lower than weekdays',
          impact: 'medium',
          actionable: true,
          timestamp: new Date()
        }
      ]
    };

    this.setCache(cacheKey, analytics);
    return analytics;
  }

  async exportData(format: 'csv' | 'json' | 'excel', data: any[]): Promise<Blob> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (format) {
      case 'csv':
        return this.exportToCSV(data);
      case 'json':
        return this.exportToJSON(data);
      case 'excel':
        return this.exportToExcel(data);
      default:
        throw new Error('Unsupported format');
    }
  }

  private generateHistoricalData(days: number): HistoricalData[] {
    const data: HistoricalData[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        date,
        value: Math.floor(Math.random() * 1000) + 500,
        events: Math.random() > 0.8 ? ['Campaign Launch'] : undefined
      });
    }

    return data;
  }

  private exportToCSV(data: any[]): Blob {
    if (data.length === 0) return new Blob([''], { type: 'text/csv' });

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    return new Blob([csv], { type: 'text/csv' });
  }

  private exportToJSON(data: any[]): Blob {
    const json = JSON.stringify(data, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  private exportToExcel(data: any[]): Blob {
    // Simplified Excel export (in real app, use a library like xlsx)
    const csv = this.exportToCSV(data);
    return new Blob([csv], { type: 'application/vnd.ms-excel' });
  }

  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}

export const dataService = new DataService();