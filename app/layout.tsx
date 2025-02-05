/* eslint-disable @next/next/no-img-element */
import './globals.css'
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';
import { BANNER_IMG, BASE_URL, ICON_IMG, karla } from "./lib/utils";
import FarhackLogo from "./components/icons/farhack-logo";
import SignInWithFarcaster from "./components/sign-in-with-farcaster";
import Head from 'next/head';
import Script from 'next/script';
import OnchainProviders from './components/onchain-providers';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Package2 } from 'lucide-react';
import FrameProvider from './components/frame-provider';

export function generateMetadata(){
  return{
    metadataBase: new URL('https://farhack.xyz'),
    title: {
      default: 'FarHack',
      template: '%s | FarHack',
    },
    description: 'The ultimate Farcaster hackathon',
    openGraph: {
      title: 'FarHack',
      description: 'The ultimate Farcaster hackathon',
      images: ['https://i.imgur.com/4sLMVg2.png'],
      url: 'https://farhack.xyz',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth()
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const isAdmin = pathname && pathname.includes("/admin");

  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    }
  }

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="og:title" content="FarHack" />
        <title>FarHack</title>
      </Head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <body className={`${karla.className} dark bg-black`}>
        <SessionProvider basePath={"/api/auth"} session={session}>
          <OnchainProviders>
            <FrameProvider>
              {isAdmin ? children : 
                  <div className="flex flex-col gap-4 min-h-screen">
                    <nav className="w-full bg-black/75 flex items-center justify-between p-4 pb-3 border-b border-white/20">
                      <div className="flex items-center gap-6">
                        <Link
                          href="/"
                          className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                          <FarhackLogo width={35} height={35} />
                          <p className={`text-white text-2xl mr-4 ${karla.className}`}>FarHack</p>
                        </Link>
                        <Link
                          href="https://warpcast.com/~/channel/farhack"
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          /farhack
                        </Link>
                      </div>
                      <div className="flex items-center gap-6">
                        <SignInWithFarcaster />
                      </div>
                    </nav>
                    {children}
                </div>
              }
            </FrameProvider>
          </OnchainProviders>
        </SessionProvider>
      </body>
    </html>
  );
}