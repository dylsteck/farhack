import React from 'react';
import { latestHackathons as hackathons } from '@/lib/data';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import YourTeam from '@/components/custom/hackathon/your-team';
import { auth } from '@/auth';

export default async function HackathonYourTeamPage(props: { params: Promise<any> }) {
  const session = await auth();
  const params = await props.params;
  const { slug } = params;
  const hackathon = hackathons.find((h) => h.slug === slug) as unknown as Hackathon;

  if (!slug || !hackathon || !session) {
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