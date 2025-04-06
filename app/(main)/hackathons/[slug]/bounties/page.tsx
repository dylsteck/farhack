/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import Bounties from '@/components/custom/hackathon/bounties';
import { farhackSDK } from '@/lib/api';

export default async function HackathonBounitesPage(props: { params: Promise<any> }) {
  const params = await props.params;
  const { slug } = params;
  const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;

  if (!slug || !hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>No data found. <Link href="/" className="underline">Return to home</Link></p>
      </div>
    );
  }

  return (
    <HackathonLaoyut hackathon={hackathon}>
      <Bounties hackathon={hackathon} />
    </HackathonLaoyut>
  );
}