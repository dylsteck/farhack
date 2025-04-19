"use client";

import FarHackLogo from "@/components/custom/icons/farhack-logo";
import { karla } from "@/lib/utils";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-black">
            <div className={`flex flex-col items-center justify-center text-center ${karla.className}`}>
                <FarHackLogo className="max-w-[70%] md:max-w-[35%] lg:max-w-[25%]" gradient />
                <p className="text-white text-2xl md:text-4xl font-semibold mt-4 p-2">Not Found</p>
                <Link href="/" className="bg-[#8A63D2] hover:bg-[#7952C7] text-white font-medium py-2 px-8 rounded-full mt-8 transition-all duration-300 cursor-pointer inline-block">
                    Back to Hacking
                </Link>
            </div>
        </div>
    )
}