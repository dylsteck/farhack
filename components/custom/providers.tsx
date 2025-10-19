"use client";

import { MiniAppProvider } from '@/components/custom/miniapp/miniapp-provider';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MiniAppProvider>
      <RootProvider>{children}</RootProvider>
    </MiniAppProvider>
  );
}
