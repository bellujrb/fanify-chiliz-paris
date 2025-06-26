'use client';

import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { getBalance, readContract } from 'viem/actions';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import deployedContracts from '@/lib/deployedContracts';

export const useWalletBalance = () => {
  const { address, isConnected } = useAccount();
  useWalletClient();
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
      const balanceWei = await getBalance(publicClient, { address });
      const balanceEth = formatEther(balanceWei);
      setBalance(balanceEth);

      // Fetch HYPE token balance
      const hypeBalanceWei = await readContract(publicClient, {
        address: deployedContracts.HypeToken.address as `0x${string}`,
        abi: deployedContracts.HypeToken.abi,
        functionName: 'balanceOf',
        args: [address],
      });
      
      const hypeBalanceFormatted = formatEther(hypeBalanceWei as bigint);
      setHypeBalance(hypeBalanceFormatted);

    } catch (err: any) {
      console.error('Error fetching balances:', err);
      setError(err.message || 'Failed to fetch balances');
      setBalance('0');
      setHypeBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();

    // Set up interval to refresh balance every 30 seconds
    const interval = setInterval(fetchBalances, 30000);

    return () => clearInterval(interval);
  }, [publicClient, address, isConnected]);

  return {
    balance,
    hypeBalance,
    isLoading,
    error,
    refetch: fetchBalances
  };
}; 