'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown,
  DollarSign,
  Play,
  Square,
  Trophy,
  Bot,
  Twitter,
  RefreshCw,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle,
  Hash,
  Clock
} from 'lucide-react';

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

interface AdminActionsProps {
  currentGame: Game;
}

const AdminActions: React.FC<AdminActionsProps> = ({ currentGame }) => {
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

  const getStepStatus = (step: keyof typeof gameState) => {
    if (gameState[step]) {
      return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    }
    return { color: 'text-gray-600', bg: 'bg-gray-100', icon: AlertTriangle };
  };

  return (
    <div className="space-y-8">
      {/* Current Game Info */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentGame.homeTeam.logo}</span>
              <span className="font-bold text-xl">{currentGame.homeTeam.name}</span>
            </div>
            <div className="text-3xl font-bold">{currentGame.score}</div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">{currentGame.awayTeam.name}</span>
              <span className="text-2xl">{currentGame.awayTeam.logo}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentGame.minute || 0}'</div>
            <div className="text-white/80">Tempo de Jogo</div>
          </div>
        </div>
        
        {/* Game Details */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-white/80" />
              <div>
                <div className="text-xs text-white/80">HypeID</div>
                <div className="font-semibold">#psgbot12341234</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-white/80" />
              <div>
                <div className="text-xs text-white/80">Status</div>
                <div className="font-semibold">{currentGame.status}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-white/80" />
              <div>
                <div className="text-xs text-white/80">Competição</div>
                <div className="font-semibold">{currentGame.competition}</div>
              </div>
            </div>
          </div>
        </div>
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
                Abrir apostas
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('startGame', { 
                  gameStarted: true, 
                  bettingOpen: false 
                })}
                disabled={!gameState.bettingOpen || gameState.gameStarted || isLoading === 'startGame'}
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar jogo, fechar apostas
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
                Finalizar jogo, liberar prêmio
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
                Iniciar bot, atualizar placar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAction('startTwitterBot', { twitterBot: true })}
                disabled={gameState.twitterBot || isLoading === 'startTwitterBot'}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Iniciar bot Twitter
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

      {/* Game Teams Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentGame.homeTeam.logo}</span>
              <div>
                <div className="font-bold text-lg">Time A: {currentGame.homeTeam.name}</div>
                <div className="text-white/80 text-sm">Hype: {currentGame.homeTeam.hype}%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentGame.score.split('-')[0]}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentGame.awayTeam.logo}</span>
              <div>
                <div className="font-bold text-lg">Time B: {currentGame.awayTeam.name}</div>
                <div className="text-white/80 text-sm">Hype: {currentGame.awayTeam.hype}%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentGame.score.split('-')[1]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActions; 