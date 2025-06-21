'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Shield, 
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

interface WalletConnectionModalProps {
  children: React.ReactNode;
  onConnect?: () => void;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({ children, onConnect }) => {
  const [connectionStep, setConnectionStep] = useState<'select' | 'connecting' | 'success' | 'error'>('select');
  const router = useRouter();
  const { 
    connect, 
    isConnected, 
    isConnecting, 
    address, 
    error 
  } = useWallet();

  // Handle connection state changes
  useEffect(() => {
    if (isConnecting) {
      setConnectionStep('connecting');
    } else if (isConnected && address) {
      setConnectionStep('success');
      // Auto redirect after success
      setTimeout(() => {
        if (onConnect) {
          onConnect();
        }
        router.push('/wallet');
        resetModal();
      }, 1500);
    } else if (error) {
      setConnectionStep('error');
    }
  }, [isConnecting, isConnected, address, error, onConnect, router]);

  const handleConnectMetaMask = async () => {
    setConnectionStep('connecting');
    await connect();
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const resetModal = () => {
    setConnectionStep('select');
  };

  const renderSelectWallet = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
      </div>

      {/* MetaMask Button */}
      <div className="space-y-4">
        <Button
          onClick={handleConnectMetaMask}
          disabled={isConnecting}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-3"
        >
          <span className="text-2xl">🦊</span>
          <span>{isConnecting ? 'Connecting...' : 'Connect MetaMask'}</span>
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
          <span className="text-sm text-gray-500">OR</span>
        </div>

        {/* No wallet section */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">Don't have a wallet?</p>
          <Button
            onClick={handleInstallMetaMask}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl"
          >
            Install MetaMask
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Security</h4>
            <p className="text-sm text-gray-600">
              Your wallet is protected by end-to-end encryption. 
              Never share your private key or seed phrase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnecting = () => (
    <div className="space-y-6">
      {/* Header - Centralized */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Connecting...
          </h2>
          <p className="text-gray-600">
            Please wait while we connect your MetaMask wallet
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Verifying wallet...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm text-gray-700">Establishing connection...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm text-gray-700">Synchronizing data...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Connected Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your wallet has been connected to Fanify
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Address:</span>
            <span className="text-sm font-mono text-gray-900">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Network:</span>
            <span className="text-sm text-gray-900">Chiliz Chain</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="text-sm text-green-600 font-semibold">Connected</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          router.push('/wallet');
          resetModal();
        }}
        className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl"
      >
        Access Fan Wallet
      </Button>
    </div>
  );

  const renderError = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Connection Failed
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {error || 'An error occurred while connecting your wallet'}
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200/50">
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            Please make sure MetaMask is installed and you have an account set up.
          </p>
          <p className="text-sm text-gray-700">
            If the problem persists, try refreshing the page and connecting again.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleConnectMetaMask}
          className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl"
        >
          Try Again
        </Button>
        <Button
          onClick={resetModal}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (connectionStep) {
      case 'connecting':
        return renderConnecting();
      case 'success':
        return renderSuccess();
      case 'error':
        return renderError();
      default:
        return renderSelectWallet();
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetModal()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="p-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionModal;