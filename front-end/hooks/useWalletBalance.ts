'use client';

import { useState, useEffect } from 'react';
import { formatEther, getContract } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';
import deployedContracts from '@/lib/deployedContracts';

export const useWalletBalance = () => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<string>('0');
  const [hypeBalance, setHypeBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = async () => {
    if (!publicClient || !address || !isConnected) {
      setBalance('0');
      setHypeBalance('0');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Fetch native token balance (CHZ/ETH)
      const balanceWei = await publicClient.getBalance({ address });
      setBalance(formatEther(balanceWei));

      // Fetch HYPE token balance (igual ao /web3)
      const hypeTokenContract = getContract({
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        client: publicClient,
      });
      const hypeBalanceWei = await hypeTokenContract.read.balanceOf([
        address as `0x${string}`,
      ]);
      setHypeBalance(formatEther(hypeBalanceWei as bigint));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch balances');
      setBalance('0');
      setHypeBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, [publicClient, address, isConnected]);

  return {
    balance,
    hypeBalance,
    isLoading,
    error,
    refetch: fetchBalances,
  };
}; 