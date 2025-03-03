import React from 'react';
import AcceptTeamInvite from '@/components/custom/hackathon/accept-team-invite';

export default async function AcceptInvitePage(props: { params: Promise<any> }) {
    const params = await props.params;
    
    return <AcceptTeamInvite params={params} />
}