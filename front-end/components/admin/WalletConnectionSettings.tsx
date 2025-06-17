'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Wallet, 
  CheckCircle,
  Loader2,
  AlertCircle,
  Instagram,
  Shield
} from 'lucide-react';

interface WalletConnectionSettingsProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

const WalletConnectionSettings: React.FC<WalletConnectionSettingsProps> = ({ 
  isConnected, 
  onConnectionChange 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'settings' | 'connecting' | 'success'>('settings');

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setConnectionStep('connecting');

    // Simulate MetaMask connection
    setTimeout(() => {
      setConnectionStep('success');
      setIsConnecting(false);
      onConnectionChange(true);
      
      // Auto close after success
      setTimeout(() => {
        setConnectionStep('settings');
      }, 2000);
    }, 2000);
  };

  const handleDisconnectWallet = () => {
    onConnectionChange(false);
  };

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Configurations
          </DialogTitle>
        </DialogHeader>
      </div>

      {/* Instagram Status */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border border-pink-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Instagram</h4>
            <p className="text-sm text-gray-600">@userathlete • Connected</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>

      {/* Wallet Status */}
      <div className={`p-4 rounded-xl border ${
        isConnected 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50' 
          : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200/50'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isConnected 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-orange-500 to-yellow-500'
          }`}>
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">MetaMask Wallet</h4>
            <p className="text-sm text-gray-600">
              {isConnected ? '0x5b79...9ee9 • Connected' : 'Not connected'}
            </p>
          </div>
          {isConnected ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-orange-500" />
          )}
        </div>
      </div>

      {/* Requirements Notice */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200/50">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Requirements</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• MetaMask wallet connected to emit tokens</li>
              <li>• Connected wallet to configure Smart Contracts</li>
              <li>• Instagram Creator for engagement tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {!isConnected ? (
          <Button 
            onClick={handleConnectWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect MetaMask
          </Button>
        ) : (
          <Button 
            onClick={handleDisconnectWallet}
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            Disconnect Wallet
          </Button>
        )}
      </div>
    </div>
  );

  const renderConnecting = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Connecting Wallet...
          </h2>
          <p className="text-gray-600">
            Please wait while we connect your MetaMask
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Verifying MetaMask...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm text-gray-700">Requesting connection...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm text-gray-700">Configuring permissions...</span>
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
            Wallet Connected!
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Address:</span>
            <span className="text-sm font-mono text-gray-900">0x5b79...9ee9</span>
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
    </div>
  );

  const renderContent = () => {
    switch (connectionStep) {
      case 'connecting':
        return renderConnecting();
      case 'success':
        return renderSuccess();
      default:
        return renderSettings();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Configurations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="p-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionSettings;