import React from 'react';

interface HeaderProps {
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};