import React from 'react';
import Link from 'next/link';
import { FullHackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import Teams from '@/components/custom/hackathon/teams';
import { farhackSDK } from '@/lib/api';

export default async function BuildersDayTeamsPage() {
  const slug = 'builders-day-at-farcon-2025';
  const hackathon = await farhackSDK.getHackathon(slug) as FullHackathon;

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>No data found. <Link href="/" className="underline">Return to home</Link></p>
      </div>
    );
  }

  return (
    <HackathonLaoyut hackathon={hackathon}>
      <Teams hackathon={hackathon} />
    </HackathonLaoyut>
  );
}