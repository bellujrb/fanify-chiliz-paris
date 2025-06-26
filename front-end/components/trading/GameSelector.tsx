'use client';

import React from 'react';
import { 
  ChevronDown,
  Info,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useSmartContractGames } from '@/hooks/useSmartContractGames';


interface GameSelectorProps {
  selectedGame: string;
  onGameSelect: (hypeId: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({
  selectedGame,
  onGameSelect
}) => {
  const { games, loading } = useSmartContractGames();


  return (
    <div className="display mb-4">
      {/* Game Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white border border-gray-200 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">Select Game:</span>
              {loading ? (
                <span className="text-gray-400">Loading...</span>
              ) : (
                <>
                  {games.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {games.find(g => g.hypeId === selectedGame)?.teamA}
                      </span>
                      <span className="text-gray-400 text-sm">x</span>
                      <span className="font-semibold text-gray-900">
                        {games.find(g => g.hypeId === selectedGame)?.teamB}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">No games</span>
                  )}
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[400px] p-0 shadow-xl border-0 rounded-xl" align="center">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Available Games</h3>
              <p className="text-sm text-gray-600">Select a game to manage</p>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-gray-400">Loading games from contract...</div>
              ) : games.length === 0 ? (
                <div className="p-4 text-gray-400">No games found</div>
              ) : (
                games.map((game) => (
                  <div key={game.hypeId} className="flex items-center justify-between border-b last:border-b-0 hover:bg-gray-50 transition-all">
                    <button
                      onClick={() => onGameSelect(game.hypeId)}
                      className={`flex-1 text-left p-4 ${game.hypeId === selectedGame ? 'bg-red-50/50 font-bold' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{game.teamA}</span>
                        <span className="text-gray-400">x</span>
                        <span className="font-semibold text-gray-900">{game.teamB}</span>
                        <span className="text-xs text-gray-500">{game.status}</span>
                        {game.goalsA !== 0 || game.goalsB !== 0 ? (
                          <span className="text-xs text-gray-700 ml-2">({game.goalsA} - {game.goalsB})</span>
                        ) : null}
                      </div>
                    </button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="text-xs text-gray-500 mb-2">HypeID:</div>
                        <div className="font-mono text-sm break-all mb-2">{game.hypeId}</div>
                        <div className="text-xs text-gray-500 mb-1">Status:</div>
                        <div className="text-sm mb-2">{game.status}</div>
                        <div className="text-xs text-gray-500 mb-1">Goals:</div>
                        <div className="text-sm">{game.goalsA} - {game.goalsB}</div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GameSelector;