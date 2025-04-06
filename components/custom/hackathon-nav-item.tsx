'use client';

import React from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';

export function HackthonNavItem({ name, slug }: { name: string, slug: string }) {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const isSelected = (name === 'Home' && pathname.endsWith(parts[1])) || pathname.endsWith(slug);
    return(
        <Link href={`/hackathons/${parts[1]}${slug}`} className={`${isSelected ? 'font-medium rounded-full bg-baseGrey text-white px-3': ''} text-white text-md md:text-xl hover:text-gray-300 cursor-pointer w-auto whitespace-nowrap`}>
            {name}
        </Link>
    )
}