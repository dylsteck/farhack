import React from 'react';
import { latestHackathons as hackathons } from '@/lib/data';
import Link from 'next/link';
import { FullHackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import Tracks from '@/components/custom/hackathon/tracks';

export default async function HackathonTracksPage(props: { params: Promise<any> }) {
  const params = await props.params;
  const { slug } = params;
  const hackathon = hackathons.find((h) => h.slug === slug) as unknown as FullHackathon;

  if (!slug || !hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>No data found. <Link href="/" className="underline">Return to home</Link></p>
      </div>
    );
  }

  return (
    <HackathonLaoyut hackathon={hackathon}>
      <Tracks hackathon={hackathon} />
    </HackathonLaoyut>
  );
}