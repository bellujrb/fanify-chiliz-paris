'use client';

import React, { useState } from 'react';
import { 
  ChevronDown,
  Circle,
  Clock,
  Trophy,
  Hash,
  Users,
  TrendingUp,
  DollarSign,
  Play,
  Square,
  Bot,
  Twitter,
  RefreshCw,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Bar } from 'recharts';

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

interface GamesSectionProps {
  currentGame: Game;
  liveGames: Game[];
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const GamesData: React.FC<GamesSectionProps> = ({
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

  // MOCK DATA para o gráfico de hype (agora por dia)
  const mockHypeData = Array.from({ length: 7 }, (_, i) => ({
    day: `Dia ${i + 1}`,
    homeHype: Math.max(30, Math.min(80, currentGame.homeTeam.hype + Math.round(Math.sin(i / 1.5) * 10) - i)),
    awayHype: Math.max(20, Math.min(70, currentGame.awayTeam.hype + Math.round(Math.cos(i / 1.5) * 10) + i)),
  }));

  return (
    <div className="space-y-8">
      {/* Game Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Selecionar Jogo</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-white border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">Jogo Selecionado:</span>
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
                <h3 className="font-bold text-gray-900">Jogos Disponíveis</h3>
                <p className="text-sm text-gray-600">Selecione um jogo para visualizar</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {liveGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => onGameSelect(game.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-all duration-200 border-l-4 ${
                      game.id === selectedGame 
                        ? 'border-purple-500 bg-purple-50/50' 
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
      {/* Hype Chart - Evolução do Hype dos Times */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>Hype dos Times</span>
          <span className="text-xs font-normal text-gray-400">(últimos dias)</span>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHypeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="homeHype" name={currentGame.homeTeam.name} fill="#f87171" barSize={18} radius={[4, 4, 0, 0]} />
              <Bar dataKey="awayHype" name={currentGame.awayTeam.name} fill="#60a5fa" barSize={18} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="homeHype" name={currentGame.homeTeam.name + ' (linha)'} stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="awayHype" name={currentGame.awayTeam.name + ' (linha)'} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GamesData; 