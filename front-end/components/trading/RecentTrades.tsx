'use client';

import React from 'react';
import { Circle } from 'lucide-react';

interface Trade {
  user: string;
  action: string;
  amount: string;
  time: string;
  profit: string;
}

interface RecentTradesProps {
  trades: Trade[];
}

const RecentTrades: React.FC<RecentTradesProps> = ({ trades }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Trades</h3>
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Circle className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live</span>
        </div>
      </div>
      <div className="space-y-3">
        {trades.map((trade, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 text-sm">{trade.action}</div>
              <div className="text-xs text-gray-600">{trade.user} • {trade.time}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">{trade.amount}</div>
              <div className="text-xs text-green-600">{trade.profit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrades;