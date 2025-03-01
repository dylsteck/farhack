'use client';

import { ReactNode } from 'react';
import { base } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../lib/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css'; 
 
const queryClient = new QueryClient(); 
 
export default function OnchainProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  );
};