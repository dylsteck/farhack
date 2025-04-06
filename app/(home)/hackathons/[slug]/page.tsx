/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { latestHackathons as hackathons } from '@/lib/data';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { HackathonLaoyut } from '@/components/custom/hackathon/hackathon-layout';
import { CalendarIcon } from '@radix-ui/react-icons';

export default async function HackathonBySlugPage(props: { params: Promise<any> }) {
  const params = await props.params;
  const { slug } = params;
  const hackathon = hackathons.find((h) => h.slug === slug) as unknown as Hackathon;

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
      <div className="flex flex-col lg:flex-row justify-start items-start gap-10 mt-3 md:mt-6 px-3 py-2 pb-6">
        <div className="flex-shrink-0">
          <img
            src={hackathon.square_image}
            alt={`${hackathon?.name} Hackathon`}
            loading="lazy"
            className="rounded-xl size-full md:size-64 object-cover border border-white/10 shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 text-left w-full max-w-2xl">
          <div className="flex flex-col justify-center gap-1 text-left w-full max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              {hackathon.name}
            </h1>
            <div className="flex flex-row gap-2 items-center">
              <CalendarIcon className="w-4 h-4" />
              <p className="text-lg text-white/70">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <p className="text-xl text-white/90 leading-relaxed">
            {hackathon.description}
          </p>
        </div>
      </div>
    </HackathonLaoyut>
  );
}