'use client';

import React from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Target
} from 'lucide-react';

interface Event {
  homeTeam: { shortName: string; name: string };
  awayTeam: { shortName: string; name: string };
}

interface FanRankingProps {
  event: Event;
}

const FanRanking: React.FC<FanRankingProps> = ({ }) => {
  const topFans = [
    {
      id: 1,
      username: 'CryptoFan2024',
      avatar: '👑',
      points: 2847,
    },
    {
      id: 2,
      username: 'TokenMaster',
      avatar: '🏆',
      points: 2156,
    },
    {
      id: 3,
      username: 'HypeTrader',
      avatar: '⭐',
      points: 1923,
    },
    {
      id: 4,
      username: 'SportsFanatic',
      avatar: '🚀',
      points: 1756,
    },
    {
      id: 5,
      username: 'BlockchainBull',
      avatar: '💎',
      points: 1634,
    }
  ];

  const myRanking = {
    position: 847,
    username: 'YourUsername',
    points: 1247,
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-400" />;
    }
  };


  return (
    <div className="space-y-8">
      {/* My Ranking Card */}
      <div className="bg-gradient-to-r from-purple-600 to-red-600 p-6 rounded-2xl text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6" />
          <h3 className="text-xl font-bold">Your Ranking</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold">#{myRanking.position}</div>
            <div className="text-white/80 text-sm">Global Rank</div>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold">{myRanking.points.toLocaleString()}</div>
            <div className="text-white/80 text-sm">Points</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Event Leaderboard</h3>
          <div className="text-sm text-gray-600">
            Updated every 5 minutes
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
              <span className="col-span-3">Rank</span>
              <span className="col-span-6">Fan</span>
              <span className="col-span-3 text-right">Points</span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {topFans.map((fan, index) => (
              <div key={fan.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="flex items-center space-x-2 col-span-3">
                    {getRankIcon(index + 1)}
                    <span className="font-bold text-gray-900">#{index + 1}</span>
                  </div>

                  <div className="flex items-center space-x-3 col-span-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      {fan.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{fan.username}</div>
                    </div>
                  </div>

                  <div className="font-semibold text-gray-900 col-span-3 text-right">{fan.points.toLocaleString()}</div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FanRanking;