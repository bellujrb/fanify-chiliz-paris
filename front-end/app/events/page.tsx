'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import EventCard from '@/components/events/EventCard';
import EventDetails, { type Event } from '@/components/events/EventDetails';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const liveEvents: Event[] = [
  {
    id: 'real-vs-bar-20250621',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'REAL',
      logo: '⚪',
      hypeToken: 'REAL_HYPE',
      currentPrice: 3.21,
      change: '+15.7%',
      hypePercentage: 72
    },
    awayTeam: {
      name: 'Botafogo',
      shortName: 'BOT',
      logo: '🔵',
      hypeToken: 'BOT_HYPE',
      currentPrice: 2.98,
      change: '+11.2%',
      hypePercentage: 28
    },
    date: '2025-07-01',
    time: '16:00',
    status: 'upcoming',
    marketStatus: 'open',
    hashtag: '#Chiliz_REALxBOT_20250701',
    venue: 'Rose Bowl',
    competition: 'World Cup Teams',
    totalVolume: 2100000,
    activeTraders: 12350
  }
];


  const selectedEventData = liveEvents.find(event => event.id === selectedEvent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/wallet">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Wallet
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Live Events & Hype Trading
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Markets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedEvent ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Total Volume</h3>
                </div>
                <div className="text-3xl font-bold text-purple-600">$4.24M</div>
                <div className="text-sm text-gray-600">Last 24h</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">Active Traders</h3>
                </div>
                <div className="text-3xl font-bold text-pink-600">27.5K</div>
                <div className="text-sm text-gray-600">Currently trading</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-6 h-6 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Live Events</h3>
                </div>
                <div className="text-3xl font-bold text-red-600">{liveEvents.filter(e => e.status === 'live').length}</div>
                <div className="text-sm text-gray-600">Happening now</div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Updated every 30 seconds</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={() => setSelectedEvent(event.id)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <EventDetails
            event={selectedEventData!}
            onBack={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}