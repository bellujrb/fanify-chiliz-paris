'use client';

import React from 'react';
import { Gamepad2, Sparkles, Award } from 'lucide-react';

interface WalletTabsProps {
  activeTab: 'overview' | 'nfts' | 'rewards';
  onTabChange: (tab: 'overview' | 'nfts' | 'rewards') => void;
}

const WalletTabs: React.FC<WalletTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Gamepad2 },
    { id: 'nfts', label: 'My NFTs', icon: Sparkles },
    { id: 'rewards', label: 'Rewards', icon: Award }
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8 px-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
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
  );
};

export default WalletTabs;