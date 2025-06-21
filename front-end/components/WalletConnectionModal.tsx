'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Shield, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface WalletConnectionModalProps {
  children: React.ReactNode;
  onConnect?: () => void;
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({ children, onConnect }) => {
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);
  const { 
    connect, 
    isConnecting, 
    error,
    clearError
  } = useWallet();

  // Handle connection state changes
  useEffect(() => {
    if (onConnect) {
      onConnect();
    }
  }, [onConnect]);

  const handleConnectMetaMask = async () => {
    setHasAttemptedConnection(true);
    await connect();
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const resetModal = () => {
    clearError();
    setHasAttemptedConnection(false);
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
          {isConnecting ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <span className="text-2xl">🦊</span>
              <span>Connect MetaMask</span>
            </>
          )}
        </Button>

        {error && hasAttemptedConnection && (
          <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

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

  return (
    <Dialog onOpenChange={(open) => !open && resetModal()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="p-6">
          {renderSelectWallet()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionModal;