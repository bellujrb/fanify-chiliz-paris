'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet } from 'lucide-react';
import Link from 'next/link';
import AthleteSelector from '@/components/wallet/AthleteSelector';
import WalletHeader from '@/components/wallet/WalletHeader';
import WalletTabs from '@/components/wallet/WalletTabs';
import OverviewTab from '@/components/wallet/OverviewTab';
import NFTsTab from '@/components/wallet/NFTsTab';
import RewardsTab from '@/components/wallet/RewardsTab';

export default function FanWalletDashboard() {
  const [selectedAthlete, setSelectedAthlete] = useState('neymar');
  const [activeTab, setActiveTab] = useState<'overview' | 'nfts' | 'rewards'>('overview');

  const athletes = [
    {
      id: 'neymar',
      name: 'Neymar Jr',
      sport: 'Futebol',
      team: 'Al-Hilal',
      fanTokenSymbol: 'NEY',
      fanTokenPrice: '2.45',
      fanTokenChange: '+12.5%',
      avatar: '👑',
      totalFans: '2.1M',
      myTokens: 127,
      myRank: 847,
      totalRanked: 15420,
      level: 'Fã Dedicado',
      levelProgress: 75,
      points: 2847,
      daysLeft: 23
    },
    {
      id: 'messi',
      name: 'Lionel Messi',
      sport: 'Futebol',
      team: 'Inter Miami',
      fanTokenSymbol: 'MESSI',
      fanTokenPrice: '3.21',
      fanTokenChange: '+8.2%',
      avatar: '🐐',
      totalFans: '3.5M',
      myTokens: 89,
      myRank: 1205,
      totalRanked: 22100,
      level: 'Fã Ativo',
      levelProgress: 45,
      points: 1923,
      daysLeft: 23
    },
    {
      id: 'lebron',
      name: 'LeBron James',
      sport: 'Basquete',
      team: 'Lakers',
      fanTokenSymbol: 'KING',
      fanTokenPrice: '4.67',
      fanTokenChange: '+15.3%',
      avatar: '👑',
      totalFans: '1.8M',
      myTokens: 45,
      myRank: 2341,
      totalRanked: 8900,
      level: 'Fã Regular',
      levelProgress: 20,
      points: 1156,
      daysLeft: 23
    }
  ];

  const currentAthlete = athletes.find(a => a.id === selectedAthlete) || athletes[0];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab athlete={currentAthlete} />;
      case 'nfts':
        return <NFTsTab />;
      case 'rewards':
        return <RewardsTab athlete={currentAthlete} />;
      default:
        return <OverviewTab athlete={currentAthlete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                My Wallet
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Wallet className="w-4 h-4 text-gray-500" />
                <span>0x5b79...9ee9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}