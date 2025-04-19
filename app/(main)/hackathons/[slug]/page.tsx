/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import { CalendarIcon, PlusCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import { farhackSDK } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { HackathonDetails } from '@/components/custom/hackathon/hackathon';

export default async function HackathonBySlugPage(props: { params: Promise<any> }) {
  const params = await props.params;
  const { slug } = params;
  const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;
  if (!slug || !hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>
          No data found.{' '}
          <Link href="/" className="underline">
            Return to home
          </Link>
        </p>
      </div>
    );
  }

  const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <HackathonLaoyut hackathon={hackathon}>
       <HackathonDetails hackathon={hackathon} slug={slug} />
    </HackathonLaoyut>
  );
}