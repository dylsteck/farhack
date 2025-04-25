/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import { CalendarIcon, PlusCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import { farhackSDK } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { HackathonDetails } from '@/components/custom/hackathon/hackathon';
import { Metadata, Viewport } from 'next';
import { BASE_URL, BUILDERS_DAY_FARCON_2025_BANNER_IMG, ICON_IMG } from '@/lib/utils';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata>{
  const BUILDERS_DAY_URL = `${BASE_URL}/hackathons/builders-day-at-farcon-2025`;
  return {
    metadataBase: new URL(BUILDERS_DAY_FARCON_2025_BANNER_IMG),
    title: "Builders Day at FarCon 2025",
    description: 'Builders Day is a 24-hour hackathon, running from 8:30 AM on May 1 through 8:30 AM on May 2 (the start of The Summit).',
    openGraph: {
      title: "Builders Day at FarCon 2025",
      description: 'Builders Day is a 24-hour hackathon, running from 8:30 AM on May 1 through 8:30 AM on May 2 (the start of The Summit).',
      images: [BUILDERS_DAY_FARCON_2025_BANNER_IMG],
      url: BUILDERS_DAY_URL,
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
        imageUrl: BUILDERS_DAY_FARCON_2025_BANNER_IMG,
        button: {
          title: "View Hackathon",
          action: {
            type: "launch_frame",
            name: "FarHack",
            url: BUILDERS_DAY_URL,
            splashImageUrl: ICON_IMG,
            splashBackgroundColor: "#000000",
          },
        },
    })
    }
  } as Metadata
}

export default async function BuildersDayPage() {
  const slug = 'builders-day-at-farcon-2025';
  const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;
  if (!slug || !hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>
          No data found.{' '}
          <Link href="/" className="underline">
            Return to home
          </Link>
        </p>
      </div>
    );
  }

  const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <HackathonLaoyut hackathon={hackathon}>
      <HackathonDetails hackathon={hackathon} slug={slug} />
    </HackathonLaoyut>
  );
}