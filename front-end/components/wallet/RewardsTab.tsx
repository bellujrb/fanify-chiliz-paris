'use client';

import React from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Clock, 
  Target, 
  ChevronRight 
} from 'lucide-react';

interface Athlete {
  myRank: number;
  daysLeft: number;
}

interface RewardsTabProps {
  athlete: Athlete;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ athlete }) => {
  const upcomingRewards = [
    {
      rank: '1-10',
      reward: '1 Legendary NFT + 50 Fan Tokens',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      rank: '11-50',
      reward: '1 Epic NFT + 25 Fan Tokens',
      icon: Trophy,
      color: 'from-purple-400 to-purple-600'
    },
    {
      rank: '51-200',
      reward: '1 Rare NFT + 10 Fan Tokens',
      icon: Medal,
      color: 'from-blue-400 to-blue-600'
    },
    {
      rank: '201-500',
      reward: '5 Fan Tokens',
      icon: Star,
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Season Rewards</h3>
            <p className="opacity-90">Finish among the best and win exclusive prizes</p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span>Time left:</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-bold">{athlete.daysLeft} days</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Position Rewards</h4>
        
        {upcomingRewards.map((reward, index) => {
          const IconComponent = reward.icon;
          const isMyRange = index === 2; // Simulating user is in 51-200 range
          
          return (
            <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg border ${isMyRange ? 'border-purple-300 ring-2 ring-purple-200' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${reward.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-900">Position {reward.rank}</h4>
                    {isMyRange && (
                      <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                        Your current tier
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600">{reward.reward}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-green-600" />
          <h4 className="font-bold text-gray-900">Personal Goal</h4>
        </div>
        <p className="text-gray-600 mb-4">
          You need <span className="font-bold text-green-600">892 points</span> to move up to position <span className="font-bold">#200</span> and secure a Rare NFT!
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{ width: '68%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Current position: #{athlete.myRank}</span>
          <span>Goal: #200</span>
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;