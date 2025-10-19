/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getHackathon } from '@/lib/data';
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
          title: "View Recap",
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
  const hackathon = await getHackathon('builders-day-at-farcon-2025');
  
  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>Hackathon not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img
            src={hackathon.square_image}
            alt={hackathon.name}
            className="w-32 h-32 mx-auto rounded-xl mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">{hackathon.name}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">{hackathon.description}</p>
          <div className="mt-6 text-gray-400">
            <p>{new Date(hackathon.start_date).toLocaleDateString()} - {new Date(hackathon.end_date).toLocaleDateString()}</p>
          </div>
          {/* TODO: add winners data back here from previous commits */}
        </div>
      </div>
    </main>
  );
}