import React from 'react';
import HackathonBounites from '@/app/components/hackathon-bounties';

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

    return <HackathonBounites slug={slug} />;
}