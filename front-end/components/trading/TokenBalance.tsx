'use client';

import React from 'react';
import { Coins, Wallet, AlertCircle, Circle, Clock } from 'lucide-react';

interface TokenBalanceProps {
  userTokens: {
    CHZ: number;
    HYPE_PSG: number;
    HYPE_REAL: number;
    totalValue: number;
  };
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ userTokens }) => {
  // Check if user has any active bets
  const hasActiveBets = userTokens.HYPE_PSG > 0 || userTokens.HYPE_REAL > 0;

  // Mock game status data
  const gameStatus = {
    status: 'Live', // Live, Starting Soon, Finished
    timeRemaining: '23 min',
    score: '1-1',
    minute: 67
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-brand-500';
      case 'Starting Soon':
        return 'text-blue-500';
      case 'Finished':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live':
        return <Circle className="w-3 h-3 fill-current animate-pulse" />;
      case 'Starting Soon':
        return <Clock className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3 fill-current" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Wallet className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-bold text-gray-900">My Hype</h3>
      </div>
      
      {hasActiveBets ? (
        // Show tokens when user has active bets
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Bet on</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">PSG</div>
            <div className="text-xs text-gray-600">Chosen team</div>
          </div>

          <div className="bg-gradient-to-r from-brand-50 to-pink-50 p-4 rounded-xl border border-brand-200/50">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🔴</span>
              <span className="text-sm font-medium text-gray-700">Hypes deposited</span>
            </div>
            <div className="text-2xl font-bold text-brand-600">{userTokens.HYPE_PSG}</div>
            <div className="text-xs text-gray-600">Tokens</div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200/50">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(gameStatus.status)}
              <span className="text-sm font-medium text-gray-700">Game Status</span>
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(gameStatus.status).replace('text-', 'text-')}`}>
              {gameStatus.status}
            </div>
            <div className="text-xs text-gray-600">
              {gameStatus.status === 'Live' 
                ? `${gameStatus.score} • ${gameStatus.minute}'` 
                : gameStatus.timeRemaining
              }
            </div>
          </div>
        </div>
      ) : (
        // Show empty state when user hasn't bet on anyone
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No active bets
          </h4>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't placed a bet on any team yet. Start by making your first bet on the available games!
          </p>

          {/* Available Balance */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50 max-w-xs mx-auto mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coins className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Available Balance</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{userTokens.CHZ.toFixed(2)}</div>
            <div className="text-xs text-gray-600">CHZ to bet</div>
          </div>

          {/* Game Status in empty state */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200/50 max-w-xs mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {getStatusIcon(gameStatus.status)}
              <span className="text-sm font-medium text-gray-700">Current Game</span>
            </div>
            <div className={`text-xl font-bold ${getStatusColor(gameStatus.status).replace('text-', 'text-')}`}>
              {gameStatus.status}
            </div>
            <div className="text-xs text-gray-600">
              {gameStatus.status === 'Live' 
                ? `${gameStatus.score} • ${gameStatus.minute}'` 
                : gameStatus.timeRemaining
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenBalance;