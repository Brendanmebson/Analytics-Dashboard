import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, removeNotification, clearAll } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' || (filter === 'unread' && !n.read)
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notifications" size="lg">
      <div className="space-y-4">
        {/* Filter and Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications to show
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${getTypeColor(notification.type)} ${
                  !notification.read ? 'font-medium' : 'opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm mt-1">{notification.message}</p>
                      <p className="text-xs mt-2 opacity-75">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};