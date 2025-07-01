import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MetricData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AdvancedLineChartProps {
  metrics: MetricData[];
  title?: string;
  showPrediction?: boolean;
  height?: number;
}

export const AdvancedLineChart: React.FC<AdvancedLineChartProps> = ({
  metrics,
  title,
  showPrediction = false,
  height = 300
}) => {
  const chartData = useMemo(() => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
    
    return {
      labels: metrics[0]?.history.map(h => h.date.toLocaleDateString()) || [],
      datasets: metrics.map((metric, index) => ({
        label: metric.name,
        data: metric.history.map(h => h.value),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + '20',
        tension: 0.4,
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 6
      }))
    };
  }, [metrics]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        },
        beginAtZero: true
      }
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
};
