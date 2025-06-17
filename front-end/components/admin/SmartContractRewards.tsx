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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Coins,
  Sparkles,
  CheckCircle,
  Loader2,
  Settings
} from 'lucide-react';

interface SmartContractRewardsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RewardTier {
  id: string;
  name: string;
  range: string;
  icon: any;
  color: string;
  enabled: boolean;
  fanTokens: string;
  nftEnabled: boolean;
  nftDescription: string;
}

const SmartContractRewards: React.FC<SmartContractRewardsProps> = ({ isOpen, onClose }) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState<'config' | 'deploying' | 'success'>('config');
  
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([
    {
      id: '1-10',
      name: 'Position 1-10',
      range: 'TOP 1%',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      enabled: true,
      fanTokens: '50',
      nftEnabled: true,
      nftDescription: 'Exclusive Legendary NFT'
    },
    {
      id: '11-50',
      name: 'Position 11-50',
      range: 'TOP 5%',
      icon: Trophy,
      color: 'from-purple-400 to-purple-600',
      enabled: true,
      fanTokens: '25',
      nftEnabled: true,
      nftDescription: 'Epic NFT'
    },
    {
      id: '51-200',
      name: 'Position 51-200',
      range: 'TOP 15%',
      icon: Medal,
      color: 'from-blue-400 to-blue-600',
      enabled: false,
      fanTokens: '10',
      nftEnabled: false,
      nftDescription: 'Rare NFT'
    },
    {
      id: '201-500',
      name: 'Position 201-500',
      range: 'TOP 30%',
      icon: Star,
      color: 'from-green-400 to-green-600',
      enabled: false,
      fanTokens: '5',
      nftEnabled: false,
      nftDescription: 'Common NFT'
    }
  ]);

  const updateRewardTier = (id: string, updates: Partial<RewardTier>) => {
    setRewardTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, ...updates } : tier
    ));
  };

  const handleDeployContract = async () => {
    setIsDeploying(true);
    setDeployStep('deploying');

    // Simulate smart contract deployment
    setTimeout(() => {
      setDeployStep('success');
      setIsDeploying(false);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        resetModal();
      }, 2000);
    }, 4000);
  };

  const resetModal = () => {
    setDeployStep('config');
    setIsDeploying(false);
  };

  const handleClose = () => {
    if (!isDeploying) {
      onClose();
      resetModal();
    }
  };

  const enabledTiers = rewardTiers.filter(tier => tier.enabled);

  const renderConfig = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Configure Rewards
          </DialogTitle>
        </DialogHeader>
      </div>

      {/* Smart Contract Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200/50">
        <div className="flex items-start space-x-3">
          <Settings className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Smart Contract</h4>
            <p className="text-sm text-gray-600">
              Configure the rewards that will be automatically distributed 
              at the end of each season through the Smart Contract.
            </p>
          </div>
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Reward Tiers</h4>
        
        {rewardTiers.map((tier) => {
          const IconComponent = tier.icon;
          return (
            <div key={tier.id} className={`border-2 rounded-2xl p-4 transition-all ${
              tier.enabled ? 'border-purple-300 bg-purple-50/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-start space-x-4">
                {/* Enable Checkbox */}
                <div className="pt-1">
                  <Checkbox
                    checked={tier.enabled}
                    onCheckedChange={(checked) => 
                      updateRewardTier(tier.id, { enabled: !!checked })
                    }
                  />
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">{tier.name}</h5>
                    <p className="text-sm text-gray-600">{tier.range}</p>
                  </div>

                  {tier.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Fan Tokens */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Fan Tokens</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={tier.fanTokens}
                            onChange={(e) => updateRewardTier(tier.id, { fanTokens: e.target.value })}
                            className="flex-1"
                            placeholder="0"
                          />
                          <Coins className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      {/* NFT */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={tier.nftEnabled}
                            onCheckedChange={(checked) => 
                              updateRewardTier(tier.id, { nftEnabled: !!checked })
                            }
                          />
                          <Label className="text-sm font-medium">NFT</Label>
                          <Sparkles className="w-4 h-4 text-purple-500" />
                        </div>
                        {tier.nftEnabled && (
                          <Input
                            value={tier.nftDescription}
                            onChange={(e) => updateRewardTier(tier.id, { nftDescription: e.target.value })}
                            placeholder="NFT Description"
                            className="text-sm"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {enabledTiers.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50">
          <h4 className="font-semibold text-gray-900 mb-3">Configuration Summary</h4>
          <div className="space-y-2">
            {enabledTiers.map((tier) => (
              <div key={tier.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{tier.name}:</span>
                <span className="font-medium text-gray-900">
                  {tier.fanTokens} tokens{tier.nftEnabled ? ' + NFT' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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
          onClick={handleDeployContract}
          disabled={enabledTiers.length === 0}
          className="flex-1 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white"
        >
          Configure Smart Contract
        </Button>
      </div>
    </div>
  );

  const renderDeploying = () => (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Configuring Smart Contract...
          </h2>
          <p className="text-gray-600">
            Deploying settings to Chiliz Chain
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Compilando contrato...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm text-gray-700">Implantando na blockchain...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm text-gray-700">Configurando recompensas...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <span className="text-sm text-gray-700">Aguardando confirmação...</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200/50">
        <h4 className="font-semibold text-gray-900 mb-2">Configurações Ativas:</h4>
        <div className="space-y-1">
          {enabledTiers.map((tier) => (
            <div key={tier.id} className="text-sm text-gray-600">
              • {tier.name}: {tier.fanTokens} tokens{tier.nftEnabled ? ' + NFT' : ''}
            </div>
          ))}
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
            Smart Contract Configurado!
          </DialogTitle>
        </DialogHeader>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Contrato:</span>
            <span className="text-sm font-mono text-gray-900">0x1234...abcd</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Rede:</span>
            <span className="text-sm text-gray-900">Chiliz Chain</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Faixas Ativas:</span>
            <span className="text-sm text-gray-900">{enabledTiers.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="text-sm text-green-600 font-semibold">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (deployStep) {
      case 'deploying':
        return renderDeploying();
      case 'success':
        return renderSuccess();
      default:
        return renderConfig();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartContractRewards;