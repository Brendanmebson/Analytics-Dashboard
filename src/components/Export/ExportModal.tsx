import React, { useState } from 'react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { useNotifications } from '../../contexts/NotificationContext';
import { dataService } from '../../services/dataService';
import type { ExportOptions } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    data: 'current',
    includeCharts: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const { addNotification } = useNotifications();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await dataService.exportData(options.format, data);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-data.${options.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addNotification({
        type: 'success',
        title: 'Export Successful',
        message: `Data exported as ${options.format.toUpperCase()} file`
      });
      
      onClose();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export data. Please try again.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Data" size="md">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['csv', 'json', 'excel'].map(format => (
              <button
                key={format}
                onClick={() => setOptions(prev => ({ ...prev, format: format as 'csv' | 'json' | 'excel' }))}
                className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                  options.format === format
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Range
          </label>
          <div className="space-y-2">
            {[
              { key: 'current', label: 'Current View' },
              { key: 'filtered', label: 'Filtered Data' },
              { key: 'all', label: 'All Data' }
            ].map(option => (
              <label key={option.key} className="flex items-center">
                <input
                  type="radio"
                  name="dataRange"
                  value={option.key}
                  checked={options.data === option.key}
                  onChange={(e) => setOptions(prev => ({ ...prev, data: e.target.value as any }))}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeCharts}
              onChange={(e) => setOptions(prev => ({ ...prev, includeCharts: e.target.checked }))}
              className="mr-2"
            />
            Include Charts (PDF only)
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} loading={isExporting}>
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
