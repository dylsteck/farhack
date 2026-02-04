/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getHackathon } from '@/lib/data';
import { Metadata, Viewport } from 'next';
import { BASE_URL, FARCON_ROME_2026_BANNER_IMG, funnelDisplay, funnelSans, ICON_IMG } from '@/lib/utils';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const FARHACK_ONLINE_URL = `${BASE_URL}/hackathons/farhack-online-2026`;
  return {
    metadataBase: new URL(FARCON_ROME_2026_BANNER_IMG),
    title: "FarHack Online 2026",
    description: 'Two weeks to build the future of Farcaster. Hack on Miniapps, Clients, or Agents — top projects showcase live at FarCon Rome.',
    openGraph: {
      title: "FarHack Online 2026",
      description: 'Two weeks to build the future of Farcaster. Hack on Miniapps, Clients, or Agents — top projects showcase live at FarCon Rome.',
      images: [FARCON_ROME_2026_BANNER_IMG],
      url: FARHACK_ONLINE_URL,
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
        imageUrl: FARCON_ROME_2026_BANNER_IMG,
        button: {
          title: "View Hackathon",
          action: {
            type: "launch_frame",
            name: "FarHack",
            url: FARHACK_ONLINE_URL,
            splashImageUrl: ICON_IMG,
            splashBackgroundColor: "#000000",
          },
        },
      })
    }
  } as Metadata;
}

const tracks = [
  {
    name: "Miniapps",
    description: "Ship compact, powerful apps that live inside Farcaster. Think tools, games, and utilities that users reach for every day.",
  },
  {
    name: "Clients",
    description: "Reimagine how people experience Farcaster. Build a new client or push an existing one forward with fresh features and bold UX.",
  },
  {
    name: "Agents",
    description: "Build autonomous agents that bring intelligence to the Farcaster network, from content curation to agentic commerce and beyond.",
  },
];

export default async function FarConRomePage() {
  const hackathon = await getHackathon('farhack-online-2026');

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>Hackathon not found</p>
      </div>
    );
  }

  return (
    <main className={`min-h-screen bg-black text-white ${funnelSans.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img
            src={hackathon.square_image}
            alt={hackathon.name}
            className="w-32 h-32 mx-auto rounded-xl mb-6"
          />
          <h1 className={`text-4xl font-bold mb-4 ${funnelDisplay.className}`}>{hackathon.name}</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Two weeks to build what&apos;s next for Farcaster. Pick a track, ship something great, and put your project in front of the community at FarCon Rome.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="px-4 py-1.5 text-sm font-medium text-violet-300 bg-violet-500/10 rounded-full ring-1 ring-violet-500/20">
              April 2026
            </span>
            <span className="px-4 py-1.5 text-sm font-medium text-cyan-300 bg-cyan-500/10 rounded-full ring-1 ring-cyan-500/20">
              Online
            </span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-2 text-center ${funnelDisplay.className}`}>All tracks lead to Rome</h2>
          <p className="text-gray-400 text-center mb-8">Hack on what excites you. Every track leads to the stage in Rome.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.name}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <h3 className={`text-lg font-semibold mb-3 ${funnelDisplay.className}`}>{track.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center border border-gray-800 rounded-xl p-8 bg-gray-900">
          <h2 className={`text-2xl font-bold mb-3 ${funnelDisplay.className}`}>From Screen to Stage</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            The standout projects won&apos;t just live online. They&apos;ll be showcased live at{' '}
            <a
              href="https://farcon.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              FarCon Rome
            </a>
            {' '}in May 2026 — in front of the Farcaster community.
          </p>
        </div>
      </div>
    </main>
  );
}
