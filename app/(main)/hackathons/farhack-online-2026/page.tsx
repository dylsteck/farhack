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
    metadataBase: new URL(BASE_URL),
    title: "FarHack Online 2026",
    description: 'Two weeks to build the Agentic Web on Farcaster. Ship agents, agentic miniapps, and next-gen clients. Top projects showcase live at Builders Day @ FarCon in Rome.',
    openGraph: {
      title: "FarHack Online 2026",
      description: 'Two weeks to build the Agentic Web on Farcaster. Ship agents, agentic miniapps, and next-gen clients. Top projects showcase live at Builders Day @ FarCon in Rome.',
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
    name: "Agents",
    label: "Primary Track",
    description: "Build autonomous agents that operate natively on the Farcaster feed.",
    bullets: [
      "Agents with wallets",
      "Agent-native commerce",
      "Autonomous content curation",
      "Agent coordination systems",
      "Agent-only channels",
    ],
    tagline: "Agents aren\u2019t features. They are network participants.",
  },
  {
    name: "Agentic Miniapps",
    description: "Design miniapps that are built for agents and humans.",
    bullets: [
      "Agent-powered or generated miniapps",
      "Agent-to-agent miniapp interactions",
      "Miniapps that agents can discover and invoke autonomously",
      "Human-agent collaborative workflows inside miniapps"
    ],
    tagline: "Miniapps should assume agents are first-class actors.",
  },
  {
    name: "Clients & Interfaces",
    description: "Reimagine the Farcaster client experience for an agent-native world.",
    bullets: [
      "Agent-aware feeds and timelines"          ,                                                                       
      "Publishing tools that support human-agent co-authoring",
      "Agent identity and badges in the social layer",
      "Client-level controls for agent interactions",
      "Discovery surfaces for agent-generated content"
    ],
    tagline: "How does social look when not all participants are human?",
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
        {/* Hero */}
        <div className="text-center mb-16">
          <img
            src={hackathon.square_image}
            alt={hackathon.name}
            className="w-32 h-32 mx-auto rounded-xl mb-6"
          />
          <h1 className={`text-4xl font-bold mb-4 ${funnelDisplay.className}`}>{hackathon.name}</h1>
          <p className={`text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto`}>
            Two weeks to build the Agentic Web on Farcaster.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="px-4 py-1.5 text-sm font-medium text-violet-300 bg-violet-500/10 rounded-full ring-1 ring-violet-500/20">
              April 2026
            </span>
            <span className="px-4 py-1.5 text-sm font-medium text-cyan-300 bg-cyan-500/10 rounded-full ring-1 ring-cyan-500/20">
              Online
            </span>
          </div>
          <a
            href="https://forms.gle/kLgD3sdfAmn27tGq5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-colors"
          >
            Apply Now
          </a>
        </div>

        {/* Vision */}
        <div className="mb-16 max-w-2xl mx-auto">
          <h2 className={`text-2xl font-bold mb-4 text-center ${funnelDisplay.className}`}>
            The Future of Farcaster Is Agent-Native
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Farcaster isn&apos;t just a social network. It&apos;s a programmable coordination layer where agents are first-class citizens, with identity, wallets, and the ability to coordinate publicly on an open social graph.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            On Farcaster, agents can post, transact, curate, negotiate, and build alongside humans. This makes it one of the first live environments where agent-native systems can be built and tested in production.
          </p>
        </div>

        {/* Tracks */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${funnelDisplay.className}`}>Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.name}
                className={`bg-gray-900 border rounded-xl p-6 flex flex-col ${
                  'label' in track
                    ? 'border-violet-500/40 ring-1 ring-violet-500/20'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h3 className={`text-lg font-semibold ${funnelDisplay.className}`}>{track.name}</h3>
                  {'label' in track && (
                    <span className="px-2.5 py-0.5 text-xs font-medium text-violet-300 bg-violet-500/10 rounded-full ring-1 ring-violet-500/20">
                      {track.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{track.description}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">·</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic">{track.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* From Network to Stage */}
        <div className="text-center border border-gray-800 rounded-xl p-8 bg-gray-900 mb-8">
          <h2 className={`text-2xl font-bold mb-3 ${funnelDisplay.className}`}>From Network to Stage</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-2">
            The strongest projects will get a free ticket and be showcased live at<br></br>{' '}
            <strong className="text-white">Builders' Day @ FarCon — Rome 2026</strong>, in front of the Farcaster community.
          </p>
        </div>

        {/* Hosted by */}
        <div className="text-center border border-gray-800 rounded-xl p-8 bg-gray-900 mb-8">
          <h2 className={`text-2xl font-bold mb-3 ${funnelDisplay.className}`}>Hosted by urbe.eth & Builders Garden</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Europe&apos;s builder node for frontier tech experimentation.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <a
              href="https://farcaster.xyz/urbe-eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              urbe.eth
            </a>
            <a
              href="https://farcaster.xyz/builders-garden"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Builders Garden
            </a>
          </div>
        </div>

        {/* Bootcamp */}
        <div className="text-center border border-gray-800 rounded-xl p-8 bg-gray-900">
          <h2 className={`text-2xl font-bold mb-3 ${funnelDisplay.className}`}>New to Farcaster?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Join our online bootcamp to learn how to build agents, miniapps, and clients on Farcaster, from zero to shipping.
          </p>
          <a
            href="https://luma.com/f7ok6tbp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-xl ring-1 ring-gray-700 transition-colors"
          >
            Join the Bootcamp
          </a>
        </div>
      </div>
    </main>
  );
}
