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
  const { address: account } = useAccount();

  // Função para abrir apostas
  const openToBets = async () => {
    if (!account || !selectedGame) {
      alert("Selecione um jogo e conecte a carteira!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet não disponível");
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
      alert("Apostas abertas com sucesso!");
    } catch (e: any) {
      alert("Erro ao abrir apostas: " + (e?.message || e));
    }
    setLoading(false);
  };

  // Função para fechar apostas
  const closeBets = async () => {
    if (!account || !selectedGame) {
      alert("Selecione um jogo e conecte a carteira!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet não disponível");
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
      alert("Apostas fechadas com sucesso!");
    } catch (e: any) {
      alert("Erro ao fechar apostas: " + (e?.message || e));
    }
    setLoading(false);
  };

  // Função para finalizar jogo
  const finishMatch = async () => {
    if (!account || !selectedGame) {
      alert("Selecione um jogo e conecte a carteira!");
      return;
    }
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Wallet não disponível");
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
      alert("Jogo finalizado com sucesso!");
    } catch (e: any) {
      alert("Erro ao finalizar jogo: " + (e?.message || e));
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
                  Voltar
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-black text-gray-900">Fanify</span>
                <div className="text-xs text-white font-medium bg-red-500 px-2 py-1 rounded flex items-center gap-1">
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
        {renderActiveSection()}
      </div>
    </div>
  );
}