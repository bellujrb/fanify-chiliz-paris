'use client';

import React from 'react';
import { 
  TrendingUp,
  Coins,
  Trophy,
  Gift,
  Nfc
} from 'lucide-react';

interface NavigationTabsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeSection,
  onSectionChange
}) => {
  const navigationSections = [
    {
      id: 'trading',
      label: 'Live Trading',
      icon: TrendingUp,
      color: 'text-brand-600',
    },
    {
      id: 'staking',
      label: 'Staking Pool',
      icon: Coins,
      color: 'text-purple-600',
    },
    {
      id: 'rewards',
      label: 'Rewards Hub',
      icon: Gift,
      color: 'text-pink-600',
    },
    {
      id: 'nft-market',
      label: 'Market Secondary',
      icon: Nfc,
      color: 'text-green-600',
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
        {navigationSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 flex-1 justify-center ${
                activeSection === section.id
                  ? 'bg-brand-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-semibold text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;