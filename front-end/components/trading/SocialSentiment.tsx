'use client';

import React from 'react';
import { Twitter } from 'lucide-react';

interface Game {
  homeTeam: { name: string; hype: number };
  awayTeam: { name: string; hype: number };
}

interface SocialSentimentProps {
  currentGame: Game;
}

const SocialSentiment: React.FC<SocialSentimentProps> = ({ currentGame }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Social Sentiment</h3>
        <Twitter className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pro-{currentGame.homeTeam.name}</span>
          <span className="font-bold text-brand-600">{Math.round(currentGame.homeTeam.hype)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${currentGame.homeTeam.hype}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pro-{currentGame.awayTeam.name}</span>
          <span className="font-bold text-blue-600">{Math.round(currentGame.awayTeam.hype)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${currentGame.awayTeam.hype}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SocialSentiment;