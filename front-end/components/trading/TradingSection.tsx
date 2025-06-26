'use client';

import React from 'react';
import LiveHypeDisplay from './LiveHypeDisplay';
import SocialSentiment from './SocialSentiment';

interface Game {
  hypeId: string;
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
  status: string;
  goalsA: number;
  goalsB: number;
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
}

const TradingSection: React.FC<TradingSectionProps> = ({
  currentGame,
  liveData,
}) => {
  return (
    <div className="space-y-6">
      {/* Trading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Hype Trading */}
        <div className="lg:col-span-2 space-y-6">
          <LiveHypeDisplay currentGame={currentGame} liveData={liveData} />
          {/* <HypeChart chartData={chartData} currentGame={currentGame} /> */}
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-6">
          <SocialSentiment currentGame={currentGame} />
        </div>
      </div>
    </div>
  );
};

export default TradingSection;