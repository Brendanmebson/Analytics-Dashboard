import React, { useState } from 'react';
import type { DateRange } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (dateRange: DateRange) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ value, onChange }) => {
  const [isCustom, setIsCustom] = useState(value.preset === 'custom');

  const presets = [
    { key: 'today', label: 'Today', days: 0 },
    { key: 'yesterday', label: 'Yesterday', days: 1 },
    { key: '7days', label: 'Last 7 days', days: 7 },
    { key: '30days', label: 'Last 30 days', days: 30 },
    { key: '90days', label: 'Last 90 days', days: 90 },
  ];

  const handlePresetChange = (preset: typeof presets[0]) => {
    const end = new Date();
    const start = new Date();
    
    if (preset.key === 'today') {
      start.setHours(0, 0, 0, 0);
    } else if (preset.key === 'yesterday') {
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);
    } else {
      start.setDate(start.getDate() - preset.days);
    }

    onChange({
      start,
      end,
      preset: preset.key as DateRange['preset']
    });
    setIsCustom(false);
  };

  const handleCustomDateChange = (field: 'start' | 'end', dateString: string) => {
    const date = new Date(dateString);
    onChange({
      ...value,
      [field]: date,
      preset: 'custom'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presets.map(preset => (
          <Button
            key={preset.key}
            variant={value.preset === preset.key ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handlePresetChange(preset)}
          >
            {preset.label}
          </Button>
        ))}
        <Button
          variant={isCustom ?'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsCustom(true)}
            >
            Custom
            </Button>
            </div>
  {isCustom && (
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Start Date"
        type="date"
        value={value.start.toISOString().split('T')[0]}
        onChange={(e) => handleCustomDateChange('start', e.target.value)}
      />
      <Input
        label="End Date"
        type="date"
        value={value.end.toISOString().split('T')[0]}
        onChange={(e) => handleCustomDateChange('end', e.target.value)}
      />
    </div>
  )}
</div>
);
};