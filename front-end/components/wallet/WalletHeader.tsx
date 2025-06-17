'use client';

import React from 'react';

interface Athlete {
  name: string;
  sport: string;
  team: string;
  fanTokenSymbol: string;
  fanTokenPrice: string;
  fanTokenChange: string;
  avatar: string;
  totalFans: string;
  myTokens: number;
  myRank: number;
}

interface WalletHeaderProps {
  athlete: Athlete;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ athlete }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-red-600 p-8 text-white">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-4xl backdrop-blur-sm">
          {athlete.avatar}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{athlete.name}</h2>
          <p className="text-white/90 mb-4">{athlete.sport} • {athlete.team}</p>
          <div className="flex items-center space-x-6">
            <div>
              <div className="text-2xl font-bold">{athlete.myTokens}</div>
              <div className="text-white/80 text-sm">{athlete.fanTokenSymbol} Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold">#{athlete.myRank}</div>
              <div className="text-white/80 text-sm">Ranking</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{athlete.totalFans}</div>
              <div className="text-white/80 text-sm">Total Fans</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-sm text-white/80 mb-1">Token Price</div>
            <div className="text-2xl font-bold">${athlete.fanTokenPrice}</div>
            <div className="text-green-300 text-sm">{athlete.fanTokenChange}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;