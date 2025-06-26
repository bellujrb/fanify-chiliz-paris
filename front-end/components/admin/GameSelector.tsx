'use client';

import React from 'react';
import { 
  ChevronDown,
  Circle,
  Clock,
  Trophy
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface Game {
  id: string;
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
  status: string;
  time: string;
  competition: string;
  score: string;
  minute?: number;
}

interface GameSelectorProps {
  currentGame: Game;
  liveGames: Game[];
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({
  currentGame,
  liveGames,
  selectedGame,
  onGameSelect
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-red-500';
      case 'Starting Soon':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live':
        return <Circle className="w-2 h-2 fill-current animate-pulse" />;
      case 'Starting Soon':
        return <Clock className="w-3 h-3" />;
      default:
        return <Trophy className="w-3 h-3" />;
    }
  };

  return (
    <div className="mb-6">
      {/* Game Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white border border-gray-200 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">Selected Game:</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currentGame.homeTeam.logo}</span>
                <span className="font-semibold text-gray-900">{currentGame.homeTeam.name}</span>
                <span className="text-gray-400 text-sm">vs</span>
                <span className="font-semibold text-gray-900">{currentGame.awayTeam.name}</span>
                <span className="text-lg">{currentGame.awayTeam.logo}</span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[600px] p-0 shadow-xl border-0 rounded-xl" align="center">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Available Games</h3>
              <p className="text-sm text-gray-600">Select a game to manage</p>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {liveGames.map((game) => (
                <button
                  key={game.id}
                  onClick={() => onGameSelect(game.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-all duration-200 border-l-4 ${
                    game.id === selectedGame 
                      ? 'border-red-500 bg-red-50/50' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{game.homeTeam.logo}</span>
                        <span className="font-semibold text-gray-900">{game.homeTeam.name}</span>
                        <span className="text-gray-400">vs</span>
                        <span className="font-semibold text-gray-900">{game.awayTeam.name}</span>
                        <span className="text-xl">{game.awayTeam.logo}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(game.status)}`}>
                        {getStatusIcon(game.status)}
                        <span className="text-xs font-medium">{game.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{game.score}</div>
                      <div className="text-xs text-gray-500">{game.time}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">{game.competition}</div>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GameSelector;