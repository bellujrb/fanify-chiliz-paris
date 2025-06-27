'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Shield, Activity, DollarSign, Square, Trophy, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import AdminNavigationTabs from '@/components/admin/AdminNavigationTabs';
import GamesSection from '@/components/admin/GamesSection';
import SystemSection from '@/components/admin/SystemSection';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreateGameModal from '@/components/admin/CreateGameModal';
import { createWalletClient, custom, getContract } from "viem";
import { anvil } from "viem/chains";
import deployedContracts from "@/lib/deployedContracts";
import { useAccount } from "wagmi";

export default function AdminPage() {
  const [selectedGame, setSelectedGame] = useState('psg-bot');
  const [activeSection, setActiveSection] = useState('games');
  const [loading, setLoading] = useState(false);
  const { address: account, isConnected } = useAccount();

  // Function to open bets
  const openToBets = async () => {
    if (!account || !selectedGame) {
      alert("Select a game and connect your wallet!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet not available");
      return;
    }
    setLoading(true);
    try {
      const walletClient = createWalletClient({
        chain: anvil,
        transport: custom(window.ethereum as any),
      });
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });
      await oracleContract.write.openToBets(
        [selectedGame as `0x${string}`],
        { account: account as `0x${string}` }
      );
      alert("Bets opened successfully!");
    } catch (e: any) {
      alert("Error opening bets: " + (e?.message || e));
    }
    setLoading(false);
  };

  // Function to close bets
  const closeBets = async () => {
    if (!account || !selectedGame) {
      alert("Select a game and connect your wallet!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet not available");
      return;
    }
    setLoading(true);
    try {
      const walletClient = createWalletClient({
        chain: anvil,
        transport: custom(window.ethereum as any),
      });
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });
      await oracleContract.write.closeBets(
        [selectedGame as `0x${string}`],
        { account: account as `0x${string}` }
      );
      alert("Bets closed successfully!");
    } catch (e: any) {
      alert("Error closing bets: " + (e?.message || e));
    }
    setLoading(false);
  };

  // Function to finish match
  const finishMatch = async () => {
    if (!account || !selectedGame) {
      alert("Select a game and connect your wallet!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet not available");
      return;
    }
    setLoading(true);
    try {
      const walletClient = createWalletClient({
        chain: anvil,
        transport: custom(window.ethereum as any),
      });
      const oracleContract = getContract({
        address: deployedContracts.Oracle.address as `0x${string}`,
        abi: deployedContracts.Oracle.abi,
        client: walletClient,
      });
      await oracleContract.write.finishMatch(
        [selectedGame as `0x${string}`],
        { account: account as `0x${string}` }
      );
      alert("Match finished successfully!");
    } catch (e: any) {
      alert("Error finishing match: " + (e?.message || e));
    }
    setLoading(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'games':
        return (
          <div>
            <CreateGameModal />
            <GamesSection
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
              onOpenToBets={openToBets}
              onCloseBets={closeBets}
              onFinishMatch={finishMatch}
              loading={loading}
            />
          </div>
        );
      case 'system':
        return (
          <div>
            <SystemSection />
          </div>
        );
      default:
        return (
          <div>
            <GamesSection
              selectedGame={selectedGame}
              onGameSelect={setSelectedGame}
              onOpenToBets={openToBets}
              onCloseBets={closeBets}
              onFinishMatch={finishMatch}
              loading={loading}
            />
          </div>
        );
    }
  };

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
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-gray-900">Fanify</span>
                <div className="text-xs text-white font-medium bg-brand-500 px-2 py-1 rounded flex items-center gap-1">
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
        {!isConnected ? (
          <div className="mb-6 flex items-center justify-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-xl shadow text-center flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 2.25h.008v.008H12v-.008zm.75-8.25a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-6 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm12 0a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-9.53 4.28a.75.75 0 00-1.06 1.06l.53.53a.75.75 0 001.06-1.06l-.53-.53zm10.06 0a.75.75 0 00-1.06 1.06l.53.53a.75.75 0 001.06-1.06l-.53-.53zM12 19.5a.75.75 0 00.75-.75v-.75a.75.75 0 00-1.5 0v.75a.75.75 0 00.75.75z" />
              </svg>
              <span className="font-medium">Connect your wallet to access this section.</span>
            </div>
          </div>
        ) : (
          renderActiveSection()
        )}
      </div>
    </div>
  );
}