import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  title?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ title }) => {
  const data = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [65, 30, 5],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#D97706',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};