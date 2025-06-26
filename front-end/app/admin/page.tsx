'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import GameSelector from '@/components/admin/GameSelector';
import GameControls from '@/components/admin/GameControls';

export default function AdminPage() {
  const [selectedGame, setSelectedGame] = useState('psg-real');

  const liveGames = [
    {
      id: 'psg-real',
      homeTeam: { name: 'PSG', logo: '🔴', hype: 62 },
      awayTeam: { name: 'REAL', logo: '⚪', hype: 38 },
      status: 'Live',
      time: '45 min left',
      competition: 'El Clásico',
      score: '1-1',
      minute: 67
    },
    {
      id: 'barcelona-juventus',
      homeTeam: { name: 'BAR', logo: '🔵', hype: 78 },
      awayTeam: { name: 'JUV', logo: '⚫', hype: 22 },
      status: 'Live',
      time: '23 min left',
      competition: 'Champions League',
      score: '2-0',
      minute: 78
    },
    {
      id: 'milan-inter',
      homeTeam: { name: 'MIL', logo: '🔴', hype: 45 },
      awayTeam: { name: 'INT', logo: '🔵', hype: 55 },
      status: 'Starting Soon',
      time: '2h 15min',
      competition: 'Derby della Madonnina',
      score: '-'
    }
  ];

  const currentGame = liveGames.find(game => game.id === selectedGame) || liveGames[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/trading">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Trading
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-600">Game Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Activity className="w-4 h-4 text-green-500" />
                <span>System Online</span>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Overview */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Game Management</h2>
              <p className="text-white/90 text-lg">Control all aspects of live games and betting</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1">Active Games</div>
              <div className="text-4xl font-bold">{liveGames.filter(g => g.status === 'Live').length}</div>
              <div className="text-white/80 text-sm">Currently running</div>
            </div>
          </div>
        </div>

        {/* Game Selector */}
        <GameSelector
          currentGame={currentGame}
          liveGames={liveGames}
          selectedGame={selectedGame}
          onGameSelect={setSelectedGame}
        />

        {/* Game Controls */}
        <GameControls currentGame={currentGame} />

        {/* System Status */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <div className="text-sm text-gray-600">System Status</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Active Bots</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">12.5K</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">$2.1M</div>
              <div className="text-sm text-gray-600">Total Volume</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}