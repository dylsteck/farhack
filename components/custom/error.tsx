"use client";

import Link from "next/link";

export default function Error({ message = 'An error occured.' }: { message?: string }){
    return(
        <div className="flex items-center justify-center min-h-screen text-white text-2xl">
            <p>{message} <Link href="/" className="underline">Return to home</Link></p>
        </div>
    )
}