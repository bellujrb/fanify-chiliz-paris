'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Zap, 
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Volume2
} from 'lucide-react';

interface Athlete {
  myRank: number;
  totalRanked: number;
  points: number;
  daysLeft: number;
  level: string;
  levelProgress: number;
}

interface OverviewTabProps {
  athlete: Athlete;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ athlete }) => {
  const recentActivity = [
    {
      type: 'comment',
      action: 'Commented on post',
      points: '+10',
      time: '5 min',
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      type: 'share',
      action: 'Shared story',
      points: '+15',
      time: '8 min',
      icon: Share2,
      color: 'text-green-500'
    },
    {
      type: 'vote',
      action: 'Voted on music',
      points: '+20',
      time: '1h',
      icon: Volume2,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <Trophy className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900">My Ranking</h3>
          </div>
          <div className="text-3xl font-bold text-purple-600">#{athlete.myRank.toLocaleString()}</div>
          <div className="text-sm text-gray-600">of {athlete.totalRanked.toLocaleString()} fans</div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border border-pink-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-6 h-6 text-pink-600" />
            <h3 className="font-semibold text-gray-900">Points</h3>
          </div>
          <div className="text-3xl font-bold text-pink-600">{athlete.points.toLocaleString()}</div>
          <div className="text-sm text-gray-600">this month</div>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold text-gray-900">Season</h3>
          </div>
          <div className="text-3xl font-bold text-red-600">{athlete.daysLeft}</div>
          <div className="text-sm text-gray-600">days remaining</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-red-600 rounded-xl flex items-center justify-center text-white text-xl">
              {athlete.level === 'Fã Dedicado' ? '🔥' : athlete.level === 'Fã Ativo' ? '⭐' : '👤'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{athlete.level}</h3>
              <p className="text-sm text-gray-600">Current level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              {athlete.levelProgress}%
            </div>
            <div className="text-sm text-gray-600">to next level</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-red-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${athlete.levelProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Regular Fan</span>
          <span>Active Fan</span>
          <span>Dedicated Fan</span>
          <span>Superfan</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <IconComponent className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-600">há {activity.time}</div>
                </div>
                <div className="text-green-600 font-semibold">{activity.points}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;