/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { HackathonNav } from '@/components/custom/hackathon-nav';
import { Hackathon } from '@/app/lib/types';
import { farhackSDK } from '@/app/lib/api';
import Link from 'next/link';

export default async function HackathonBySlugPage(props: { params: Promise<any> }) {
    const params = await props.params;
    const { slug } = params;
    const hackathon = await farhackSDK.getHackathon(slug) as Hackathon;

    if (!hackathon) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No data found. <Link href="/" className="underline">Return to home</Link></p>
            </div>
        );
    }

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="pt-0">
            <div className="text-white flex flex-col gap-1 items-start pl-[2.5%] ml-2 md:ml-0">
                <HackathonNav hackathon={hackathon} />
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-between w-full mt-8 ml-1 mr-1">
                    <div className="flex flex-col md:w-1/2 gap-2">
                        <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded-lg w-[75%]" />
                    </div>
                    <div className="flex flex-col mt-7 md:mt-0 mb-10 md:mb-0 md:w-1/2 gap-2 mr-[15%]">
                        <div className="flex flex-col gap-1 items-start">
                            <p className="text-4xl font-medium">
                                {hackathon.name}
                            </p>
                            <p>
                                {startDate} - {endDate}
                            </p>
                        </div>
                        <p className="mt-2 text-xl font-normal text-white/95">
                            {hackathon.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}