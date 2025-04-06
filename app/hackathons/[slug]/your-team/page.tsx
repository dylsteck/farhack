import React from 'react';
import { farhackSDK } from '@/app/lib/api';
import { Hackathon } from '@/app/lib/types';
import Error from '@/components/custom/error';
import YourTeam from '@/components/custom/hackathon/your-team';
import { auth } from '@/auth';

export default async function HackathonYourTeamPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return <Error message="No user found. Please log in." />;
    }

    if (!slug) {
        return <Error message={`No slug found.`} />;
    }

    const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;

    if(!hackathon) return <Error message={`Hackathon with slug ${slug} not found.`} />

    return <YourTeam user={user} hackathon={hackathon} />;
}