'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface Team {
  name: string;
  shortName: string;
  logo: string;
  hypeToken: string;
  currentPrice: number;
  change: string;
  hypePercentage: number;
}

interface Event {
  homeTeam: Team;
  awayTeam: Team;
  status: string;
}

interface HypeChartProps {
  event: Event;
}

const HypeChart: React.FC<HypeChartProps> = ({ event }) => {
  const [timeframe, setTimeframe] = useState<'1h' | '4h' | '24h'>('1h');
  const [chartData, setChartData] = useState<any[]>([]);

  // Generate mock chart data
  useEffect(() => {
    const generateData = () => {
      const points = timeframe === '1h' ? 12 : timeframe === '4h' ? 24 : 48;
      const data = [];
      
      for (let i = 0; i < points; i++) {
        const homePrice = event.homeTeam.currentPrice + (Math.random() - 0.5) * 0.5;
        const awayPrice = event.awayTeam.currentPrice + (Math.random() - 0.5) * 0.5;
        
        data.push({
          time: i,
          homePrice: Math.max(0.1, homePrice),
          awayPrice: Math.max(0.1, awayPrice),
          homeHype: Math.random() * 100,
          awayHype: Math.random() * 100
        });
      }
      
      return data;
    };

    setChartData(generateData());
  }, [timeframe, event]);

  const timeframes = [
    { id: '1h', label: '1H' },
    { id: '4h', label: '4H' },
    { id: '24h', label: '24H' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Hype Chart</h3>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === tf.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Token Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{event.homeTeam.logo}</span>
              <span className="font-semibold text-gray-900">{event.homeTeam.hypeToken}</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{event.homeTeam.change}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${event.homeTeam.currentPrice.toFixed(3)}
          </div>
          <div className="text-sm text-gray-600">
            Hype: {event.homeTeam.hypePercentage}%
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border border-pink-200/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{event.awayTeam.logo}</span>
              <span className="font-semibold text-gray-900">{event.awayTeam.hypeToken}</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{event.awayTeam.change}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-pink-600">
            ${event.awayTeam.currentPrice.toFixed(3)}
          </div>
          <div className="text-sm text-gray-600">
            Hype: {event.awayTeam.hypePercentage}%
          </div>
        </div>
      </div>

      {/* Simplified Chart Visualization */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="h-64 flex items-end space-x-1">
          {chartData.slice(-20).map((point, index) => (
            <div key={index} className="flex-1 flex flex-col space-y-1">
              <div 
                className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
                style={{ 
                  height: `${(point.homePrice / Math.max(...chartData.map(d => d.homePrice))) * 100}%`,
                  minHeight: '4px'
                }}
              ></div>
              <div 
                className="bg-gradient-to-t from-pink-500 to-pink-400 rounded-b"
                style={{ 
                  height: `${(point.awayPrice / Math.max(...chartData.map(d => d.awayPrice))) * 100}%`,
                  minHeight: '4px'
                }}
              ></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>-{timeframe}</span>
          <span>Now</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-600">{event.homeTeam.hypeToken}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded"></div>
          <span className="text-sm text-gray-600">{event.awayTeam.hypeToken}</span>
        </div>
      </div>
    </div>
  );
};

export default HypeChart;