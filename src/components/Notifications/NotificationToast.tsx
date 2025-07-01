import React, { useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  
  const recentNotifications = notifications
    .filter(n => !n.persistent)
    .slice(0, 3);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {recentNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: any;
  onRemove: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, 5000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${getTypeStyles(notification.type)} animate-slide-in`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <p className="text-sm mt-1 opacity-90">{notification.message}</p>
        </div>
        <button
          onClick={onRemove}
          className="ml-4 text-sm opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};