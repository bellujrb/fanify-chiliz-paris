'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Hash, 
  TrendingUp, 
  Users, 
  Play,
  Calendar,
  MapPin,
  Trophy
} from 'lucide-react';

interface Team {
  name: string;
  shortName: string;
  logo: string;
  hypeToken: string;
  currentPrice: number;
  change: string;
  hypePercentage: number;
}

interface Event {
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

interface EventCardProps {
  event: Event;
  onSelect: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'finished':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMarketStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-600 bg-green-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'closed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-red-600 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">{event.competition}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status === 'live' && <Play className="w-3 h-3 inline mr-1" />}
              {event.status.toUpperCase()}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMarketStatusColor(event.marketStatus)}`}>
              Market {event.marketStatus}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-white/90 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
          <span>•</span>
          <Calendar className="w-4 h-4" />
          <span>{event.date} at {event.time}</span>
        </div>
      </div>

      {/* Teams and Score */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl">
              {event.homeTeam.logo}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{event.homeTeam.shortName}</h3>
              <p className="text-sm text-gray-600">{event.homeTeam.name}</p>
            </div>
          </div>

          {/* Score or VS */}
          <div className="text-center">
            {event.status === 'live' && event.currentScore ? (
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {event.currentScore.home} - {event.currentScore.away}
                </div>
                <div className="text-sm text-gray-600">{event.minute}'</div>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-400">VS</div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg text-right">{event.awayTeam.shortName}</h3>
              <p className="text-sm text-gray-600 text-right">{event.awayTeam.name}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl flex items-center justify-center text-3xl">
              {event.awayTeam.logo}
            </div>
          </div>
        </div>

        {/* Hype Tokens */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{event.homeTeam.hypeToken}</span>
              <span className="text-green-600 text-sm font-medium">{event.homeTeam.change}</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">${event.homeTeam.currentPrice}</div>
            <div className="text-sm text-gray-600">Hype: {event.homeTeam.hypePercentage}%</div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border border-pink-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{event.awayTeam.hypeToken}</span>
              <span className="text-green-600 text-sm font-medium">{event.awayTeam.change}</span>
            </div>
            <div className="text-2xl font-bold text-pink-600">${event.awayTeam.currentPrice}</div>
            <div className="text-sm text-gray-600">Hype: {event.awayTeam.hypePercentage}%</div>
          </div>
        </div>

        {/* Hashtag */}
        <div className="bg-gray-50 p-3 rounded-xl mb-4">
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-sm text-gray-700">{event.hashtag}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Volume: {formatVolume(event.totalVolume)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{event.activeTraders.toLocaleString()} traders</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onSelect}
          className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl"
        >
          Trade Hype Tokens
        </Button>
      </div>
    </div>
  );
};

export default EventCard;