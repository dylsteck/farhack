'use client';

import React from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';

export function HackthonNavItem({ name, slug }: { name: string, slug: string }) {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  const isSelected = (name === 'Home' && pathname.endsWith(parts[1])) || pathname.endsWith(slug);

  return (
    <Link
      href={`/hackathons/${parts[1]}${slug}`}
      className={`px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap
        ${isSelected
          ? 'text-white'
          : 'text-white/70 hover:text-white'}`}
    >
      {name}
    </Link>
  );
}