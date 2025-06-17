'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Coins, 
  AlertTriangle, 
  CheckCircle,
  Loader2,
  Info
} from 'lucide-react';

interface TokenEmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenEmissionModal: React.FC<TokenEmissionModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isEmitting, setIsEmitting] = useState(false);
  const [emissionStep, setEmissionStep] = useState<'form' | 'confirming' | 'success'>('form');

  // Pre-configured token data
  const tokenData = {
    name: 'Seu Atleta Fan Token',
    symbol: 'SAFT',
    decimals: 18,
    network: 'Chiliz Chain',
    currentSupply: 750000,
    maxSupply: 10000000
  };

  const handleEmitTokens = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsEmitting(true);
    setEmissionStep('confirming');

    // Simulate blockchain transaction
    setTimeout(() => {
      setEmissionStep('success');
      setIsEmitting(false);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        resetModal();
      }, 2000);
    }, 3000);
  };

  const resetModal = () => {
    setAmount('');
    setEmissionStep('form');
    setIsEmitting(false);
  };

  const handleClose = () => {
    if (!isEmitting) {
      onClose();
      resetModal();
    }
  };

  const renderForm = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Emit Fan Tokens
          </DialogTitle>
        </DialogHeader>
      </div>

      {/* Token Info */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200/50">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Name:</span>
            <span className="text-sm font-medium text-gray-900">{tokenData.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Symbol:</span>
            <span className="text-sm font-medium text-gray-900">{tokenData.symbol}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Network:</span>
            <span className="text-sm font-medium text-gray-900">{tokenData.network}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Supply:</span>
            <span className="text-sm font-medium text-gray-900">{tokenData.currentSupply.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Max Supply:</span>
            <span className="text-sm font-medium text-gray-900">{tokenData.maxSupply.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
          Amount to Emit
        </Label>
        <Input
          id="amount"
          type="number"
          placeholder="Ex: 10000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-lg"
        />
        <div className="text-xs text-gray-500">
          Available for emission: {(tokenData.maxSupply - tokenData.currentSupply).toLocaleString()} tokens
        </div>
      </div>

      {/* Warning */}
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200/50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Warning</h4>
            <p className="text-sm text-gray-600">
              Token emission is an irreversible operation on the blockchain. 
              Make sure of the amount before confirming.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          onClick={handleClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleEmitTokens}
          disabled={!amount || parseFloat(amount) <= 0}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
        >
          Emit {amount ? parseFloat(amount).toLocaleString() : ''} Tokens
        </Button>
      </div>
    </div>
  );

  const renderConfirming = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Emitting Tokens...
          </h2>
          <p className="text-gray-600">
            Processing transaction on Chiliz Chain
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Preparing transaction...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm text-gray-700">Sending to blockchain...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm text-gray-700">Waiting for confirmation...</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200/50">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Emitting</h4>
            <p className="text-sm text-gray-600">
              {parseFloat(amount).toLocaleString()} {tokenData.symbol} tokens
            </p>
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
            Tokens Emitted Successfully!
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="text-sm font-bold text-green-600">{parseFloat(amount).toLocaleString()} {tokenData.symbol}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Network:</span>
            <span className="text-sm text-gray-900">{tokenData.network}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="text-sm text-green-600 font-semibold">Confirmed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">New Supply:</span>
            <span className="text-sm text-gray-900">{(tokenData.currentSupply + parseFloat(amount)).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (emissionStep) {
      case 'confirming':
        return renderConfirming();
      case 'success':
        return renderSuccess();
      default:
        return renderForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="p-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenEmissionModal;