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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChartContainer, ChartLegend, ChartTooltip } from '@/components/ui/chart';
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

const GamesSection: React.FC<GamesSectionProps> = ({
  currentGame,
  liveGames,
  selectedGame,
  onGameSelect
}) => {
  const [gameState, setGameState] = useState({
    bettingOpen: false,
    gameStarted: false,
    gameFinalized: false,
    twitterBot: false,
    scoreBot: false
  });

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (action: string, newState?: any) => {
    setIsLoading(action);
    
    // Simulate API call
    setTimeout(() => {
      if (newState) {
        setGameState(prev => ({ ...prev, ...newState }));
      }
      setIsLoading(null);
    }, 1500);
  };

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

  const getStepStatus = (step: keyof typeof gameState) => {
    if (gameState[step]) {
      return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    }
    return { color: 'text-gray-600', bg: 'bg-gray-100', icon: AlertTriangle };
  };

  return (
    <div className="space-y-8">
      {/* Game Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Selecionar Jogo</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-white border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md p-2 h-auto min-h-0"
            >
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">Jogo Selecionado:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-base">{currentGame.homeTeam.logo}</span>
                  <span className="font-semibold text-gray-900 text-sm">{currentGame.homeTeam.name}</span>
                  <span className="text-gray-400 text-xs">vs</span>
                  <span className="font-semibold text-gray-900 text-sm">{currentGame.awayTeam.name}</span>
                  <span className="text-base">{currentGame.awayTeam.logo}</span>
                </div>
              </div>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-0 shadow-xl border-0 rounded-xl" align="center">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="p-2 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">Jogos Disponíveis</h3>
                <p className="text-xs text-gray-600">Selecione um jogo</p>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                {liveGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => onGameSelect(game.id)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-all duration-200 border-l-2 text-sm flex items-center justify-between ${
                      game.id === selectedGame 
                        ? 'border-purple-500 bg-purple-50/50' 
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{game.homeTeam.logo}</span>
                      <span className="font-semibold text-gray-900 text-sm">{game.homeTeam.name}</span>
                      <span className="text-gray-400 text-xs">vs</span>
                      <span className="font-semibold text-gray-900 text-sm">{game.awayTeam.name}</span>
                      <span className="text-lg">{game.awayTeam.logo}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-gray-900">{game.score}</span>
                      <span className="text-[10px] text-gray-400">{game.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Game Status Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Status do Jogo: {currentGame.homeTeam.name} vs {currentGame.awayTeam.name}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Painel Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { key: 'twitterBot', label: 'Bot Twitter', icon: Twitter },
            { key: 'bettingOpen', label: 'Apostas Abertas', icon: DollarSign },
            { key: 'gameStarted', label: 'Jogo Iniciado', icon: Play },
            { key: 'scoreBot', label: 'Bot Placar', icon: RefreshCw },
            { key: 'gameFinalized', label: 'Jogo Finalizado', icon: Trophy }
          ].map((step) => {
            const status = getStepStatus(step.key as keyof typeof gameState);
            const IconComponent = step.icon;
            const StatusIcon = status.icon;
            
            return (
              <div key={step.key} className={`p-4 rounded-xl border ${status.bg} border-gray-200`}>
                <div className="flex items-center space-x-3 mb-2">
                  <IconComponent className={`w-5 h-5 ${status.color}`} />
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                </div>
                <div className="text-sm font-medium text-gray-900">{step.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Action Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dropdown 1: Controle de Apostas e Jogo */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Controle de Apostas</h4>
              <p className="text-sm text-gray-600">Gerenciar apostas e jogo</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-white border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
                disabled={isLoading === 'betting-control'}
              >
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Selecionar Ação</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem 
                onClick={() => handleAction('openBetting', { bettingOpen: true })}
                disabled={gameState.bettingOpen || isLoading === 'openBetting'}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Abrir para apostas (Open)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('startGame', { 
                  gameStarted: true, 
                  bettingOpen: false 
                })}
                disabled={!gameState.bettingOpen || gameState.gameStarted || isLoading === 'startGame'}
              >
                <Play className="w-4 h-4 mr-2" />
                Fechar Apostas (Closed)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('finalizeGame', { 
                  gameFinalized: true,
                  gameStarted: false,
                  scoreBot: false,
                  bettingOpen: false
                })}
                disabled={!gameState.gameStarted || gameState.gameFinalized || isLoading === 'finalizeGame'}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Finalizar Jogo (Closed)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dropdown 2: Controle de Bots */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Controle de Bots</h4>
              <p className="text-sm text-gray-600">Gerenciar bots e placar</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md p-4 h-auto"
                disabled={isLoading === 'bot-control'}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Selecionar Ação</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem 
                onClick={() => handleAction('startScoreBot', { scoreBot: true })}
                disabled={!gameState.gameStarted || gameState.scoreBot || isLoading === 'startScoreBot'}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar Hype
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('startTwitterBot', { twitterBot: true })}
                disabled={gameState.twitterBot || isLoading === 'startTwitterBot'}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Atualizar Placar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('stopScoreBot', { scoreBot: false })}
                disabled={!gameState.scoreBot || isLoading === 'stopScoreBot'}
              >
                <Square className="w-4 h-4 mr-2" />
                Parar bot placar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('stopTwitterBot', { twitterBot: false })}
                disabled={!gameState.twitterBot || isLoading === 'stopTwitterBot'}
              >
                <Square className="w-4 h-4 mr-2" />
                Parar bot Twitter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default GamesSection; 