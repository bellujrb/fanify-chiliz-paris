'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Clock,
  Target,
  Coins,
  Zap
} from 'lucide-react';
import { parseEther, getContract } from 'viem';
import deployedContracts from '@/lib/deployedContracts';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { useWalletBalance } from '@/hooks/useWalletBalance';

const StakingSection: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  
  // Dados reais do usuário
  const { balance, hypeBalance, isLoading, refetch } = useWalletBalance();

  // Formatar valores para exibição
  const formatBalance = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  };

  // Dados de staking reais (baseados no saldo de HYPE)
  const stakingData = {
    totalStaked: parseFloat(hypeBalance) / 1000 || 0, // CHZ staked (1 CHZ = 1000 HYPE)
    totalHype: parseFloat(hypeBalance) || 0, // HYPE tokens received
    pendingRewards: 0, // Por enquanto 0, pode ser implementado depois
    stakingAPY: 18.5, // Annual percentage yield
    timeStaked: '15 days' // Mock data
  };

  const calculateHypeReceived = (amount: string) => {
    // 1 CHZ = 1000 HYPE
    return (parseFloat(amount) || 0) * 1000;
  };

  const calculateRewards = (amount: string) => {
    const amountNum = parseFloat(amount) || 0;
    const dailyRate = stakingData.stakingAPY / 365 / 100;
    return (amountNum * dailyRate * 30).toFixed(2); // Monthly estimate (in CHZ)
  };

  // Função de stake real usando wagmi
  const handleStake = async () => {
    if (!isConnected || !address) {
      toast({
        title: '❌ Carteira não conectada',
        description: 'Conecte sua carteira primeiro',
        variant: 'destructive',
      });
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: '❌ Valor inválido',
        description: 'Insira um valor válido para stake',
        variant: 'destructive',
      });
      return;
    }

    if (!walletClient) {
      toast({
        title: '❌ Wallet não disponível',
        description: 'Wallet client não está disponível',
        variant: 'destructive',
      });
      return;
    }

    // Verificar se tem saldo suficiente
    const currentBalance = parseFloat(balance);
    const stakeValue = parseFloat(stakeAmount);
    if (currentBalance < stakeValue) {
      toast({
        title: '❌ Saldo insuficiente',
        description: `Você tem ${formatBalance(balance)} CHZ, mas está tentando stakar ${stakeAmount} CHZ`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Iniciando stake...', {
        address,
        amount: stakeAmount,
        contractAddress: deployedContracts.HypeToken.address
      });

      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      console.log('Contrato criado, chamando stake...');

      const hash = await hypeTokenContract.write.stake({
        value: parseEther(stakeAmount),
      });

      console.log('Stake realizado com sucesso!', hash);

      toast({
        title: '💰 Stake Realizado!',
        description: `${stakeAmount} CHZ foram stakados. Hash: ${hash.slice(0, 10)}...`,
      });
      
      setStakeAmount('');
      
      // Atualizar saldos após o stake
      setTimeout(() => {
        refetch();
      }, 2000);
      
    } catch (error: any) {
      console.error('Erro no stake:', error);
      
      let errorMessage = 'Falha ao stakar tokens.';
      if (error?.message) {
        if (error.message.includes('insufficient funds')) {
          errorMessage = 'Saldo insuficiente de CHZ.';
        } else if (error.message.includes('user rejected')) {
          errorMessage = 'Transação cancelada pelo usuário.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Erro de rede. Verifique sua conexão.';
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: '❌ Erro no Stake',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Função de unstake real usando wagmi
  const handleUnstake = async () => {
    if (!isConnected || !address) {
      toast({
        title: '❌ Carteira não conectada',
        description: 'Conecte sua carteira primeiro',
        variant: 'destructive',
      });
      return;
    }

    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: '❌ Valor inválido',
        description: 'Insira um valor válido para unstake',
        variant: 'destructive',
      });
      return;
    }

    if (!walletClient) {
      toast({
        title: '❌ Wallet não disponível',
        description: 'Wallet client não está disponível',
        variant: 'destructive',
      });
      return;
    }

    // Verificar se tem HYPE suficiente
    const currentHypeBalance = parseFloat(hypeBalance);
    const unstakeValue = parseFloat(unstakeAmount);
    if (currentHypeBalance < unstakeValue) {
      toast({
        title: '❌ Saldo insuficiente',
        description: `Você tem ${formatBalance(hypeBalance)} HYPE, mas está tentando unstakar ${unstakeAmount} HYPE`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Iniciando unstake...', {
        address,
        amount: unstakeAmount,
        contractAddress: deployedContracts.HypeToken.address
      });

      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: walletClient,
      });

      console.log('Contrato criado, chamando unstake...');

      const hash = await hypeTokenContract.write.unstake([
        parseEther(unstakeAmount)
      ]);

      console.log('Unstake realizado com sucesso!', hash);

      toast({
        title: '🔄 Unstake Realizado!',
        description: `${unstakeAmount} HYPE foram unstakados. Hash: ${hash.slice(0, 10)}...`,
      });
      
      setUnstakeAmount('');
      
      // Atualizar saldos após o unstake
      setTimeout(() => {
        refetch();
      }, 2000);
      
    } catch (error: any) {
      console.error('Erro no unstake:', error);
      
      let errorMessage = 'Falha ao unstakar tokens.';
      if (error?.message) {
        if (error.message.includes('insufficient')) {
          errorMessage = 'Saldo insuficiente de HYPE stakado.';
        } else if (error.message.includes('user rejected')) {
          errorMessage = 'Transação cancelada pelo usuário.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Erro de rede. Verifique sua conexão.';
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: '❌ Erro no Unstake',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
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

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800 font-medium">
            🔗 Connect your wallet to start staking
          </p>
        </div>
      )}

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
                ? 'bg-white text-brand-600 shadow-sm'
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
                      disabled={!isConnected}
                      max={balance}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      CHZ
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Available: {formatBalance(balance)} CHZ
                  </div>
                </div>

                <div className="flex space-x-2">
                  {['25%', '50%', '75%', 'Max'].map((percentage) => (
                    <Button
                      key={percentage}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentBalance = parseFloat(balance);
                        if (isNaN(currentBalance)) return;
                        
                        const multiplier = percentage === 'Max' ? 1 : parseInt(percentage) / 100;
                        const amount = currentBalance * multiplier;
                        setStakeAmount(amount.toFixed(2));
                      }}
                      className="flex-1"
                      disabled={!isConnected || isLoading}
                    >
                      {percentage}
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

                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3"
                  onClick={handleStake}
                  disabled={loading || !stakeAmount || !isConnected}
                >
                  {loading && activeTab === 'stake' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Staking...
                    </span>
                  ) : (
                    <>
                      <ArrowUp className="w-5 h-5 mr-2" />
                      {isConnected ? `Stake ${stakeAmount || '0'} CHZ` : 'Conecte sua carteira'}
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white">
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
                      max={hypeBalance}
                      disabled={!isConnected}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      HYPE
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Available: {formatBalance(hypeBalance)} HYPE
                  </div>
                </div>

                <div className="flex space-x-2">
                  {['25%', '50%', '75%', 'Max'].map((percentage) => (
                    <Button
                      key={percentage}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentHypeBalance = parseFloat(hypeBalance);
                        if (isNaN(currentHypeBalance)) return;
                        
                        const multiplier = percentage === 'Max' ? 1 : parseInt(percentage) / 100;
                        const amount = currentHypeBalance * multiplier;
                        setUnstakeAmount(amount.toFixed(2));
                      }}
                      className="flex-1"
                      disabled={!isConnected || isLoading}
                    >
                      {percentage}
                    </Button>
                  ))}
                </div>

                {unstakeAmount && (
                  <div className="bg-gradient-to-r from-brand-50 to-pink-50 p-4 rounded-xl border border-brand-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <ArrowUpDown className="w-4 h-4 text-brand-600" />
                      <span className="font-semibold text-brand-800">Unstaking Preview</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Unstake Amount:</span>
                        <span className="font-semibold">{unstakeAmount} HYPE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">CHZ Received:</span>
                        <span className="font-semibold text-brand-600">{(parseFloat(unstakeAmount) / 1000 || 0).toFixed(3)} CHZ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Remaining Staked:</span>
                        <span className="font-semibold text-gray-900">
                          {formatBalance((parseFloat(hypeBalance) - parseFloat(unstakeAmount || '0')).toString())} HYPE
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold py-3"
                  onClick={handleUnstake}
                  disabled={loading || !unstakeAmount || !isConnected}
                >
                  {loading && activeTab === 'unstake' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Unstaking...
                    </span>
                  ) : (
                    <>
                      <ArrowDown className="w-5 h-5 mr-2" />
                      {isConnected ? `Unstake ${unstakeAmount || '0'} HYPE` : 'Conecte sua carteira'}
                    </>
                  )}
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
                  <div className="text-gray-600">Convert your CHZ to HYPE tokens (1 CHZ = 1000 HYPE)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">2</div>
                <div>
                  <div className="font-medium text-gray-900">Use HYPE</div>
                  <div className="text-gray-600">HYPE tokens are used for betting on games</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-xs font-bold mt-0.5">3</div>
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
              <div>• 1 CHZ = 1000 HYPE (fixed ratio)</div>
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