import React from 'react';
import { HackthonNavItem } from './hackathon-nav-item';

const hackathonPages = [
    {
        name: 'Home',
        slug: '/'
    },
    {
        name: 'Tracks',
        slug: '/tracks'
    },
    {
        name: 'Bounties',
        slug: '/bounties'
    },
    {
        name: 'Teams',
        slug: '/teams'
    },
    {
        name: 'Your team',
        slug: '/your-team'
    }
]

export function HackathonNav({ hackathon }: { hackathon: any }) {
    return(
        <div>
            <div className="text-white flex flex-col gap-1 items-start">
                <p className="text-4xl">{hackathon.name ? hackathon.name : "Hackathon"}</p>
                <div className="flex flex-row gap-2 md:gap-4 items-center mt-3.5 overflow-x-clip scrollbar-hide">
                    {hackathonPages.map((page) => 
                        <HackthonNavItem key={page.slug} name={page.name} slug={page.slug} />
                    )}
                </div>
            </div>
        </div>
    )
}