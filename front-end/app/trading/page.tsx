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
import { useSmartContractGames } from '@/hooks/useSmartContractGames';

export default function TradingApp() {
  const { games, loading: gamesLoading } = useSmartContractGames();
  const [selectedGame, setSelectedGame] = useState('');
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

  // Map SmartContractGame to Game interface
  const mappedGames = games.map(g => ({
    hypeId: g.hypeId,
    homeTeam: { name: g.teamA, logo: '🔴', hype: 0 }, // TODO: replace logo/hype with real data if available
    awayTeam: { name: g.teamB, logo: '🔵', hype: 0 },
    status: g.status,
    goalsA: g.goalsA,
    goalsB: g.goalsB,
  }));
  const currentGame = mappedGames.find(game => game.hypeId === selectedGame) || mappedGames[0];

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
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
            <TokenBalance userTokens={userTokens} />
            {currentGame ? (
              <TradingSection
                currentGame={currentGame}
                liveData={liveData}
              />
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center text-gray-400 mt-6">
                No game data to display.
              </div>
            )}
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
              <span className="font-medium">Connect your wallet to access this section.</span>
            </div>
          </div>
        ) : (
          <>
            {games.length === 0 && (
              <div className="mb-6 flex items-center justify-center">
                <div className="bg-gray-100 border border-gray-200 text-gray-500 px-6 py-4 rounded-xl shadow text-center flex items-center space-x-3">
                  <span className="font-medium">No games available.</span>
                </div>
              </div>
            )}
            {renderContent()}
          </>
        )}
      </div>
    </div>
  );
}