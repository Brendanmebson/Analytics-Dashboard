import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Card } from '../UI/Card';
import type { UserPreferences } from '../../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(
    user?.preferences || {
      theme: 'light',
      notifications: true,
      autoRefresh: true,
      refreshInterval: 30000,
      defaultDateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
        preset: '7days'
      }
    }
  );

  const handleSave = () => {
    if (user) {
      updateUser({ preferences });
      onClose();
    }
  };

  const refreshIntervalOptions = [
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' },
    { value: 600000, label: '10 minutes' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <Input
              label="Name"
              value={user?.name || ''}
              onChange={(e) => updateUser({ name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
              onChange={(e) => updateUser({ email: e.target.value })}
            />
          </div>
        </Card>

        {/* Display Preferences */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex space-x-2">
                {['light', 'dark'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => setPreferences(prev => ({ ...prev, theme: theme as 'light' | 'dark' }))}
                    className={`px-4 py-2 rounded-lg border capitalize ${
                      preferences.theme === theme
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Data Preferences */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Data Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.autoRefresh}
                onChange={(e) => setPreferences(prev => ({ 
                  ...prev, 
                  autoRefresh: e.target.checked 
                }))}
                className="mr-2"
              />
              Auto-refresh data
            </label>

            {preferences.autoRefresh && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refresh Interval
                </label>
                <select
                  value={preferences.refreshInterval}
                  onChange={(e) => setPreferences(prev => ({ 
                    ...prev, 
                    refreshInterval: parseInt(e.target.value) 
                  }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {refreshIntervalOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences(prev => ({ 
                  ...prev, 
                  notifications: e.target.checked 
                }))}
                className="mr-2"
              />
              Enable notifications
            </label>
          </div>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
};