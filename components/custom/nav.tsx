"use client";

import Link from "next/link";
import FarHackLogo from "./icons/farhack-logo";
import { karla } from "@/app/lib/utils";
import SignInWithFarcaster from "./sign-in-with-farcaster";
import { usePathname } from "next/navigation";

export default function Nav(){
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');
    const isHackingGuide = pathname.includes('/hacking-guide');
    const hideNavBar = isAdmin;

    if(hideNavBar){
        return null;
    }

    return(
        <nav className="w-full bg-black/75 flex items-center justify-between px-3 py-2 border-b border-white/20">
            <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <FarHackLogo width={35} height={35} />
                <p className={`text-white text-2xl mr-4 ${karla.className}`}>FarHack</p>
            </Link>
            <div className="flex items-center gap-6">
                <SignInWithFarcaster />
            </div>
        </nav>
    )
}