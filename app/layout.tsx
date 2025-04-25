import './global.css';

// TODO: investigate why importing this styles.css messes up the rest of the styling
// import '@coinbase/onchainkit/styles.css';

import type { ReactNode } from 'react';
import { auth } from '@/auth';
import { BANNER_IMG, BASE_URL, ICON_IMG, inter } from '@/lib/utils';
import { Providers } from '@/components/custom/providers';
import { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata>{
  return{
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'FarHack',
      template: '%s | FarHack',
    },
    description: 'The ultimate Farcaster hackathon',
    openGraph: {
      title: 'FarHack',
      description: 'The ultimate Farcaster hackathon',
      images: [BANNER_IMG],
      url: BASE_URL,
      siteName: 'FarHack',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: BANNER_IMG,
        button: {
          title: "View FarHack",
          action: {
            type: "launch_frame",
            name: "FarHack",
            url: `${BASE_URL}`,
            splashImageUrl: ICON_IMG,
            splashBackgroundColor: "#000000",
          },
        },
    })
    }
  } as Metadata
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers session={session}>
          {children}
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS ?? ""} />
    </html>
  );
}
