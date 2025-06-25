"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from 'viem';
import React from "react";

// Chiliz Chain customizada
const chilizChain = {
  id: 88882,
  name: 'Chiliz Spicy',
  network: 'chiliz-spicy',
  nativeCurrency: {
    name: 'Chiliz',
    symbol: 'CHZ',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://spicy-rpc.chiliz.com'] },
    public: { http: ['https://spicy-rpc.chiliz.com'] },
  },
  blockExplorers: {
    default: { name: 'Chiliz Explorer', url: 'https://testnet.chiliscan.com/' },
  },
  testnet: true,
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recomendado',
      wallets: [
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
  chains: [chilizChain],
  transports: {
    [chilizChain.id]: http('https://spicy-rpc.chiliz.com'),
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