'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { createWalletClient, custom, type WalletClient, type Address } from 'viem';
import { spicy } from 'viem/chains';

interface WalletContextType {
  walletClient: WalletClient | null;
  address: Address | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    setWalletClient(null);
    setAddress(null);
    setIsConnected(false);
    setError(null);
    
    // Clear cache
    localStorage.removeItem('fanify_wallet_address');
    localStorage.removeItem('fanify_wallet_chain_id');
  }, []);

  // Check for cached connection on mount
  useEffect(() => {
    const checkCachedConnection = async () => {
      const cachedAddress = localStorage.getItem('fanify_wallet_address');
      const cachedChainId = localStorage.getItem('fanify_wallet_chain_id');
      
      if (cachedAddress && cachedChainId && typeof window.ethereum !== 'undefined') {
        try {
          // Verify the connection is still valid
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          
          if (accounts.length > 0 && chainId === cachedChainId) {
            const walletClient = createWalletClient({
              chain: spicy,
              transport: custom(window.ethereum),
            });
            
            setWalletClient(walletClient);
            setAddress(accounts[0] as Address);
            setIsConnected(true);
          } else {
            // Clear invalid cache
            localStorage.removeItem('fanify_wallet_address');
            localStorage.removeItem('fanify_wallet_chain_id');
          }
        } catch (error) {
          console.error('Error checking cached connection:', error);
          localStorage.removeItem('fanify_wallet_address');
          localStorage.removeItem('fanify_wallet_chain_id');
        }
      }
    };

    checkCachedConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnect();
        } else {
          // Account changed
          setAddress(accounts[0] as Address);
          localStorage.setItem('fanify_wallet_address', accounts[0]);
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [disconnect]);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask first.');
      setIsConnecting(false);
      return;
    }

    try {
      // Explicitly request permissions, which always triggers the wallet popup
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      // Now get the accounts
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found after requesting permissions.');
      }

      // Get chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Check if we're on the correct network (Spicy)
      if (chainId !== '0x15b32') { // Spicy Chain ID in hex (88889 decimal)
        try {
          // Try to switch to Spicy network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x15b32' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // Network not added, try to add it with correct configuration
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x15b32',
                chainName: 'Spicy Chain',
                nativeCurrency: {
                  name: 'Chiliz',
                  symbol: 'CHZ',
                  decimals: 18,
                },
                rpcUrls: ['https://spicy-rpc.chiliz.com'],
                blockExplorerUrls: ['https://testnet.chiliscan.com/'],
                iconUrls: ['https://s2.coinmarketcap.com/static/img/coins/64x64/4066.png']
              }],
            });
          } else {
            throw new Error('Erro ao trocar para a rede Spicy');
          }
        }
      }

      // Create wallet client
      const client = createWalletClient({
        chain: spicy,
        transport: custom(window.ethereum),
      });

      // Cache the connection
      localStorage.setItem('fanify_wallet_address', accounts[0]);
      localStorage.setItem('fanify_wallet_chain_id', chainId);

      setWalletClient(client);
      setAddress(accounts[0] as Address);
      setIsConnected(true);
      setError(null);

    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Erro ao conectar wallet');
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const value: WalletContextType = {
    walletClient,
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    clearError: () => setError(null),
    error,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 