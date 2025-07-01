export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  defaultDateRange: DateRange;
}

export interface DateRange {
  start: Date;
  end: Date;
  preset?: 'today' | 'yesterday' | '7days' | '30days' | '90days' | 'custom';
}

export interface FilterOptions {
  dateRange: DateRange;
  metrics: string[];
  countries: string[];
  devices: string[];
  sources: string[];
}

export interface ExportOptions {
  format: 'pdf' | 'csv' | 'excel' | 'json';
  data: 'current' | 'filtered' | 'all';
  includeCharts: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  persistent?: boolean;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'area' | 'pie' | 'doughnut' | 'radar';
  title: string;
  dataKey: string;
  color: string;
  visible: boolean;
  position: { x: number; y: number };
}

export interface DashboardLayout {
  id: string;
  name: string;
  charts: ChartConfig[];
  isDefault: boolean;
}

// Enhanced metric data
export interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: Date;
  history: HistoricalData[];
  forecast?: number;
  target?: number;
}

export interface HistoricalData {
  date: Date;
  value: number;
  events?: string[];
}

export interface AdvancedAnalytics {
  predictions: PredictionData[];
  anomalies: AnomalyData[];
  insights: InsightData[];
}

export interface PredictionData {
  metric: string;
  predictedValue: number;
  confidence: number;
  date: Date;
}

export interface AnomalyData {
  metric: string;
  value: number;
  expectedValue: number;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  description: string;
}

export interface InsightData {
  id: string;
  type: 'trend' | 'correlation' | 'pattern' | 'opportunity';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  timestamp: Date;
}