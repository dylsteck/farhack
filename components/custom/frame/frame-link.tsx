'use client';

import { useMiniKit, useOpenUrl, useViewProfile } from "@coinbase/onchainkit/minikit";
import React from "react";

export default function FrameLink({
    identifier,
    type,
    children
}: {
    identifier: string,
    type: 'url' | 'profile',
    children: React.ReactNode
}){
    const { context } = useMiniKit();
    const viewProfile = useViewProfile();
    const openUrl = useOpenUrl();

    const handleOnClick = () => {
        if(context !== undefined){
            switch(type){
                case 'url':
                    openUrl(identifier);
                    break;
                case 'profile':
                    viewProfile(parseInt(identifier))
                default:
                    break;
            }
        } else{
            switch(type){
                case 'url':
                    window.open(identifier, '_blank')
                    break;
                case 'profile':
                    window.open(`https://warpcast.com/~/profiles/${identifier}`)
                    viewProfile(parseInt(identifier));
                default:
                    break;
            }
        }
    }
    return(
        <span className="w-auto cursor-pointer" onClick={() => handleOnClick()}>
            {children}
        </span>
    )
}