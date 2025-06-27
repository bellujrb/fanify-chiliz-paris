'use client';

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Clock,
  Target,
  Zap,
  Trophy,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPublicClient, getContract, http } from 'viem';
import { spicy } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';

const MyTokensSection: React.FC = () => {
  // User's active bets/positions
  const activeBets = [
    {
      id: 1,
      team: 'PSG',
      teamLogo: '🔴',
      betType: 'Win',
      hypeAmount: 150,
      odds: 1.85,
      potentialWin: 277.5,
      currentValue: 165.2,
      profit: 15.2,
      profitPercent: '+10.1%',
      status: 'winning',
      timeRemaining: '23 min',
      gameStatus: 'Live',
      hypeId: '0x12345678', // MOCK: replace with real hypeId
    },
    {
      id: 2,
      team: 'REAL',
      teamLogo: '⚪',
      betType: 'Win',
      hypeAmount: 75,
      odds: 2.1,
      potentialWin: 157.5,
      currentValue: 68.5,
      profit: -6.5,
      profitPercent: '-8.7%',
      status: 'losing',
      timeRemaining: '23 min',
      gameStatus: 'Live',
      hypeId: '0x23456789', // MOCK: replace with real hypeId
    },
    {
      id: 3,
      team: 'BAR',
      teamLogo: '🔵',
      betType: 'Win',
      hypeAmount: 200,
      odds: 1.45,
      potentialWin: 290,
      currentValue: 245.8,
      profit: 45.8,
      profitPercent: '+22.9%',
      status: 'winning',
      timeRemaining: '12 min',
      gameStatus: 'Live',
      hypeId: '0x34567890', // MOCK: replace with real hypeId
    }
  ];

  const [betStatuses, setBetStatuses] = useState<Record<string, { status: number; goalsA: number; goalsB: number } | null>>({});
  const [loadingStatuses, setLoadingStatuses] = useState<Record<string, boolean>>({});
  const publicClient = createPublicClient({ chain: spicy, transport: http() });

  useEffect(() => {
    activeBets.forEach((bet) => {
      if (!bet.hypeId) return;
      setLoadingStatuses((prev) => ({ ...prev, [bet.hypeId]: true }));
      const fetchStatus = async () => {
        try {
          const oracleContract = getContract({
            address: deployedContracts.Oracle.address as `0x${string}`,
            abi: deployedContracts.Oracle.abi,
            client: publicClient,
          });
          const data = await oracleContract.read.getMatch([
            bet.hypeId as `0x${string}`
          ]);
          setBetStatuses((prev) => ({
            ...prev,
            [bet.hypeId]: {
              status: Number(data[7]),
              goalsA: Number(data[2]),
              goalsB: Number(data[3]),
            },
          }));
        } catch (err) {
          setBetStatuses((prev) => ({ ...prev, [bet.hypeId]: null }));
        }
        setLoadingStatuses((prev) => ({ ...prev, [bet.hypeId]: false }));
      };
      fetchStatus();
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'winning':
        return 'from-green-500 to-emerald-600';
      case 'losing':
        return 'from-brand-500 to-brand-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'winning':
        return <TrendingUp className="w-4 h-4" />;
      case 'losing':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const totalInvested = activeBets.reduce((sum, bet) => sum + bet.hypeAmount, 0);
  const totalCurrentValue = activeBets.reduce((sum, bet) => sum + bet.currentValue, 0);
  const totalProfit = totalCurrentValue - totalInvested;
  const totalProfitPercent = ((totalProfit / totalInvested) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-brand-600 rounded-xl flex items-center justify-center text-white">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Minhas Apostas</h3>
            <p className="text-sm text-gray-600">Posições ativas em tempo real</p>
          </div>
        </div>
        
        {/* Portfolio Summary */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{totalInvested} HYPE</div>
          <div className={`text-sm font-semibold ${
            totalProfit >= 0 ? 'text-green-600' : 'text-brand-600'
          }`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(1)} ({Number(totalProfitPercent) >= 0 ? '+' : ''}{totalProfitPercent}%)
          </div>
        </div>
      </div>

      {/* Active Bets */}
      <div className="space-y-4">
        {activeBets.map((bet) => (
          <div key={bet.id} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              {/* Left Side - Team & Bet Info */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(bet.status)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <span className="text-xl">{bet.teamLogo}</span>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-gray-900">Apostou em {bet.team}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bet.status === 'winning' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-brand-100 text-brand-600'
                    }`}>
                      {/* Real game status from blockchain */}
                      {loadingStatuses[bet.hypeId]
                        ? '...'
                        : betStatuses[bet.hypeId]
                          ? (betStatuses[bet.hypeId]!.status === 0
                              ? 'Not started yet'
                              : `${betStatuses[bet.hypeId]!.goalsA}-${betStatuses[bet.hypeId]!.goalsB} • 67'` // TODO: Replace 67' with actual time if available
                            )
                          : '...'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Apostou <span className="font-semibold text-purple-600">{bet.hypeAmount} HYPE</span></span>
                    <span>•</span>
                    <span>Odds: {bet.odds}x</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{bet.timeRemaining}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Performance */}
              <div className="text-right">
                <div className="flex items-center space-x-3 mb-2">
                  <div>
                    <div className="text-sm text-gray-600">Valor Atual</div>
                    <div className="text-lg font-bold text-gray-900">{bet.currentValue.toFixed(1)} HYPE</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Lucro Potencial</div>
                    <div className="text-lg font-bold text-blue-600">{bet.potentialWin} HYPE</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    bet.profit >= 0 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-brand-100 text-brand-600'
                  }`}>
                    {getStatusIcon(bet.status)}
                    <span>{bet.profitPercent}</span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <DollarSign className="w-3 h-3 mr-1" />
                    Cash Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${getStatusColor(bet.status)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, (bet.currentValue / bet.potentialWin) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Investido: {bet.hypeAmount} HYPE</span>
                <span>Meta: {bet.potentialWin} HYPE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{activeBets.length}</div>
            <div className="text-sm text-gray-600">Apostas Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalInvested}</div>
            <div className="text-sm text-gray-600">HYPE Investido</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              totalProfit >= 0 ? 'text-green-600' : 'text-brand-600'
            }`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Lucro/Prejuízo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTokensSection;