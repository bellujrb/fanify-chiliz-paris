'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Shield, Activity } from 'lucide-react';
import Link from 'next/link';
import AdminNavigationTabs from '@/components/admin/AdminNavigationTabs';
import GamesSection from '@/components/admin/GamesSection';
import SystemSection from '@/components/admin/SystemSection';
import GamesData from '@/components/admin/GamesData';
import TradingHeader from '@/components/trading/TradingHeader';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreateGameModal from '@/components/admin/CreateGameModal';

export default function AdminPage() {
  const [selectedGame, setSelectedGame] = useState('psg-bot');
  const [activeSection, setActiveSection] = useState('games');

  const liveGames = [
    {
      id: 'psg-bot',
      homeTeam: { name: 'PSG', logo: '🔴', hype: 62 },
      awayTeam: { name: 'BOT', logo: '🤖', hype: 38 },
      status: 'Live',
      time: '45 min left',
      competition: 'Champions League',
      score: '1-1',
      minute: 67
    },
  ];

  const currentGame = liveGames.find(game => game.id === selectedGame) || liveGames[0];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'games':
        return (
          <div>
            <CreateGameModal />
            <GamesSection
              currentGame={currentGame}
              liveGames={liveGames}
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
          </div>
        );
      case 'stats':
        return (
          <div>
            <CreateGameModal />
            <GamesData
              currentGame={currentGame}
              liveGames={liveGames}
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
          </div>
        );
      case 'system':
        return (
          <div>
            <CreateGameModal />
            <SystemSection />
          </div>
        );
      default:
        return (
          <div>
            <CreateGameModal />
            <GamesSection
              currentGame={currentGame}
              liveGames={liveGames}
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
            />
          </div>
        );
    }
  };

  // Função mock para gerar dados de hype por dia para cada jogo

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin customizado */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-gray-900">Fanify</span>
                <div className="text-xs text-white font-medium bg-red-500 px-2 py-1 rounded flex items-center gap-1">
                  <Shield className="w-4 h-4 mr-1" /> Admin
                </div>
              </div>
            </div>
            {/* Right Side - Connect Wallet */}
            <div>
              <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminNavigationTabs
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        {renderActiveSection()}
      </div>
    </div>
  );
}