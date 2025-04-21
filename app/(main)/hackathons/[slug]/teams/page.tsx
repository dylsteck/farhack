import React from 'react';
import Link from 'next/link';
import { FullHackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import Teams from '@/components/custom/hackathon/teams';
import { farhackSDK } from '@/lib/api';

export default async function HackathonTeamsPage(props: { params: Promise<any> }) {
  const params = await props.params;
  const { slug } = params;
  const hackathon = await farhackSDK.getHackathon(slug) as FullHackathon;

  if (!slug || !hackathon) {
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