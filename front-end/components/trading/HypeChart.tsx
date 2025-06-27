'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

interface ChartData {
  time: string;
  psg: number;
  real: number;
}

interface Game {
  homeTeam: { name: string };
  awayTeam: { name: string };
}

interface HypeChartProps {
  chartData: ChartData[];
  currentGame: Game;
}

const HypeChart: React.FC<HypeChartProps> = ({ chartData, currentGame }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Hype Trend</h3>
          <p className="text-gray-600">Last hour sentiment analysis</p>
        </div>
        <BarChart3 className="w-5 h-5 text-gray-600" />
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end space-x-2 mb-4">
        {chartData.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col space-y-1">
            <div 
              className="bg-gradient-to-t from-brand-500 to-brand-400 rounded-t transition-all duration-500"
              style={{ 
                height: `${(point.psg / 100) * 160}px`,
                minHeight: '20px'
              }}
            ></div>
            <div 
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-b transition-all duration-500"
              style={{ 
                height: `${(point.real / 100) * 160}px`,
                minHeight: '20px'
              }}
            ></div>
            <div className="text-xs text-gray-500 text-center mt-2">{point.time}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-brand-500 rounded"></div>
          <span className="text-sm text-gray-600">{currentGame.homeTeam.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">{currentGame.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
};

export default HypeChart;