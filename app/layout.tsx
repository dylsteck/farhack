import './global.css';
import { FrameProvider } from '@/components/custom/frame-provider';
import { RootProvider } from 'fumadocs-ui/provider';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { auth } from '@/auth';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <SessionProvider basePath={"/api/auth"} session={session}>
          <FrameProvider session={session}>
            <RootProvider>
              {children}
            </RootProvider>
          </FrameProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
