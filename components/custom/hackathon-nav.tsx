'use client';

import React, { useRef, useState } from 'react';
import { Hackathon } from '@/lib/types';
import { HackthonNavItem } from './hackathon-nav-item';

export function HackathonNav({ hackathon }: { hackathon: Hackathon }) {
  const hackathonPages = [
    { name: 'Home', slug: '/' },
    {
      name: 'Bounties',
      slug: '/bounties',
      visible: hackathon.bounties?.length > 0,
    },
    {
      name: 'Tracks',
      slug: '/tracks',
      visible: hackathon.tracks?.length > 0,
    },
    { name: 'Teams', slug: '/teams', visible: true },
    { name: 'Your team', slug: '/your-team' },
  ].filter((p) => p.visible !== false);

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-white/5 dark:bg-white/5 rounded-md"
        style={
          hoveredIndex !== null && tabRefs.current[hoveredIndex]
            ? {
                left: `${tabRefs.current[hoveredIndex]?.offsetLeft}px`,
                width: `${tabRefs.current[hoveredIndex]?.offsetWidth}px`,
              }
            : { opacity: 0 }
        }
      />
      <div className="relative flex gap-2 sm:gap-4">
        {hackathonPages.map((page, index) => (
          <div
            key={page.slug}
            ref={(el: HTMLDivElement | null) => {
              tabRefs.current[index] = el;
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-slug={page.slug}
          >
            <HackthonNavItem name={page.name} slug={page.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}