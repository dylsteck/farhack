import React from 'react';
import Teams from '@/components/custom/hackathon/teams';
import { farhackSDK } from '@/app/lib/api';
import { FullHackathon } from '@/app/lib/types';
import Error from '@/components/custom/error';

export default async function HackathonBounitesPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;

    if (!slug) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No slug found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    const hackathon = await farhackSDK.getHackathon(slug) as FullHackathon;

    if(!hackathon) return <Error message={`Hackathon with slug ${slug} not found.`} />

    return <Teams hackathon={hackathon} />;
}