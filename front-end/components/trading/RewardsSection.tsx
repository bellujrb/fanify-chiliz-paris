'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  CheckCircle,
  Clock,
  Coins,
  ArrowRight,
  Sparkles,
  Trophy,
  Calendar
} from 'lucide-react';
import GameSelector from './GameSelector';
import { useAccount } from 'wagmi';
import { createPublicClient, createWalletClient, http, custom, getContract, formatEther } from 'viem';
import { anvil } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';
import { useSmartContractGames } from '@/hooks/useSmartContractGames';

const publicClient = createPublicClient({ chain: anvil, transport: http() });

const RewardsSection: React.FC = () => {
  const { address: account, isConnected } = useAccount();
  const { games, loading: loadingGames } = useSmartContractGames();
  const [activeTab, setActiveTab] = useState<'claim' | 'history'>('claim');
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [claiming, setClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimedGames, setClaimedGames] = useState<string[]>([]);
  const [canClaim, setCanClaim] = useState(false);
  const [claimReason, setClaimReason] = useState<string | null>(null);

  // Collect prize
  const handleClaim = async () => {
    setClaiming(true);
    setClaimSuccess(null);
    setClaimError(null);
    try {
      if (!account || !selectedGame) throw new Error('Select a game');
      if (typeof window === 'undefined' || !window.ethereum) throw new Error('Wallet not available');
      const walletClient = createWalletClient({ chain: anvil, transport: custom(window.ethereum as any) });
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: walletClient,
      });
      await funifyContract.write.claimPrize(
        [selectedGame as `0x${string}`],
        { account: account as `0x${string}` }
      );
      setClaimSuccess('Prize claimed successfully!');
      setClaimedGames((prev) => [...prev, selectedGame]);
    } catch (error: any) {
      setClaimError(error?.message || 'Error claiming prize');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Clean - Cores da Landing */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Result Match 
        </h2>
        <p className="text-gray-600">
          Collect your rewards from won games
        </p>
      </div>

      {/* Tabs Simples - Cores da Landing */}
      <div className="flex justify-center">
        <div className="flex bg-white rounded-xl p-1 shadow-lg border border-gray-100">
          <button
            onClick={() => setActiveTab('claim')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'claim'
                ? 'bg-brand-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-brand-600'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Collect</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'history'
                ? 'bg-gray-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Game History</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'claim' ? (
        <div className="space-y-6">
          <GameSelector selectedGame={selectedGame} onGameSelect={setSelectedGame} />
          {selectedGame && (
            <div className="flex flex-col items-center w-full max-w-xl mx-auto">
              <Button
                onClick={handleClaim}
                disabled={claiming || !account || !selectedGame || !canClaim}
                className={`
                  w-full flex items-center justify-center gap-2 font-bold text-lg py-4 rounded-xl shadow-lg transition-all
                  ${canClaim
                    ? 'bg-gradient-to-r from-pink-500 via-brand-500 to-yellow-500 hover:scale-105 hover:brightness-110 text-white animate-pulse'
                    : 'bg-gray-300 text-gray-400 cursor-not-allowed'}
                `}
              >
                {claiming ? (
                  <>
                    <Sparkles className="animate-spin" />
                    Claiming...
                  </>
                ) : canClaim ? (
                  <>
                    <Gift className="animate-bounce" />
                    Claim My Prize!
                  </>
                ) : (
                  <>
                    <Clock />
                    Not available yet
                  </>
                )}
              </Button>
              {claimSuccess && <div className="mt-4 text-green-600">{claimSuccess}</div>}
              {claimError && <div className="mt-4 text-brand-600">{claimError}</div>}
              {!canClaim && !claiming && (
                <div className="mt-2 text-sm text-gray-500">{claimReason || 'You cannot claim this prize yet.'}</div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {loadingGames ? (
            <div className="text-center text-gray-400">Loading games...</div>
          ) : games.length === 0 ? (
            <div className="text-center text-gray-400">No games found</div>
          ) : (
            games.map((game) => (
              <div key={game.hypeId} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    {game.teamA[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{game.teamA} x {game.teamB}</div>
                    <div className="text-xs text-gray-500">Status: {game.status}</div>
                    <div className="text-xs text-gray-500">Score: {game.goalsA} - {game.goalsB}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {claimedGames.includes(game.hypeId) ? (
                    <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle className="w-4 h-4" /> Prize collected</span>
                  ) : (
                    <span className="text-gray-400 text-xs">Not collected</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RewardsSection;