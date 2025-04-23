/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react';
import { HackathonNav } from './hackathon-nav';
import { Hackathon } from '@/lib/types';

export function HackathonLaoyut({ hackathon, children }: { hackathon: Hackathon, children: ReactNode }) {
  return (
    <div className="w-full min-h-screen md:min-h-full">
      <div className="w-full h-full flex justify-center">
        <div className="rounded-none md:rounded-2xl w-full max-w-fd-container lg:w-[calc(100%-1rem)] min-h-screen md:min-h-full border border-transparent md:border-neutral-200 dark:md:border-white/10 bg-white dark:bg-black/40 dark:backdrop-blur-md mt-4 text-black dark:text-white overflow-x-hidden overflow-y-auto">
          <div className="w-full border-b border-neutral-200 dark:border-white/10 px-3">
            <div className="w-full m-1 mt-0 md:mt-3.5 pb-1">
              <HackathonNav hackathon={hackathon as unknown as Hackathon} />
            </div>
          </div>
          <div className="w-full px-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}