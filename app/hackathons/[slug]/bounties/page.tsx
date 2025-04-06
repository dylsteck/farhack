import React from 'react';
import Bounties from '@/components/custom/hackathon/bounties';
import { farhackSDK } from '@/app/lib/api';
import { Hackathon } from '@/app/lib/types';
import Error from '@/components/custom/error';
import Link from 'next/link';

export default async function HackathonBounitesPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;

    if (!slug) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No slug found. <Link href="/" className="underline">Return to home</Link></p>
            </div>
        );
    }

    const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;

    if(!hackathon) return <Error message={`Hackathon with slug ${slug} not found.`} />

    return <Bounties hackathon={hackathon} />;
}