'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Play, 
  Square, 
  Trophy, 
  RefreshCw,
  DollarSign,
  Twitter,
  Zap,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Game {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  status: string;
  score: string;
  minute?: number;
}

interface GameControlsProps {
  currentGame: Game;
}

const GameControls: React.FC<GameControlsProps> = ({ currentGame }) => {
  const [gameState, setGameState] = useState({
    twitterBot: false,
    bettingOpen: false,
    gameStarted: false,
    scoreBot: false,
    gameFinalized: false
  });

  const [score, setScore] = useState({
    home: 0,
    away: 0,
    minute: 0
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

  const updateScore = () => {
    handleAction('updateScore');
  };

  const getStepStatus = (step: keyof typeof gameState) => {
    if (gameState[step]) {
      return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    }
    return { color: 'text-gray-600', bg: 'bg-gray-100', icon: AlertTriangle };
  };

  return (
    <div className="space-y-8">
      {/* Game Status Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Game Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Admin Panel</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { key: 'twitterBot', label: 'Twitter Bot', icon: Twitter },
            { key: 'bettingOpen', label: 'Betting Open', icon: DollarSign },
            { key: 'gameStarted', label: 'Game Started', icon: Play },
            { key: 'scoreBot', label: 'Score Bot', icon: RefreshCw },
            { key: 'gameFinalized', label: 'Game Finalized', icon: Trophy }
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

      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Twitter Bot */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Twitter className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Twitter Bot</h4>
              <p className="text-sm text-gray-600">Start social engagement</p>
            </div>
          </div>
          
          <Button
            onClick={() => handleAction('twitterBot', { twitterBot: !gameState.twitterBot })}
            disabled={isLoading === 'twitterBot'}
            className={`w-full font-semibold py-3 rounded-xl ${
              gameState.twitterBot 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading === 'twitterBot' ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {gameState.twitterBot ? <Square className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                <span>{gameState.twitterBot ? 'Stop Bot' : 'Start Bot'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Betting Control */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Betting</h4>
              <p className="text-sm text-gray-600">Open/close betting</p>
            </div>
          </div>
          
          <Button
            onClick={() => handleAction('betting', { bettingOpen: !gameState.bettingOpen })}
            disabled={isLoading === 'betting' || gameState.gameFinalized}
            className={`w-full font-semibold py-3 rounded-xl ${
              gameState.bettingOpen 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLoading === 'betting' ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>{gameState.bettingOpen ? 'Close Betting' : 'Open Betting'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Game Control */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Game Control</h4>
              <p className="text-sm text-gray-600">Start/stop game</p>
            </div>
          </div>
          
          <Button
            onClick={() => handleAction('gameControl', { 
              gameStarted: !gameState.gameStarted,
              bettingOpen: gameState.gameStarted ? gameState.bettingOpen : false
            })}
            disabled={isLoading === 'gameControl'}
            className={`w-full font-semibold py-3 rounded-xl ${
              gameState.gameStarted 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isLoading === 'gameControl' ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {gameState.gameStarted ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{gameState.gameStarted ? 'Stop Game' : 'Start Game'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Score Bot */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Score Bot</h4>
              <p className="text-sm text-gray-600">Auto update scores</p>
            </div>
          </div>
          
          <Button
            onClick={() => handleAction('scoreBot', { scoreBot: !gameState.scoreBot })}
            disabled={isLoading === 'scoreBot' || !gameState.gameStarted}
            className={`w-full font-semibold py-3 rounded-xl ${
              gameState.scoreBot 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isLoading === 'scoreBot' ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {gameState.scoreBot ? <Square className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                <span>{gameState.scoreBot ? 'Stop Bot' : 'Start Bot'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Manual Score Update */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Manual Score</h4>
              <p className="text-sm text-gray-600">Update score manually</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={score.home}
                onChange={(e) => setScore(prev => ({ ...prev, home: parseInt(e.target.value) || 0 }))}
                placeholder="Home"
                className="text-center"
              />
              <Input
                type="number"
                value={score.away}
                onChange={(e) => setScore(prev => ({ ...prev, away: parseInt(e.target.value) || 0 }))}
                placeholder="Away"
                className="text-center"
              />
              <Input
                type="number"
                value={score.minute}
                onChange={(e) => setScore(prev => ({ ...prev, minute: parseInt(e.target.value) || 0 }))}
                placeholder="Min"
                className="text-center"
              />
            </div>
            
            <Button
              onClick={updateScore}
              disabled={isLoading === 'updateScore' || !gameState.gameStarted}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl"
            >
              {isLoading === 'updateScore' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Update Score'
              )}
            </Button>
          </div>
        </div>

        {/* Finalize Game */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Finalize Game</h4>
              <p className="text-sm text-gray-600">Release rewards</p>
            </div>
          </div>
          
          <Button
            onClick={() => handleAction('finalize', { 
              gameFinalized: true,
              gameStarted: false,
              scoreBot: false,
              bettingOpen: false
            })}
            disabled={isLoading === 'finalize' || !gameState.gameStarted || gameState.gameFinalized}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl"
          >
            {isLoading === 'finalize' ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Finalizing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Finalize & Release Rewards</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Current Game Info */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentGame.homeTeam.logo}</span>
              <span className="font-bold text-xl">{currentGame.homeTeam.name}</span>
            </div>
            <div className="text-3xl font-bold">{score.home} - {score.away}</div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">{currentGame.awayTeam.name}</span>
              <span className="text-2xl">{currentGame.awayTeam.logo}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{score.minute}'</div>
            <div className="text-white/80">Game Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;