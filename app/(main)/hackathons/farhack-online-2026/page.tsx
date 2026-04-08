/* eslint-disable @next/next/no-img-element */
import { HackathonPartnerLogo } from '@/components/custom/hackathon-partner-logo';
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
      "Agent-native operations",
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
      "Human-agent collaborative workflows inside miniapps",
    ],
    tagline: "Miniapps should assume agents are first-class actors.",
  },
  {
    name: "Snaps",
    url: "https://docs.farcaster.xyz/snap",
    description: "Build nimble, interactive apps embedded inside casts.",
    bullets: [
      "Interactive snaps with buttons, sliders & inputs",
      "Agent-driven snaps that act on behalf of users in the feed",
      "Stateful experiences powered by the snap key-value store",
      "New primitives that push what a cast can do",
    ],
    tagline: "Apps that live inside the feed, not beside it.",
  },
];

export default async function FarConRomePage() {
  const hackathon = await getHackathon('farhack-online-2026');

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground text-2xl">
        <p>Hackathon not found</p>
      </div>
    );
  }

  const primaryTrack = tracks[0];
  const secondaryTracks = tracks.slice(1);

  return (
    <main className={`min-h-screen bg-background text-foreground ${funnelSans.className}`}>
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <div className="relative text-center mb-20">
          <div className="absolute inset-0 -top-16 bg-gradient-to-b from-violet-600/15 via-violet-600/5 dark:from-violet-600/10 dark:via-violet-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <img
              src={hackathon.square_image}
              alt={hackathon.name}
              className="w-28 h-28 mx-auto rounded-2xl mb-8 ring-1 ring-gray-950/10 dark:ring-white/10"
            />
            <h1 className={`text-5xl md:text-6xl font-bold mb-5 tracking-tight text-foreground ${funnelDisplay.className}`}>
              {hackathon.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Two weeks to build the Agentic Web on Farcaster.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <span className="px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 bg-violet-500/15 dark:bg-violet-500/10 rounded-full ring-1 ring-violet-500/25 dark:ring-violet-500/20">
                April 6–19, 2026
              </span>
              <span className="px-4 py-1.5 text-sm font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full ring-1 ring-cyan-500/25 dark:ring-cyan-500/20">
                Online
              </span>
            </div>
            <a
              href="https://forms.gle/kLgD3sdfAmn27tGq5"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block px-10 py-3.5 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-colors duration-200 cursor-pointer shadow-lg shadow-violet-600/25 dark:shadow-violet-600/20"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-20 max-w-2xl mx-auto border-l-2 border-violet-500/40 dark:border-violet-500/30 pl-6">
          <h2 className={`text-2xl md:text-3xl font-bold mb-5 text-foreground ${funnelDisplay.className}`}>
            The Future of Farcaster Is Agent-Native
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Farcaster isn&apos;t just a social network. It&apos;s a programmable coordination layer where agents are first-class citizens, with identity, wallets, and the ability to coordinate publicly on an open social graph.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            On Farcaster, agents can post, transact, curate, negotiate, and build alongside humans. This makes it one of the first live environments where agent-native systems can be built and tested in production.
          </p>
        </div>

        {/* Tracks */}
        <div className="mb-20">
          <h2 className={`text-2xl md:text-3xl font-bold mb-10 text-center text-foreground ${funnelDisplay.className}`}>Tracks</h2>

          {/* Primary Track — Agents */}
          <div className="relative mb-6 rounded-2xl p-px bg-gradient-to-b from-violet-500/50 to-violet-500/10 dark:from-violet-500/60 dark:to-violet-500/10">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-950 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h3 className={`text-2xl font-bold text-foreground ${funnelDisplay.className}`}>{primaryTrack.name}</h3>
                {'label' in primaryTrack && (
                  <span className="px-3 py-1 text-xs font-semibold text-violet-800 dark:text-violet-200 bg-violet-500/20 rounded-full ring-1 ring-violet-500/30 uppercase tracking-wider">
                    {primaryTrack.label}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">{primaryTrack.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                {primaryTrack.bullets.map((bullet) => (
                  <div key={bullet} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 py-1">
                    <span className="w-1 h-1 rounded-full bg-violet-500 dark:bg-violet-400 shrink-0" />
                    {bullet}
                  </div>
                ))}
              </div>
              <p className="text-violet-700 dark:text-violet-300/80 text-sm font-medium italic">{primaryTrack.tagline}</p>
            </div>
          </div>

          {/* Secondary Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryTracks.map((track) => (
              <div
                key={track.name}
                className="bg-gray-50/90 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-700 transition-colors duration-200"
              >
                <h3 className={`text-lg font-semibold mb-3 text-foreground ${funnelDisplay.className}`}>
                  {'url' in track && track.url ? (
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200 transition-colors"
                    >
                      {track.name} ↗
                    </a>
                  ) : (
                    track.name
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{track.description}</p>
                <ul className="space-y-2 mb-4">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-gray-600 dark:text-gray-500 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-500 dark:bg-gray-600 mt-1.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground italic">{track.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* From Network to Stage */}
        <div className="relative mb-20 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-purple-600/10 pointer-events-none" />
          <div className="relative text-center py-12 px-8">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 text-foreground ${funnelDisplay.className}`}>From Network to Stage</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The strongest projects will get a free ticket and be showcased live at<br />{' '}
              <strong className="text-foreground">Builders&apos; Day @ FarCon — Rome 2026</strong>, in front of the Farcaster community.
            </p>
          </div>
        </div>

        {/* Sponsors */}
        <div className="mb-20 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-10 text-foreground ${funnelDisplay.className}`}>Partners</h2>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <a href="https://www.privy.io" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              <HackathonPartnerLogo
                srcLight="/sponsors/privy-on-light.svg"
                srcDark="/sponsors/privy.svg"
                alt="Privy"
                className="h-7 w-auto"
              />
            </a>
            <a href="https://farcaster.xyz" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              <HackathonPartnerLogo
                srcLight="/sponsors/farcaster-on-light.svg"
                srcDark="/sponsors/farcaster.svg"
                alt="Farcaster"
                className="h-7 w-auto"
              />
            </a>
            <a href="https://neynar.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-200">
              <HackathonPartnerLogo
                srcLight="/sponsors/neynar-on-light.svg"
                srcDark="/sponsors/neynar.svg"
                alt="Neynar"
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hosted by */}
          <div className="border border-gray-200 dark:border-gray-800/60 rounded-xl p-8 bg-gray-50/70 dark:bg-gray-900/40">
            <h3 className={`text-lg font-semibold mb-2 text-foreground ${funnelDisplay.className}`}>Hosted by</h3>
            <p className="text-sm text-muted-foreground mb-4">
              urbe.eth & Builders Garden — Europe&apos;s builder node for frontier tech experimentation.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://farcaster.xyz/urbe-eth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 cursor-pointer"
              >
                urbe.eth
              </a>
              <a
                href="https://farcaster.xyz/builders-garden"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 cursor-pointer"
              >
                Builders Garden
              </a>
            </div>
          </div>

          {/* Bootcamp */}
          <div className="border border-gray-200 dark:border-gray-800/60 rounded-xl p-8 bg-gray-50/70 dark:bg-gray-900/40">
            <h3 className={`text-lg font-semibold mb-2 text-foreground ${funnelDisplay.className}`}>New to Farcaster?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our online bootcamp to learn how to build agents, miniapps, and clients on Farcaster, from zero to shipping.
            </p>
            <a
              href="https://luma.com/f7ok6tbp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700 ring-1 ring-gray-200/80 dark:ring-gray-700 transition-colors duration-200 cursor-pointer"
            >
              Join the Bootcamp
            </a>
          </div>

          {/* Sponsor / Partner */}
          <div className="border border-violet-200 dark:border-violet-500/20 rounded-xl p-8 bg-violet-500/10 dark:bg-violet-500/5">
            <h3 className={`text-lg font-semibold mb-2 text-foreground ${funnelDisplay.className}`}>Sponsor & Bounties</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Want to set up bounties or sponsor a track? Let&apos;s talk about how to get your tools in front of builders.
            </p>
            <a
              href="https://farcaster.xyz/limone.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
