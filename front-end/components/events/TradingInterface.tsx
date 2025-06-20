'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

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
  marketStatus: string;
}

interface TradingInterfaceProps {
  event: Event;
  userBalance: Record<string, number>;
  onBalanceUpdate: (newBalance: Record<string, number>) => void;
}

const TradingInterface: React.FC<TradingInterfaceProps> = ({ 
  event, 
  userBalance, 
  onBalanceUpdate 
}) => {
  const [selectedToken, setSelectedToken] = useState(event.homeTeam.hypeToken);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const selectedTeam = selectedToken === event.homeTeam.hypeToken ? event.homeTeam : event.awayTeam;
  const tokenBalance = userBalance[selectedToken] || 0;
  const chzBalance = userBalance.CHZ || 0;

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    return (amountNum * selectedTeam.currentPrice).toFixed(2);
  };

  const calculatePotentialProfit = () => {
    const amountNum = parseFloat(amount) || 0;
    const currentPrice = selectedTeam.currentPrice;
    
    // Simulate potential profit based on hype percentage
    const hypeMultiplier = selectedTeam.hypePercentage / 100;
    const potentialPrice = currentPrice * (1 + (hypeMultiplier * 0.2));
    const profit = (potentialPrice - currentPrice) * amountNum;
    
    return profit.toFixed(2);
  };

  const handleTrade = () => {
    const amountNum = parseFloat(amount) || 0;
    const total = parseFloat(calculateTotal());

    if (tradeType === 'buy') {
      if (total > chzBalance) {
        alert('Insufficient CHZ balance');
        return;
      }
      
      const newBalance = {
        ...userBalance,
        [selectedToken]: tokenBalance + amountNum,
        CHZ: chzBalance - total
      };
      onBalanceUpdate(newBalance);
    } else {
      if (amountNum > tokenBalance) {
        alert('Insufficient token balance');
        return;
      }
      
      const newBalance = {
        ...userBalance,
        [selectedToken]: tokenBalance - amountNum,
        CHZ: chzBalance + total
      };
      onBalanceUpdate(newBalance);
    }

    setAmount('');
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const isMarketOpen = event.marketStatus === 'open';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wallet className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Trade Hype Tokens</h3>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isMarketOpen 
            ? 'bg-green-100 text-green-600' 
            : 'bg-red-100 text-red-600'
        }`}>
          Market {event.marketStatus}
        </div>
      </div>

      {/* Token Selection */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedToken(event.homeTeam.hypeToken)}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedToken === event.homeTeam.hypeToken
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{event.homeTeam.logo}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{event.homeTeam.hypeToken}</div>
              <div className="text-sm text-gray-600">${event.homeTeam.currentPrice.toFixed(3)}</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedToken(event.awayTeam.hypeToken)}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedToken === event.awayTeam.hypeToken
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{event.awayTeam.logo}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{event.awayTeam.hypeToken}</div>
              <div className="text-sm text-gray-600">${event.awayTeam.currentPrice.toFixed(3)}</div>
            </div>
          </div>
        </button>
      </div>

      {/* Trade Type */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            tradeType === 'buy'
              ? 'bg-green-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Buy
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            tradeType === 'sell'
              ? 'bg-red-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingDown className="w-4 h-4 inline mr-2" />
          Sell
        </button>
      </div>

      {/* Balance Display */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Your {selectedToken}</div>
            <div className="text-lg font-bold text-gray-900">{tokenBalance.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">CHZ Balance</div>
            <div className="text-lg font-bold text-gray-900">{chzBalance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Amount to {tradeType}
        </label>
        <div className="relative">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="pr-20"
            disabled={!isMarketOpen}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            {selectedToken}
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="flex space-x-2">
          {['25%', '50%', '75%', 'Max'].map((percentage) => (
            <button
              key={percentage}
              onClick={() => {
                const maxAmount = tradeType === 'buy' 
                  ? chzBalance / selectedTeam.currentPrice 
                  : tokenBalance;
                const multiplier = percentage === 'Max' ? 1 : parseInt(percentage) / 100;
                setAmount((maxAmount * multiplier).toFixed(2));
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
              disabled={!isMarketOpen}
            >
              {percentage}
            </button>
          ))}
        </div>
      </div>

      {/* Trade Summary */}
      {amount && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-semibold">{calculateTotal()} CHZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Price:</span>
              <span className="font-semibold">${selectedTeam.currentPrice.toFixed(3)}</span>
            </div>
            {tradeType === 'buy' && (
              <div className="flex justify-between">
                <span className="text-gray-600">Potential Profit:</span>
                <span className="font-semibold text-green-600">+{calculatePotentialProfit()} CHZ</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hype Indicator */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Current Hype Level</span>
          <span className="text-sm text-gray-600">{selectedTeam.hypePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${selectedTeam.hypePercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Higher hype = higher potential returns
        </div>
      </div>

      {/* Trade Button */}
      <Button
        onClick={handleTrade}
        disabled={!amount || !isMarketOpen || parseFloat(amount) <= 0}
        className={`w-full py-3 font-semibold rounded-xl ${
          tradeType === 'buy'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {!isMarketOpen ? 'Market Closed' : `${tradeType.toUpperCase()} ${selectedToken}`}
      </Button>

      {/* Market Warning */}
      {!isMarketOpen && (
        <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            Trading is currently paused. Check back when the market reopens.
          </span>
        </div>
      )}

      {/* Success Message */}
      {showConfirmation && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700">
            Trade executed successfully!
          </span>
        </div>
      )}
    </div>
  );
};

export default TradingInterface;