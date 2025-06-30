export interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: Date;
}

export interface ChartDataPoint {
  x: string | number;
  y: number;
  timestamp: Date;
}

export interface WebsiteMetrics {
  visitors: MetricData;
  revenue: MetricData;
  conversions: MetricData;
  bounceRate: MetricData;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

export interface RealtimeEvent {
  type: 'metric_update' | 'new_visitor' | 'conversion' | 'error';
  data: any;
  timestamp: Date;
}