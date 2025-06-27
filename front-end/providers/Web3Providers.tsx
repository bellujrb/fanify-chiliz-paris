"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from 'viem';
import { spicy } from 'viem/chains';
import React from "react";

// Anvil Local Chain para testes
const anvilChain = {
  id: 31337,
  name: 'Anvil Local',
  network: 'anvil',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
    public: { http: ['http://localhost:8545'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan (Local)', url: 'http://localhost:8545' },
  },
  testnet: true,
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recomendado',
      wallets: [
        metaMaskWallet,
        injectedWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'FanifyChiliz',
    projectId: '3ac832407e6d725a1f6d2bdae6c1d049',
  }
);

const config = createConfig({
  connectors,
  chains: [anvilChain, spicy],
  transports: {
    [anvilChain.id]: http('http://localhost:8545'),
    [spicy.id]: http('https://spicy-rpc.chiliz.com'),
  },
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 