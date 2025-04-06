/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon } from '@/lib/types';

export function HackathonLaoyut({ hackathon, children }: { hackathon: Hackathon, children: ReactNode }) {
  return (
    <div className="w-full min-h-screen md:min-h-full">
      <div className="w-full h-full px-0 md:px-2">
        <div className="rounded-none md:rounded-2xl w-full min-h-screen md:min-h-full border border-transparent md:border-white/10 bg-black/40 backdrop-blur-md mt-4 text-black dark:text-white overflow-x-hidden overflow-y-auto">
          <div className="w-full border-b border-white/10">
            <div className="w-full m-1 ml-2 mt-0 md:mt-3.5 pb-1">
              <HackathonNav hackathon={hackathon as unknown as Hackathon} />
            </div>
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}