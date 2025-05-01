/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Hackathon } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { CalendarIcon, PlusCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { BookIcon } from 'lucide-react';

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

  const totalPrizePool = hackathon.bounties?.reduce((sum, bounty) => sum + (bounty.amount?.value || 0), 0) || 0;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-start items-start gap-10 mt-3 md:mt-6 py-2 pb-6 px-4">
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
              <p className="text-lg text-black/70 dark:text-white/70">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <p className="text-xl text-black/90 dark:text-white/90 leading-relaxed">
            {hackathon.description}
          </p>
        </div>
      </div>

      {hackathon.bounties && hackathon.bounties.length > 0 && (
        <div className="w-full mt-10 px-4 md:px-6 lg:px-8 pb-10">
          <div className="max-w-md mx-auto md:max-w-lg lg:max-w-xl">
            <div className="text-center mb-8">
              {slug === 'builders-day-at-farcon-2025' ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                  <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                      {formatCurrency(totalPrizePool)}
                    </h2>
                    <p className="text-lg text-black/70 dark:text-white/70 mt-1">
                      Partner Bounties (below)
                    </p>
                  </div>
                  <span className="text-3xl md:text-4xl font-semibold text-black/70 dark:text-white/70">+</span>
                  <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                      {formatCurrency(10000)}
                    </h2>
                    <p className="text-lg text-black/70 dark:text-white/70 mt-1">
                      Grand Prizes
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
                    {formatCurrency(totalPrizePool)}
                  </h2>
                  <p className="text-xl text-black/70 dark:text-white/70 mt-2">
                    Available in prizes
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {hackathon.bounties.map((bounty, id) => (
                <div
                  key={`${hackathon.slug}-bounty-${id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-neutral-50 dark:bg-zinc-900/80 border-neutral-200 dark:border-zinc-700/60 shadow-sm hover:border-neutral-300 dark:hover:border-zinc-600 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 size-10 rounded-full bg-neutral-200 dark:bg-zinc-700/80 flex items-center justify-center overflow-hidden">
                    {bounty.image ? (
                      <img 
                        src={bounty.image} 
                        alt={`${bounty.name} logo`} 
                        className="size-full object-cover" 
                      />
                    ) : (
                      <span className="text-lg font-medium text-neutral-600 dark:text-zinc-400">
                        {bounty.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-black dark:text-white">{bounty.name}</p>
                    {bounty.amount && (
                      <p className="text-sm text-black/70 dark:text-white/70">
                        {formatCurrency(bounty.amount.value)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-6 mb-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-md mx-auto md:max-w-lg lg:max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Start Hacking!</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={`/hackathons/${slug}/your-team`}>
              <Button
                variant="outline"
                className="flex w-full sm:w-auto justify-center items-center gap-3 py-3 px-6 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer font-medium"
              >
                <PlusCircledIcon className="w-5 h-5" />
                <span>Create a team</span>
              </Button>
            </Link>
            <Link href={`/hackathons/${slug}/bounties`}>
              <Button
                variant="outline"
                className="flex w-full sm:w-auto justify-center items-center gap-3 py-3 px-6 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer font-medium"
              >
                <RocketIcon className="w-5 h-5" />
                <span>View bounty info</span>
              </Button>
            </Link>
            <Link href="/hacking-guide">
              <Button
                variant="outline"
                className="flex w-full sm:w-auto justify-center items-center gap-3 py-3 px-6 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:border-zinc-600 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer font-medium"
              >
                <BookIcon className="w-5 h-5" />
                <span>Read the Hacking Guide</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 