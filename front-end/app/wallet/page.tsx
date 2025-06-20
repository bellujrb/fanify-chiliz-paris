'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, Calendar, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function FanWalletDashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'history' | 'rewards'>('portfolio');

  // Mock user portfolio data
  const userPortfolio = {
    totalValue: 2847.50,
    totalTokens: 156,
    chzBalance: 1250.50,
    dailyChange: '+12.5%',
    weeklyChange: '+34.2%'
  };

  const userTokens = [
    {
      token: 'PSG_HYPE',
      team: 'Paris Saint-Germain',
      logo: '🔴',
      amount: 45,
      currentPrice: 2.45,
      totalValue: 110.25,
      change: '+12.5%',
      event: 'PSG vs Botafogo',
      status: 'live'
    },
    {
      token: 'REAL_HYPE',
      team: 'Real Madrid',
      logo: '⚪',
      amount: 67,
      currentPrice: 3.21,
      totalValue: 215.07,
      change: '+15.7%',
      event: 'Real vs Barcelona',
      status: 'upcoming'
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'buy',
      token: 'PSG_HYPE',
      amount: 15,
      price: 2.30,
      total: 34.50,
      time: '5 min ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sell',
      token: 'REAL_HYPE',
      amount: 8,
      price: 3.15,
      total: 25.20,
      time: '1h ago',
      status: 'completed'
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="space-y-6">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Wallet className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Total Value</h3>
                </div>
                <div className="text-3xl font-bold text-purple-600">${userPortfolio.totalValue.toLocaleString()}</div>
                <div className="text-green-600 text-sm font-medium">{userPortfolio.dailyChange}</div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-2xl border border-pink-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">Hype Tokens</h3>
                </div>
                <div className="text-3xl font-bold text-pink-600">{userPortfolio.totalTokens}</div>
                <div className="text-sm text-gray-600">across {userTokens.length} events</div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-red-600" />
                  <h3 className="font-semibold text-gray-900">CHZ Balance</h3>
                </div>
                <div className="text-3xl font-bold text-red-600">{userPortfolio.chzBalance.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Available to trade</div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Weekly P&L</h3>
                </div>
                <div className="text-3xl font-bold text-green-600">{userPortfolio.weeklyChange}</div>
                <div className="text-sm text-gray-600">Last 7 days</div>
              </div>
            </div>

            {/* Token Holdings */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Hype Token Portfolio</h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
                    <span>Token</span>
                    <span>Event</span>
                    <span>Amount</span>
                    <span>Price</span>
                    <span>Value</span>
                    <span>Change</span>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {userTokens.map((token, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl">
                            {token.logo}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{token.token}</div>
                            <div className="text-sm text-gray-600">{token.team}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-900">{token.event}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            token.status === 'live' 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {token.status.toUpperCase()}
                          </div>
                        </div>
                        
                        <div className="font-semibold text-gray-900">{token.amount}</div>
                        <div className="text-gray-700">${token.currentPrice.toFixed(3)}</div>
                        <div className="font-semibold text-gray-900">${token.totalValue.toFixed(2)}</div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-green-600">{token.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
                  <span>Type</span>
                  <span>Token</span>
                  <span>Amount</span>
                  <span>Price</span>
                  <span>Total</span>
                  <span>Time</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'buy' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-900">{tx.token}</div>
                      <div className="text-gray-700">{tx.amount}</div>
                      <div className="text-gray-700">${tx.price.toFixed(3)}</div>
                      <div className="font-semibold text-gray-900">${tx.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'rewards':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Trading Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-600 to-red-600 p-6 rounded-2xl text-white">
                <h4 className="text-xl font-bold mb-4">🏆 Weekly Trader Bonus</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Volume Traded</span>
                    <span className="font-bold">$2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy Rate</span>
                    <span className="font-bold">74%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonus Earned</span>
                    <span className="font-bold">+50 CHZ</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-4">🎁 Available Rewards</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Trading Fee Discount</span>
                    <Button size="sm" variant="outline">Claim</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Exclusive NFT Badge</span>
                    <Button size="sm" variant="outline">Claim</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">VIP Event Access</span>
                    <Button size="sm" variant="outline">Claim</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
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
                  Logout
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                Hype Token Wallet
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Live Events
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Wallet className="w-4 h-4 text-gray-500" />
                <span>0x5b79...9ee9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Overview Header */}
        <div className="bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Football Hype Trading</h2>
              <p className="text-white/90 text-lg">Trade sentiment-based tokens for live football matches</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-1">Total Portfolio Value</div>
              <div className="text-4xl font-bold">${userPortfolio.totalValue.toLocaleString()}</div>
              <div className="text-green-300 text-lg font-medium">{userPortfolio.dailyChange} today</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {[
                { id: 'portfolio', label: 'Portfolio', icon: Wallet },
                { id: 'history', label: 'History', icon: TrendingUp },
                { id: 'rewards', label: 'Rewards', icon: Users }
              ].map((tab) => {
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
          
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}