'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  TrendingUp, 
  Hash,
  Share2,
  Trophy,
  Clock,
  Twitter
} from 'lucide-react';
import HypeChart from './HypeChart';
import TradingInterface from './TradingInterface';
import SocialEngagement from './SocialEngagement';

export interface Team {
  name: string;
  shortName: string;
  logo: string;
  hypeToken: string;
  currentPrice: number;
  change: string;
  hypePercentage: number;
}

export interface Event {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  marketStatus: 'open' | 'paused' | 'closed';
  hashtag: string;
  venue: string;
  competition: string;
  currentScore?: { home: number; away: number };
  minute?: number;
  totalVolume: number;
  activeTraders: number;
}

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState<'trade' | 'social'>('trade');
  const [userBalance, setUserBalance] = useState<Record<string, number>>({
    [event.homeTeam.hypeToken]: 25,
    [event.awayTeam.hypeToken]: 15,
    CHZ: 1250.50
  });

  // Mock real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price fluctuations
      const homeChange = (Math.random() - 0.5) * 0.1;
      const awayChange = (Math.random() - 0.5) * 0.1;
      
      event.homeTeam.currentPrice += homeChange;
      event.awayTeam.currentPrice += awayChange;
      
      // Update hype percentages based on score if live
      if (event.status === 'live' && event.currentScore) {
        const scoreDiff = event.currentScore.home - event.currentScore.away;
        if (scoreDiff > 0) {
          event.homeTeam.hypePercentage = Math.min(85, event.homeTeam.hypePercentage + 1);
          event.awayTeam.hypePercentage = Math.max(15, event.awayTeam.hypePercentage - 1);
        } else if (scoreDiff < 0) {
          event.awayTeam.hypePercentage = Math.min(85, event.awayTeam.hypePercentage + 1);
          event.homeTeam.hypePercentage = Math.max(15, event.homeTeam.hypePercentage - 1);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [event]);

  const generateTweetUrl = () => {
    const text = `🔥 Trading ${event.homeTeam.shortName} vs ${event.awayTeam.shortName} hype tokens on @Fanify! ${event.hashtag} #ChilizChain #FanTokens`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  };

  const tabs = [
    { id: 'trade', label: 'Trade Tokens', icon: TrendingUp },
    { id: 'social', label: 'Social Engagement', icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Trading</span>
              </div>
              <div className="text-sm">
                Market: <span className="font-semibold">{event.marketStatus.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Home Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-3 backdrop-blur-sm">
                {event.homeTeam.logo}
              </div>
              <h3 className="text-xl font-bold">{event.homeTeam.name}</h3>
              <p className="text-white/80">{event.homeTeam.shortName}</p>
            </div>

            {/* Score/Time */}
            <div className="text-center">
              {event.status === 'live' && event.currentScore ? (
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {event.currentScore.home} - {event.currentScore.away}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.minute}' LIVE</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold mb-2">{event.time}</div>
                  <div className="text-white/80">{event.date}</div>
                </div>
              )}
              <div className="mt-2 text-sm text-white/80">{event.venue}</div>
            </div>

            {/* Away Team */}
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-3 backdrop-blur-sm">
                {event.awayTeam.logo}
              </div>
              <h3 className="text-xl font-bold">{event.awayTeam.name}</h3>
              <p className="text-white/80">{event.awayTeam.shortName}</p>
            </div>
          </div>
        </div>

        {/* Hype Meter */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Fan Hype Distribution</span>
              <span className="text-sm text-gray-600">Real-time sentiment</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-1000"
                  style={{ width: `${event.homeTeam.hypePercentage}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-1000"
                  style={{ width: `${event.awayTeam.hypePercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{event.homeTeam.shortName}: {event.homeTeam.hypePercentage}%</span>
              <span>{event.awayTeam.shortName}: {event.awayTeam.hypePercentage}%</span>
            </div>
          </div>

          {/* Official Hashtag */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="font-semibold text-gray-900">Official Hashtag</span>
                  <div className="font-mono text-purple-600">{event.hashtag}</div>
                </div>
              </div>
              <Button
                onClick={() => window.open(generateTweetUrl(), '_blank')}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'trade' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <HypeChart event={event} />
              </div>
              <div>
                <TradingInterface 
                  event={event} 
                  userBalance={userBalance}
                  onBalanceUpdate={setUserBalance}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'social' && (
            <SocialEngagement event={event} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;