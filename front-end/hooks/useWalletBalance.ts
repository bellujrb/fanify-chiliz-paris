'use client';

import { useState, useEffect } from 'react';
import { getBalance } from 'viem/actions';
import { formatEther } from 'viem';
import { useWallet } from '@/contexts/WalletContext';

export const useWalletBalance = () => {
  const { walletClient, address, isConnected } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletClient || !address || !isConnected) {
        setBalance('0');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const balanceWei = await getBalance(walletClient, { address });
        const balanceEth = formatEther(balanceWei);
        setBalance(balanceEth);
      } catch (err: any) {
        console.error('Error fetching balance:', err);
        setError(err.message || 'Failed to fetch balance');
        setBalance('0');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();

    // Set up interval to refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);

    return () => clearInterval(interval);
  }, [walletClient, address, isConnected]);

  return {
    balance,
    isLoading,
    error,
    refetch: () => {
      if (walletClient && address && isConnected) {
        getBalance(walletClient, { address })
          .then((balanceWei: bigint) => {
            const balanceEth = formatEther(balanceWei);
            setBalance(balanceEth);
          })
          .catch((err: any) => {
            console.error('Error refetching balance:', err);
            setError(err.message || 'Failed to fetch balance');
          });
      }
    }
  };
}; 