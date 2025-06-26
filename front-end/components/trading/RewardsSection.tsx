'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  CheckCircle,
  Clock,
  Coins,
  ArrowRight,
  Sparkles,
  Trophy,
  Calendar
} from 'lucide-react';

const RewardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ready');
  const [claimingReward, setClaimingReward] = useState<number | null>(null);

  // Recompensas prontas para coletar (apenas vitórias)
  const readyToClaimRewards = [
    {
      id: 1,
      gameTitle: 'PSG vs Real Madrid',
      gameDate: '20 Jan',
      betTeam: 'PSG',
      teamLogo: '🔴',
      betAmount: 150,
      rewardAmount: 277.5,
      multiplier: '1.85x',
      gameScore: '2-1'
    },
    {
      id: 2,
      gameTitle: 'Barcelona vs Juventus', 
      gameDate: '19 Jan',
      betTeam: 'Barcelona',
      teamLogo: '🔵',
      betAmount: 200,
      rewardAmount: 290,
      multiplier: '1.45x',
      gameScore: '3-0'
    }
  ];

  // Recompensas já coletadas
  const collectedRewards = [
    {
      id: 3,
      gameTitle: 'Chelsea vs Arsenal',
      gameDate: '18 Jan',
      betTeam: 'Chelsea',
      teamLogo: '🔵',
      betAmount: 180,
      rewardAmount: 324,
      multiplier: '1.8x',
      gameScore: '2-1',
      collectedDate: '18 Jan, 22:45'
    },
    {
      id: 4,
      gameTitle: 'Liverpool vs Man City',
      gameDate: '17 Jan',
      betTeam: 'Liverpool', 
      teamLogo: '🔴',
      betAmount: 100,
      rewardAmount: 200,
      multiplier: '2.0x',
      gameScore: '1-0',
      collectedDate: '17 Jan, 21:30'
    }
  ];

  const handleClaimReward = async (rewardId: number) => {
    setClaimingReward(rewardId);
    
    setTimeout(() => {
      setClaimingReward(null);
      // Mover para coletados
    }, 2000);
  };

  const totalReadyRewards = readyToClaimRewards.reduce((sum, r) => sum + r.rewardAmount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Clean - Cores da Landing */}
      <div className="text-center">

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Suas Recompensas
        </h2>
        <p className="text-gray-600">
          Colete suas recompensas dos jogos vencidos
        </p>
      </div>

      {/* Summary Card Clean - Gradiente da Landing */}
      {totalReadyRewards > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Gift className="w-6 h-6" />
            <span className="text-lg font-semibold">Pronto para Coletar</span>
          </div>
          <div className="text-4xl font-black mb-1">{totalReadyRewards.toFixed(1)} CHZ</div>
          <div className="text-red-100">
            {readyToClaimRewards.length} recompensa{readyToClaimRewards.length !== 1 ? 's' : ''} disponível{readyToClaimRewards.length !== 1 ? 'is' : ''}
          </div>
        </div>
      )}

      {/* Tabs Simples - Cores da Landing */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-xl p-1 shadow-lg border border-gray-100">
          <button
            onClick={() => setActiveTab('ready')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'ready'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Para Coletar</span>
            {readyToClaimRewards.length > 0 && (
              <div className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {readyToClaimRewards.length}
              </div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('collected')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'collected'
                ? 'bg-gray-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Coletados</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'ready' ? (
        <div className="space-y-4">
          {readyToClaimRewards.length > 0 ? (
            readyToClaimRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  {/* Left Side */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                      {reward.teamLogo}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{reward.gameTitle}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                        <span>Apostou em {reward.betTeam}</span>
                        <span>•</span>
                        <span>{reward.gameScore}</span>
                        <span>•</span>
                        <span>{reward.gameDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-1">
                      {reward.rewardAmount} CHZ
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {reward.betAmount} HYPE × {reward.multiplier}
                    </div>
                    
                    <Button 
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={claimingReward === reward.id}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {claimingReward === reward.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Coletando...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4" />
                          <span>Coletar</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Gift className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma recompensa disponível
              </h3>
              <p className="text-gray-600">
                Suas recompensas aparecerão aqui quando seus times vencerem
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {collectedRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl border border-gray-200">
                    {reward.teamLogo}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{reward.gameTitle}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                      <span>Apostou em {reward.betTeam}</span>
                      <span>•</span>
                      <span>{reward.gameScore}</span>
                      <span>•</span>
                      <span>{reward.gameDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {reward.rewardAmount} CHZ
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {reward.betAmount} HYPE × {reward.multiplier}
                  </div>
                  <div className="flex items-center justify-end space-x-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                    <span>Coletado em {reward.collectedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardsSection;