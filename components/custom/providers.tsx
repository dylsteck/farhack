"use client";

import { FrameProvider } from '@/components/custom/frame/frame-provider';
import { RootProvider } from 'fumadocs-ui/provider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { base } from 'wagmi/chains';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { ICON_IMG } from '@/lib/utils';

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider basePath={"/api/auth"} session={session}>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: 'auto',
            theme: 'mini-app-theme',
            name: 'FarHack',
            logo: ICON_IMG,
          },
        }}
      >
        <FrameProvider session={session}>
          <RootProvider>{children}</RootProvider>
        </FrameProvider>
      </MiniKitProvider>
    </SessionProvider>
  );
}
