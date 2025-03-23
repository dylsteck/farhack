import './globals.css'
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';
import { BANNER_IMG, BASE_URL, ICON_IMG, karla } from "./lib/utils";
import FarHackLogo from "../components/custom/icons/farhack-logo";
import SignInWithFarcaster from "../components/custom/sign-in-with-farcaster";
import Head from 'next/head';
import Script from 'next/script';
import OnchainProviders from '../components/custom/onchain-providers';
import FrameProvider from '../components/custom/frame-provider';
import { Toaster } from 'sonner';
import Nav from '@/components/custom/nav';

export function generateMetadata(){
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth()
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
              <Nav />
              {children}
              <Toaster />
            </FrameProvider>
          </OnchainProviders>
        </SessionProvider>
      </body>
    </html>
  );
}