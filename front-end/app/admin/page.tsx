'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Instagram, 
  Users, 
  BarChart3, 
  Trophy, 
  Settings, 
  ArrowLeft,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Coins,
  Wallet,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import TokenEmissionModal from '@/components/admin/TokenEmissionModal';
import WalletConnectionSettings from '@/components/admin/WalletConnectionSettings';
import SmartContractRewards from '@/components/admin/SmartContractRewards';

export default function AdminDashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showRewardsConfig, setShowRewardsConfig] = useState(false);

  // Mock data for tokens emitted
  const tokensEmitted = {
    total: 50000,
    circulating: 25000,
    price: '2.45',
    change: '+12.5%'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@userathlete</span>
              </div>
              
              {/* Wallet Status Indicator */}
              <div className="flex items-center space-x-2 text-sm">
                {isWalletConnected ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Wallet Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Wallet not connected</span>
                  </div>
                )}
              </div>
              
              <WalletConnectionSettings 
                isConnected={isWalletConnected}
                onConnectionChange={setIsWalletConnected}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-500/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome to Fanify!
                </h2>
                <p className="text-gray-600">
                  Your Instagram has been successfully connected. Manage your fans and rewards here.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Active Fans</h3>
                </div>
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-600">+12% this month</div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <BarChart3 className="w-6 h-6 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">Engagement</h3>
                </div>
                <div className="text-2xl font-bold text-pink-600">89.5%</div>
                <div className="text-sm text-gray-600">+5.2% this week</div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Trophy className="w-6 h-6 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Rewards</h3>
                </div>
                <div className="text-2xl font-bold text-red-600">156</div>
                <div className="text-sm text-gray-600">distributed</div>
              </div>

              {/* New Tokens Emitted Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Coins className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">Tokens Emitted</h3>
                </div>
                <div className="text-2xl font-bold text-yellow-600">{tokensEmitted.circulating.toLocaleString()}</div>
                <div className="text-sm text-gray-600">de {tokensEmitted.total.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Button 
            onClick={() => setShowTokenModal(true)}
            disabled={!isWalletConnected}
            className="h-24 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coins className="w-6 h-6" />
            <span className="font-semibold">Emit Tokens</span>
          </Button>
          
          <Button className="h-24 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl flex flex-col items-center justify-center space-y-2">
            <Users className="w-6 h-6" />
            <span className="font-semibold">Manage Fans</span>
          </Button>
          
          <Button 
            onClick={() => setShowRewardsConfig(true)}
            disabled={!isWalletConnected}
            className="h-24 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white rounded-2xl flex flex-col items-center justify-center space-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trophy className="w-6 h-6" />
            <span className="font-semibold">Configure Rewards</span>
          </Button>
          
          <Button className="h-24 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-2xl flex flex-col items-center justify-center space-y-2">
            <BarChart3 className="w-6 h-6" />
            <span className="font-semibold">View Reports</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engagement Overview */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Engagement</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Ana Silva liked your photo</div>
                  <div className="text-sm text-gray-600">2 minutes ago</div>
                </div>
                <div className="text-purple-600 font-semibold">+5 pts</div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Carlos commented on your post</div>
                  <div className="text-sm text-gray-600">5 minutes ago</div>
                </div>
                <div className="text-pink-600 font-semibold">+10 pts</div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Maria shared your story</div>
                  <div className="text-sm text-gray-600">8 minutes ago</div>
                </div>
                <div className="text-red-600 font-semibold">+15 pts</div>
              </div>
            </div>
          </div>

          {/* Top Fans */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Fans of the Month</h3>
              <Button variant="outline" size="sm">
                View Ranking
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { pos: 1, name: "Ana Silva", points: 2847, level: "Dedicated Fan", color: "from-yellow-400 to-yellow-600" },
                { pos: 2, name: "Carlos Lima", points: 2156, level: "Active Fan", color: "from-gray-300 to-gray-500" },
                { pos: 3, name: "Maria Santos", points: 1923, level: "Active Fan", color: "from-orange-400 to-orange-600" },
                { pos: 4, name: "João Pedro", points: 1654, level: "Regular Fan", color: "from-blue-400 to-blue-600" },
                { pos: 5, name: "Lucia Costa", points: 1432, level: "Regular Fan", color: "from-green-400 to-green-600" }
              ].map((fan, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-8 h-8 bg-gradient-to-r ${fan.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {fan.pos}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{fan.name}</div>
                    <div className="text-sm text-gray-600">{fan.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                      {fan.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TokenEmissionModal 
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
      />

      <SmartContractRewards
        isOpen={showRewardsConfig}
        onClose={() => setShowRewardsConfig(false)}
      />
    </div>
  );
}