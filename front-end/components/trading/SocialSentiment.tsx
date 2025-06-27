'use client';

import React, { useEffect, useState } from 'react';
import { Twitter } from 'lucide-react';
import { createPublicClient, getContract, http } from 'viem';
import { spicy } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';

interface Game {
  homeTeam: { name: string; hype: number };
  awayTeam: { name: string; hype: number };
  hypeId: string;
}

interface SocialSentimentProps {
  currentGame: Game;
}

const SocialSentiment: React.FC<SocialSentimentProps> = ({ currentGame }) => {
  const [hype, setHype] = useState<{ home: number; away: number } | null>(null);
  const [hypeLoading, setHypeLoading] = useState(false);
  const publicClient = createPublicClient({ chain: spicy, transport: http() });

  useEffect(() => {
    const fetchHype = async () => {
      setHypeLoading(true);
      if (!currentGame?.hypeId) {
        setHype(null);
        setHypeLoading(false);
        return;
      }
      try {
        const oracleContract = getContract({
          address: deployedContracts.Oracle.address as `0x${string}`,
          abi: deployedContracts.Oracle.abi,
          client: publicClient,
        });
        const data = await oracleContract.read.getHype([
          currentGame.hypeId as `0x${string}`
        ]);
        const hypeA = Number(data[0]) / 100;
        const hypeB = Number(data[1]) / 100;
        setHype({ home: hypeA, away: hypeB });
      } catch (err) {
        setHype(null);
      }
      setHypeLoading(false);
    };
    fetchHype();
  }, [currentGame?.hypeId]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Social Sentiment</h3>
        <Twitter className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pro-{currentGame.homeTeam.name}</span>
          <span className="font-bold text-brand-600">{hypeLoading ? '...' : hype ? `${Math.round(hype.home)}%` : '...'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${hype ? hype.home : 0}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pro-{currentGame.awayTeam.name}</span>
          <span className="font-bold text-blue-600">{hypeLoading ? '...' : hype ? `${Math.round(hype.away)}%` : '...'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${hype ? hype.away : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SocialSentiment;