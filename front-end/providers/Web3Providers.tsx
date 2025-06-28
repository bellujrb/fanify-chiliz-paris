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
  chains: [spicy],
  transports: {
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