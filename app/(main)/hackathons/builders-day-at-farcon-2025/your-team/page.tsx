import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import YourTeam from '@/components/custom/hackathon/your-team';
import { auth } from '@/auth';
import { farhackSDK } from '@/lib/api';

export default async function BuildersDayYourTeamPage() {
  const session = await auth();
  const slug = 'builders-day-at-farcon-2025';
  const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>No data found. <Link href="/" className="underline">Return to home</Link></p>
      </div>
    );
  }

  return (
    <HackathonLaoyut hackathon={hackathon}>
      <YourTeam user={session?.user} hackathon={hackathon} />
    </HackathonLaoyut>
  );
}