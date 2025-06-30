import { useState, useEffect } from 'react';
import type { ChartData } from '../types';

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Visitors',
      data: [],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  });

  useEffect(() => {
    const generateInitialData = () => {
      const now = new Date();
      const labels = [];
      const data = [];

      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString());
        data.push(Math.floor(Math.random() * 1000) + 500);
      }

      setChartData({
        labels,
        datasets: [{
          label: 'Daily Visitors',
          data,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }]
      });
    };

    generateInitialData();

    // Update with new data point every 10 seconds
    const interval = setInterval(() => {
      setChartData(prev => {
        const newLabels = [...prev.labels.slice(1), new Date().toLocaleTimeString()];
        const newData = [...prev.datasets[0].data.slice(1), Math.floor(Math.random() * 1000) + 500];

        return {
          ...prev,
          labels: newLabels,
          datasets: [{
            ...prev.datasets[0],
            data: newData
          }]
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return chartData;
};