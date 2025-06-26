'use client';

import React, { useState, useEffect } from 'react';
import TradingHeader from '@/components/trading/TradingHeader';
import NavigationTabs from '@/components/trading/NavigationTabs';
import GameSelector from '@/components/trading/GameSelector';
import TokenBalance from '@/components/trading/TokenBalance';
import TradingSection from '@/components/trading/TradingSection';
import StakingSection from '@/components/trading/StakingSection';
import LeaderboardSection from '@/components/trading/LeaderboardSection';
import RewardsSection from '@/components/trading/RewardsSection';
import { useAccount } from 'wagmi';

export default function TradingApp() {
  const [selectedGame, setSelectedGame] = useState('psg-real');
  const [activeSection, setActiveSection] = useState('trading');
  const [liveData, setLiveData] = useState({
    psgHype: 62,
    realHype: 38,
    tweets: 26500,
    totalFans: 47500,
    volume: 2100000,
    activeTraders: 12350,
    psgOdds: 1.4,
    realOdds: 3.7
  });

  // User token balance
  const [userTokens] = useState({
    CHZ: 1250.50,
    HYPE_PSG: 45,
    HYPE_REAL: 23,
    totalValue: 2847.50
  });

  const { isConnected } = useAccount();

  // Simulate real-time updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        const psgChange = (Math.random() - 0.5) * 6;
        const newPsgHype = Math.max(25, Math.min(75, prev.psgHype + psgChange));
        const newRealHype = 100 - newPsgHype;
        
        return {
          ...prev,
          psgHype: newPsgHype,
          realHype: newRealHype,
          tweets: prev.tweets + Math.floor(Math.random() * 150) + 50,
          activeTraders: prev.activeTraders + Math.floor(Math.random() * 100) - 50,
          volume: prev.volume + Math.floor(Math.random() * 50000),
          psgOdds: 1.2 + (newRealHype / 100) * 2.5,
          realOdds: 1.2 + (newPsgHype / 100) * 2.5
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const liveGames = [
    {
      id: 'psg-real',
      homeTeam: { name: 'PSG', logo: '🔴', hype: liveData.psgHype },
      awayTeam: { name: 'REAL', logo: '⚪', hype: liveData.realHype },
      status: 'Live',
      time: '45 min left',
      competition: 'El Clásico',
      score: '1-1',
      minute: 67
    },
    {
      id: 'barcelona-juventus',
      homeTeam: { name: 'BAR', logo: '🔵', hype: 78 },
      awayTeam: { name: 'JUV', logo: '⚫', hype: 22 },
      status: 'Live',
      time: '23 min left',
      competition: 'Champions League',
      score: '2-0',
      minute: 78
    },
    {
      id: 'milan-inter',
      homeTeam: { name: 'MIL', logo: '🔴', hype: 45 },
      awayTeam: { name: 'INT', logo: '🔵', hype: 55 },
      status: 'Starting Soon',
      time: '2h 15min',
      competition: 'Derby della Madonnina',
      score: '-'
    }
  ];

  const currentGame = liveGames.find(game => game.id === selectedGame) || liveGames[0];

  const recentTrades = [
    { user: 'User_4829', action: 'Bought PSG', amount: '50 HYPE', time: '2s', profit: '+12%' },
    { user: 'User_7391', action: 'Sold REAL', amount: '25 HYPE', time: '8s', profit: '+8%' },
    { user: 'User_2847', action: 'Bought PSG', amount: '100 HYPE', time: '15s', profit: '+15%' },
    { user: 'User_9156', action: 'Sold PSG', amount: '75 HYPE', time: '23s', profit: '+5%' }
  ];

  const chartData = [
    { time: '10:00', psg: 45, real: 55 },
    { time: '10:15', psg: 48, real: 52 },
    { time: '10:30', psg: 52, real: 48 },
    { time: '10:45', psg: 58, real: 42 },
    { time: '11:00', psg: Math.round(liveData.psgHype), real: Math.round(liveData.realHype) },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'trading':
        return (
          <>
            <GameSelector
              currentGame={currentGame}
              liveGames={liveGames}
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
            <TokenBalance userTokens={userTokens} />
            <TradingSection
              currentGame={currentGame}
              liveData={liveData}
              recentTrades={recentTrades}
              chartData={chartData}
            />
          </>
        );
      case 'staking':
        return <StakingSection />;
      case 'leaderboard':
        return <LeaderboardSection />;
      case 'rewards':
        return <RewardsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TradingHeader
        currentGame={currentGame}
        liveGames={liveGames}
        selectedGame={selectedGame}
        onGameSelect={setSelectedGame}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationTabs
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {(activeSection === 'staking' || activeSection === 'rewards') && !isConnected ? (
          <div className="mb-6 flex items-center justify-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-xl shadow text-center flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 2.25h.008v.008H12v-.008zm.75-8.25a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-6 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm12 0a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-9.53 4.28a.75.75 0 00-1.06 1.06l.53.53a.75.75 0 001.06-1.06l-.53-.53zm10.06 0a.75.75 0 00-1.06 1.06l.53.53a.75.75 0 001.06-1.06l-.53-.53zM12 19.5a.75.75 0 00.75-.75v-.75a.75.75 0 00-1.5 0v.75a.75.75 0 00.75.75z" />
              </svg>
              <span className="font-medium">Conecte sua wallet para acessar esta seção.</span>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}