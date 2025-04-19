import './global.css';

// TODO: investigate why importing this styles.css messes up the rest of the styling
// import '@coinbase/onchainkit/styles.css';
import type { ReactNode } from 'react';
import { auth } from '@/auth';
import { inter } from '@/lib/utils';
import { Providers } from '@/components/custom/providers';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
