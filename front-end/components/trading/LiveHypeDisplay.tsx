'use client';

import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  RefreshCw,
  Circle
} from 'lucide-react';
import { useAccount } from "wagmi";
import { createWalletClient, custom, getContract, formatEther, parseEther, createPublicClient, http } from 'viem';
import { spicy } from 'viem/chains';
import deployedContracts from '@/lib/deployedContracts';
import { useWalletBalance } from '@/hooks/useWalletBalance';

interface Game {
  homeTeam: { name: string; logo: string; hype: number };
  awayTeam: { name: string; logo: string; hype: number };
  hypeId: string;
}

interface LiveData {
  psgOdds: number;
  realOdds: number;
}

interface LiveHypeDisplayProps {
  currentGame: Game;
  liveData: LiveData;
}

const LiveHypeDisplay: React.FC<LiveHypeDisplayProps> = ({
  currentGame,
  liveData
}) => {
  const { address: account, isConnected } = useAccount();
  const { hypeBalance } = useWalletBalance();
  const [betAmount, setBetAmount] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [allowance, setAllowance] = useState("0");
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingBet, setLoadingBet] = useState<'A' | 'B' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [odds, setOdds] = useState<{ oddsA: string; oddsB: string } | null>(null);
  const [oddsLoading, setOddsLoading] = useState(false);
  const [hype, setHype] = useState<{ home: number; away: number } | null>(null);
  const [hypeLoading, setHypeLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState<{ status: number; goalsA: number; goalsB: number } | null>(null);
  const [matchInfoLoading, setMatchInfoLoading] = useState(false);

  const publicClient = createPublicClient({ chain: spicy, transport: http() });

  // Fetch allowance
  useEffect(() => {
    const fetchAllowance = async () => {
      if (!account) {
        setAllowance('0');
        return;
      }
      try {
        const publicClient = createWalletClient({ chain: spicy, transport: custom(window.ethereum as any) });
        const hypeTokenContract = getContract({
          address: deployedContracts.HypeToken.address as `0x${string}`,
          abi: deployedContracts.HypeToken.abi,
          client: publicClient,
        });
        const allowanceValue = await hypeTokenContract.read.allowance([
          account as `0x${string}`,
          deployedContracts.Funify.address as `0x${string}`,
        ]);
        setAllowance(formatEther(allowanceValue as bigint));
      } catch (err) {
        setAllowance('0');
      }
    };
    if (isConnected) fetchAllowance();
  }, [account, isConnected, success]);

  // Approve HYPE
  const handleApprove = async () => {
    setError(null);
    setSuccess(null);
    setLoadingApprove(true);
    try {
      if (!account || !approveAmount) throw new Error('Connect wallet and enter approve amount.');
      const walletClient = createWalletClient({ chain: spicy, transport: custom(window.ethereum as any) });
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });
      await hypeTokenContract.write.approve([
        deployedContracts.Funify.address as `0x${string}`,
        parseEther(approveAmount)
      ], { account: account as `0x${string}` });
      setSuccess('Tokens approved!');
      // Refetch allowance immediately after approve
      const publicClient = createWalletClient({ chain: spicy, transport: custom(window.ethereum as any) });
      const allowanceValue = await getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      }).read.allowance([
        account as `0x${string}`,
        deployedContracts.Funify.address as `0x${string}`,
      ]);
      setAllowance(formatEther(allowanceValue as bigint));
    } catch (err: any) {
      setError(err?.message || 'Error approving tokens');
    }
    setLoadingApprove(false);
  };

  // Place bet
  const handleBet = async (teamA: boolean) => {
    setError(null);
    setSuccess(null);
    setLoadingBet(teamA ? 'A' : 'B');
    try {
      if (!account || !betAmount) throw new Error('Connect wallet and enter amount.');
      if (!currentGame || !currentGame.hypeId) throw new Error('Select a game first.');
      const walletClient = createWalletClient({ chain: spicy, transport: custom(window.ethereum as any) });
      const funifyContract = getContract({
        address: deployedContracts.Funify.address as `0x${string}`,
        abi: deployedContracts.Funify.abi,
        client: walletClient,
      });
      await funifyContract.write.placeBet([
        currentGame.hypeId as `0x${string}`,
        teamA,
        parseEther(betAmount)
      ], { account: account as `0x${string}` });
      setSuccess('Bet placed successfully!');
    } catch (err: any) {
      setError(err?.message || 'Error placing bet');
    }
    setLoadingBet(null);
  };

  useEffect(() => {
    const fetchOdds = async () => {
      setOddsLoading(true);
      if (!currentGame?.hypeId) {
        setOdds(null);
        setOddsLoading(false);
        return;
      }
      try {
        const funifyContract = getContract({
          address: deployedContracts.Funify.address as `0x${string}`,
          abi: deployedContracts.Funify.abi,
          client: publicClient,
        });
        const data = await funifyContract.read.getOdds([
          currentGame.hypeId as `0x${string}`
        ]);
        setOdds({
          oddsA: formatEther(data[0]),
          oddsB: formatEther(data[1]),
        });
      } catch (err) {
        setOdds(null);
      }
      setOddsLoading(false);
    };
    fetchOdds();
  }, [currentGame?.hypeId]);

  // Fetch hype from blockchain
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
        // Remove two zeros and convert to percentage
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

  // Fetch match info (status, goals)
  useEffect(() => {
    const fetchMatchInfo = async () => {
      setMatchInfoLoading(true);
      if (!currentGame?.hypeId) {
        setMatchInfo(null);
        setMatchInfoLoading(false);
        return;
      }
      try {
        const oracleContract = getContract({
          address: deployedContracts.Oracle.address as `0x${string}`,
          abi: deployedContracts.Oracle.abi,
          client: publicClient,
        });
        const data = await oracleContract.read.getMatch([
          currentGame.hypeId as `0x${string}`
        ]);
        setMatchInfo({
          status: Number(data[7]),
          goalsA: Number(data[2]),
          goalsB: Number(data[3]),
        });
      } catch (err) {
        setMatchInfo(null);
      }
      setMatchInfoLoading(false);
    };
    fetchMatchInfo();
  }, [currentGame?.hypeId]);

  const allowanceEnough = Number(allowance) >= Number(betAmount || 0);
  const isApproveAmountValid = !!approveAmount && !isNaN(Number(approveAmount)) && Number(approveAmount) > 0;
  const hasEnoughHype = isApproveAmountValid && Number(hypeBalance) >= Number(approveAmount);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Live Hype Trading</h2>
          <p className="text-gray-600">Real-time fan sentiment analysis</p>
          {/* Game Status */}
          <div className="mt-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span>Game Status:</span>
            Not started yet
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Circle className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Hype Percentages & Odds */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-brand-50 to-pink-50 p-6 rounded-2xl border border-brand-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{currentGame.homeTeam.logo}</span>
            <span className="font-bold text-gray-900">{currentGame.homeTeam.name}</span>
          </div>
          <div className="text-4xl font-black text-brand-600 mb-2">
            {hypeLoading ? '...' : hype ? `${Math.round(hype.home)}%` : '...'}
          </div>
          <div className="text-sm text-gray-600 mb-4">Fan Hype</div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Odds:</span>
            <span className="text-lg font-bold text-brand-600">
              {oddsLoading
                ? '...'
                : odds?.oddsA
                  ? `${odds.oddsA}x`
                  : 'Calculing...'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/50">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{currentGame.awayTeam.logo}</span>
            <span className="font-bold text-gray-900">{currentGame.awayTeam.name}</span>
          </div>
          <div className="text-4xl font-black text-blue-600 mb-2">
            {hypeLoading ? '...' : hype ? `${Math.round(hype.away)}%` : '...'}
          </div>
          <div className="text-sm text-gray-600 mb-4">Fan Hype</div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Odds:</span>
            <span className="text-lg font-bold text-blue-600">
              {oddsLoading
                ? '...'
                : odds?.oddsB
                  ? `${odds.oddsB}x`
                  : 'Calculing...'}
            </span>
          </div>
        </div>
      </div>

      {/* Live Hype Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-full flex transition-all duration-1000">
            <div 
              className="bg-gradient-to-r from-brand-500 to-brand-600"
              style={{ width: `${hype ? hype.home : 0}%` }}
            ></div>
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${hype ? hype.away : 0}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{currentGame.homeTeam.name}: {hypeLoading ? '...' : hype ? `${Math.round(hype.home)}%` : '...'}</span>
          <span>{currentGame.awayTeam.name}: {hypeLoading ? '...' : hype ? `${Math.round(hype.away)}%` : '...'}</span>
        </div>
      </div>

      {/* Bet Amount Input - full width, above approve */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">How much do you want to bet?</label>
        <input
          type="number"
          min="0"
          placeholder="Amount of HYPE to bet"
          value={betAmount}
          onChange={e => setBetAmount(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-lg font-bold text-gray-900 bg-yellow-50 placeholder-gray-400 transition"
        />
      </div>

      {/* Approve Amount Input - novo input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">How much do you want to approve?</label>
        <input
          type="number"
          min="0"
          placeholder="Amount of HYPE to approve"
          value={approveAmount}
          onChange={e => setApproveAmount(e.target.value)}
          className="w-full p-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-lg font-bold text-gray-900 bg-yellow-50 placeholder-gray-400 transition"
        />
      </div>

      {/* Approve Tokens Box */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">1. Approve Tokens</h4>
        <p className="text-sm text-yellow-700 mb-3">
          Before placing a bet, you need to approve the Funify contract to spend your HYPE tokens.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button 
            onClick={handleApprove} 
            disabled={loadingApprove || !account || !isApproveAmountValid || !hasEnoughHype}
            variant="outline"
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 min-w-[140px]"
          >
            {loadingApprove ? "Approving..." : `Approve ${approveAmount || '0'} HYPE`}
          </Button>
          <div className="text-sm">
            <span className="text-yellow-700 font-medium">Approved:</span>
            <span className={`ml-1 ${allowanceEnough ? 'text-green-600' : 'text-brand-600'}`}>{allowance} HYPE</span>
            {betAmount && !allowanceEnough && (
              <span className="text-brand-600 ml-2 text-xs">⚠️ Insufficient</span>
            )}
            {betAmount && allowanceEnough && (
              <span className="text-green-600 ml-2 text-xs">✅ Sufficient</span>
            )}
          </div>
        </div>
      </div>

      {/* Trading Buttons - only enabled if allowance is enough */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl"
          onClick={() => handleBet(true)}
          disabled={loadingBet === 'A' || !allowanceEnough || !betAmount || !account}
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          {loadingBet === 'A' ? 'Betting...' : `Buy ${currentGame.homeTeam.name} ${liveData.psgOdds.toFixed(2)}x`}
        </Button>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl"
          onClick={() => handleBet(false)}
          disabled={loadingBet === 'B' || !allowanceEnough || !betAmount || !account}
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          {loadingBet === 'B' ? 'Betting...' : `Buy ${currentGame.awayTeam.name} ${liveData.realOdds.toFixed(2)}x`}
        </Button>
      </div>

      {/* Feedback */}
      {(error || success) && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${error ? 'bg-brand-50 text-brand-700' : 'bg-green-50 text-green-700'}`}>{error || success}</div>
      )}
    </div>
  );
};

export default LiveHypeDisplay;