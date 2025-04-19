/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { CalendarIcon, PlusCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface HackathonDetailsProps {
  hackathon: Hackathon;
  slug: string;
}

export function HackathonDetails({ hackathon, slug }: HackathonDetailsProps) {
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
        
        {/* Action Buttons Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Actions</h2>
          <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/20 to-white/5 mb-5"></div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/hackathons/${slug}/your-team`}>
              <Button 
                variant="outline" 
                className="flex items-center gap-3 py-6 px-8 bg-zinc-800/60 hover:bg-zinc-700/80 border-zinc-700 hover:border-zinc-500 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg"
              >
                <PlusCircledIcon className="w-5 h-5" />
                <span className="font-medium">Create a team</span>
              </Button>
            </Link>
            <Link href={`/hackathons/${slug}/bounties`}>
              <Button 
                variant="outline" 
                className="flex items-center gap-3 py-6 px-8 bg-zinc-800/60 hover:bg-zinc-700/80 border-zinc-700 hover:border-zinc-500 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg"
              >
                <RocketIcon className="w-5 h-5" />
                <span className="font-medium">View bounties</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 