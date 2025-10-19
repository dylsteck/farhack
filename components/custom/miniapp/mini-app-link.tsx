'use client';

import { sdk } from "@farcaster/miniapp-sdk";
import React from "react";

export default function MiniAppLink({
    identifier,
    type,
    children
}: {
    identifier: string,
    type: 'url' | 'profile',
    children: React.ReactNode
}){
    const handleOnClick = async () => {
        const isInMiniApp = await sdk.isInMiniApp();
        
        if(isInMiniApp){
            switch(type){
                case 'url':
                    sdk.actions.openUrl(identifier);
                    break;
                case 'profile':
                    // Use Farcaster profile URL format
                    sdk.actions.openUrl(`https://warpcast.com/~/profiles/${identifier}`);
                    break;
                default:
                    break;
            }
        } else{
            switch(type){
                case 'url':
                    window.open(identifier, '_blank');
                    break;
                case 'profile':
                    window.open(`https://warpcast.com/~/profiles/${identifier}`, '_blank');
                    break;
                default:
                    break;
            }
        }
    }
    return(
        <span className="w-auto cursor-pointer" onClick={handleOnClick}>
            {children}
        </span>
    )
}