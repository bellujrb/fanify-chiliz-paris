'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Coins, 
  TrendingUp, 
  ArrowUpDown,
  Zap,
  ArrowUp,
  ArrowDown,
  Clock,
  Target
} from 'lucide-react';

const StakingSection: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  // User's current staking data
  const stakingData = {
    totalStaked: 450, // CHZ staked
    totalHype: 450, // HYPE tokens received (1:1 ratio)
    pendingRewards: 12.5, // CHZ rewards
    stakingAPY: 18.5, // Annual percentage yield
    timeStaked: '15 days'
  };

  const calculateHypeReceived = (amount: string) => {
    // 1:1 ratio - 1 CHZ = 1 HYPE
    return parseFloat(amount) || 0;
  };

  const calculateRewards = (amount: string) => {
    const amountNum = parseFloat(amount) || 0;
    const dailyRate = stakingData.stakingAPY / 365 / 100;
    return (amountNum * dailyRate * 30).toFixed(2); // Monthly estimate
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">CHZ Staking Pool</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stake your CHZ tokens to receive HYPE tokens for betting. Earn rewards while your tokens are staked.
        </p>
      </div>

      {/* Stake/Unstake Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('stake')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'stake'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            <span>Stake CHZ</span>
          </button>
          <button
            onClick={() => setActiveTab('unstake')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'unstake'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowDown className="w-4 h-4" />
            <span>Unstake CHZ</span>
          </button>
        </div>
      </div>

      {/* Staking Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stake/Unstake Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          {activeTab === 'stake' ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <ArrowUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Stake CHZ</h3>
                  <p className="text-gray-600">Convert CHZ to HYPE tokens for betting</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Stake
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter CHZ amount"
                      className="pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      CHZ
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {['50', '100', '250', '500'].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setStakeAmount(amount)}
                      className="flex-1"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                {stakeAmount && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <ArrowUpDown className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Conversion Preview</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Stake Amount:</span>
                        <span className="font-semibold">{stakeAmount} CHZ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">HYPE Received:</span>
                        <span className="font-semibold text-green-600">{calculateHypeReceived(stakeAmount)} HYPE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Est. Monthly Rewards:</span>
                        <span className="font-semibold text-green-600">{calculateRewards(stakeAmount)} CHZ</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Stake {stakeAmount || '0'} CHZ
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white">
                  <ArrowDown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Unstake CHZ</h3>
                  <p className="text-gray-600">Convert HYPE back to CHZ tokens</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Unstake
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      placeholder="Enter HYPE amount"
                      className="pr-16"
                      max={stakingData.totalHype}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      HYPE
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Available: {stakingData.totalHype} HYPE
                  </div>
                </div>

                <div className="flex space-x-2">
                  {['25%', '50%', '75%', 'Max'].map((percentage) => (
                    <Button
                      key={percentage}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const multiplier = percentage === 'Max' ? 1 : parseInt(percentage) / 100;
                        setUnstakeAmount((stakingData.totalHype * multiplier).toString());
                      }}
                      className="flex-1"
                    >
                      {percentage}
                    </Button>
                  ))}
                </div>

                {unstakeAmount && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <ArrowUpDown className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-800">Unstaking Preview</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Unstake Amount:</span>
                        <span className="font-semibold">{unstakeAmount} HYPE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">CHZ Received:</span>
                        <span className="font-semibold text-red-600">{calculateHypeReceived(unstakeAmount)} CHZ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Remaining Staked:</span>
                        <span className="font-semibold text-gray-900">
                          {stakingData.totalStaked - parseFloat(unstakeAmount || '0')} CHZ
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3">
                  <ArrowDown className="w-5 h-5 mr-2" />
                  Unstake {unstakeAmount || '0'} HYPE
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {/* How it Works */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              How Staking Works
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold mt-0.5">1</div>
                <div>
                  <div className="font-medium text-gray-900">Stake CHZ</div>
                  <div className="text-gray-600">Convert your CHZ to HYPE tokens (1:1 ratio)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">2</div>
                <div>
                  <div className="font-medium text-gray-900">Use HYPE</div>
                  <div className="text-gray-600">Use HYPE tokens to bet on games and events</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold mt-0.5">3</div>
                <div>
                  <div className="font-medium text-gray-900">Earn Rewards</div>
                  <div className="text-gray-600">Get {stakingData.stakingAPY}% APY on your staked CHZ</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs font-bold mt-0.5">4</div>
                <div>
                  <div className="font-medium text-gray-900">Unstake Anytime</div>
                  <div className="text-gray-600">Convert HYPE back to CHZ whenever you want</div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-yellow-600" />
              <h4 className="font-bold text-yellow-800">Important Notes</h4>
            </div>
            <div className="space-y-2 text-sm text-yellow-700">
              <div>• HYPE tokens are used for betting on games</div>
              <div>• 1 CHZ = 1 HYPE (always 1:1 ratio)</div>
              <div>• Earn {stakingData.stakingAPY}% APY on staked CHZ</div>
              <div>• No lock-up period - unstake anytime</div>
              <div>• Rewards are paid in CHZ tokens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingSection;