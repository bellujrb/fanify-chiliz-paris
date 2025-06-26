'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  RefreshCw,
  Circle
} from 'lucide-react';

interface Game {
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
}

interface LiveData {
  psgOdds: number;
  realOdds: number;
}

interface LiveHypeDisplayProps {
  currentGame: Game;
  liveData: LiveData;
}

const LiveHypeDisplay: React.FC<LiveHypeDisplayProps> = ({
  currentGame,
  liveData
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Live Hype Trading</h2>
          <p className="text-gray-600">Real-time fan sentiment analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Circle className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Hype Percentages & Odds */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{currentGame.homeTeam.logo}</span>
            <span className="font-bold text-gray-900">{currentGame.homeTeam.name}</span>
          </div>
          <div className="text-4xl font-black text-red-600 mb-2">{Math.round(currentGame.homeTeam.hype)}%</div>
          <div className="text-sm text-gray-600 mb-4">Fan Hype</div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Odds:</span>
            <span className="text-lg font-bold text-red-600">{liveData.psgOdds.toFixed(2)}x</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{currentGame.awayTeam.logo}</span>
            <span className="font-bold text-gray-900">{currentGame.awayTeam.name}</span>
          </div>
          <div className="text-4xl font-black text-blue-600 mb-2">{Math.round(currentGame.awayTeam.hype)}%</div>
          <div className="text-sm text-gray-600 mb-4">Fan Hype</div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Odds:</span>
            <span className="text-lg font-bold text-blue-600">{liveData.realOdds.toFixed(2)}x</span>
          </div>
        </div>
      </div>

      {/* Live Hype Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-full flex transition-all duration-1000">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600"
              style={{ width: `${currentGame.homeTeam.hype}%` }}
            ></div>
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${currentGame.awayTeam.hype}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{currentGame.homeTeam.name}: {Math.round(currentGame.homeTeam.hype)}%</span>
          <span>{currentGame.awayTeam.name}: {Math.round(currentGame.awayTeam.hype)}%</span>
        </div>
      </div>

      {/* Trading Buttons */}
      <div className="grid grid-cols-2 gap-4">
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl">
            <TrendingUp className="w-5 h-5 mr-2" />
            Buy {currentGame.homeTeam.name} {liveData.psgOdds.toFixed(2)}x
          </Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl">
            <TrendingUp className="w-5 h-5 mr-2" />
            Buy {currentGame.awayTeam.name} {liveData.realOdds.toFixed(2)}x
          </Button>
      </div>
    </div>
  );
};

export default LiveHypeDisplay;