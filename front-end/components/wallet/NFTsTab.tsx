'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Eye, Volume2 } from 'lucide-react';

const NFTsTab: React.FC = () => {
  const myNFTs = [
    {
      id: 1,
      name: 'Historic Goal #001',
      description: 'Commemorative NFT for the 100th goal',
      rarity: 'Legendary',
      benefit: 'Vote on training music',
      image: '⚽',
      owned: true,
      utility: 'Governance'
    },
    {
      id: 2,
      name: 'Epic Moment #045',
      description: 'Iconic victory celebration',
      rarity: 'Epic',
      benefit: 'Early access to content',
      image: '🏆',
      owned: true,
      utility: 'VIP Access'
    },
    {
      id: 3,
      name: 'Exclusive Training #012',
      description: 'Behind the scenes of special training',
      rarity: 'Rare',
      benefit: 'Virtual Meet & Greet',
      image: '💪',
      owned: false,
      utility: 'Experience'
    },
    {
      id: 4,
      name: 'Digital Autograph #789',
      description: 'Personalized digital signature',
      rarity: 'Common',
      benefit: 'Fan certificate',
      image: '✍️',
      owned: true,
      utility: 'Collectible'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-yellow-600';
      case 'Epic':
        return 'text-purple-600';
      case 'Rare':
        return 'text-blue-600';
      default:
        return 'text-green-600';
    }
  };

  const getNFTGradient = (rarity: string) => {
    switch (rarity) {
      case 'Lendário':
        return 'from-yellow-400 to-orange-500';
      case 'Épico':
        return 'from-purple-400 to-pink-500';
      case 'Raro':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-green-400 to-emerald-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">My NFT Collection</h3>
        <div className="text-sm text-gray-600">
          {myNFTs.filter(nft => nft.owned).length} of {myNFTs.length} collected
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myNFTs.map((nft) => (
          <div key={nft.id} className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 ${!nft.owned ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getNFTGradient(nft.rarity)} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                {nft.image}
              </div>
              <div className="flex items-center space-x-2">
                {nft.owned ? (
                  <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Owned
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    Locked
                  </div>
                )}
              </div>
            </div>
            
            <h4 className="font-bold text-gray-900 mb-2">{nft.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{nft.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rarity:</span>
                <span className={`text-sm font-medium ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Utility:</span>
                <span className="text-sm font-medium text-gray-900">{nft.utility}</span>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200/50">
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">{nft.benefit}</span>
                </div>
              </div>
            </div>
            
            {nft.owned && (
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {nft.utility === 'Governance' && (
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-red-600 text-white">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Vote
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTsTab;