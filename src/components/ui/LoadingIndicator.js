'use client';

import React from 'react';

const LoadingIndicator = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg px-6 py-4 flex items-center space-x-3">
        {/* Animated blue dot */}
        <div className="relative">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Loading text */}
        <span className="text-gray-800 font-medium text-sm">
          {text}
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
