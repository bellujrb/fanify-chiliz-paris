'use client';

import React from 'react';
import MyTokensSection from './MyTokensSection';
import LiveHypeDisplay from './LiveHypeDisplay';
import HypeChart from './HypeChart';
import LiveStats from './LiveStats';
import RecentTrades from './RecentTrades';
import SocialSentiment from './SocialSentiment';

interface Game {
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
}

interface LiveData {
  psgHype: number;
  realHype: number;
  tweets: number;
  totalFans: number;
  volume: number;
  activeTraders: number;
  psgOdds: number;
  realOdds: number;
}

interface Trade {
  user: string;
  action: string;
  amount: string;
  time: string;
  profit: string;
}

interface ChartData {
  time: string;
  psg: number;
  real: number;
}

interface TradingSectionProps {
  currentGame: Game;
  liveData: LiveData;
  recentTrades: Trade[];
  chartData: ChartData[];
}

const TradingSection: React.FC<TradingSectionProps> = ({
  currentGame,
  liveData,
  recentTrades,
  chartData
}) => {
  return (
    <div className="space-y-6">
      {/* Trading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Hype Trading */}
        <div className="lg:col-span-2 space-y-6">
          <LiveHypeDisplay currentGame={currentGame} liveData={liveData} />
          <HypeChart chartData={chartData} currentGame={currentGame} />
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-6">
          <LiveStats liveData={liveData} />
          <RecentTrades trades={recentTrades} />
          <SocialSentiment currentGame={currentGame} />
        </div>
      </div>
    </div>
  );
};

export default TradingSection;