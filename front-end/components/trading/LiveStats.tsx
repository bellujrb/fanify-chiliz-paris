'use client';

import React from 'react';

interface LiveData {
  tweets: number;
  totalFans: number;
  volume: number;
  activeTraders: number;
}

interface LiveStatsProps {
  liveData: LiveData;
}

const LiveStats: React.FC<LiveStatsProps> = ({ liveData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Live Stats</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tweets</span>
          <span className="font-bold text-blue-600">{liveData.tweets.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Active Fans</span>
          <span className="font-bold text-purple-600">{(liveData.totalFans / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Volume</span>
          <span className="font-bold text-green-600">${(liveData.volume / 1000000).toFixed(1)}M</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Traders</span>
          <span className="font-bold text-orange-600">{liveData.activeTraders.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;