import React from 'react';
import { auth } from '@/auth';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import Error from '@/components/custom/error';
import { farhackSDK } from '@/app/lib/api';
import { Hackathon } from '@/app/lib/types';

export default async function YourTeamPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;
    const session = await auth();

    if (!session?.user) return <Error message={`You are not logged in.`} />

    const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;
    if (!hackathon) return <Error message={`Hackathon with slug ${slug} not found.`} />

    return (
        <div className="">
            <div className="text-white flex flex-col gap-1 items-start pl-[2.5%] pr-[4.5%]">
                <HackathonNav hackathon={hackathon} />
            </div>
        </div>
    );
}