import React from 'react';
import HackathonTracks from '@/app/components/hackathon-tracks';

export default async function HackathonTracksPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;
    
    if (!slug) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No data found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    return <HackathonTracks slug={slug} />;
}