/* eslint-disable @next/next/no-img-element */
"use client";

import "@farcaster/auth-kit/styles.css";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { SignInButton, AuthKitProvider, StatusAPIResponse } from "@farcaster/auth-kit";
import React, { useState } from "react";
import { karla } from "../../lib/utils";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon } from "lucide-react";
import FrameLink from "./frame/frame-link";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "https://farhack.xyz",
  domain: "farhack.xyz",
};

export default function SignInWithFarcaster() {
  const pathname = usePathname();
  const restrictedPathname = '/hackathons/farhack-at-farcon-2024';

  return (
    <AuthKitProvider config={config}>
      {pathname !== restrictedPathname && <Content />}
    </AuthKitProvider>
  );
}

function Content() {
  const { data: session } = useSession();
  const [error, setError] = React.useState(false);

  const getNonce = React.useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = React.useCallback(
    (res: StatusAPIResponse) => {
      signIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        csrfToken: (res as unknown as any).csrfToken,
        redirect: false,
      });
    },
    []
  );

  return (
    <div className="flex flex-row gap-10 items-center">
      {!session ? (
        <div className={`${karla.className} text-white`}>
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
          />
          {error && <div>Unable to sign in at this time.</div>}
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-row gap-2 items-center bg-fcPurple text-white border-1 rounded-full px-2 py-1 pl-2 pr-2 cursor-pointer text-md">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{session.user?.name}</p>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-32 rounded-xl" align="end" sideOffset={8}>
            <FrameLink type="url" identifier={`https://warpcast.com/${session.user?.name}`}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="w-4 h-4 text-white" />
                Profile
              </DropdownMenuItem>
            </FrameLink>
            <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer">
              <LogOutIcon className="w-4 h-4 text-red-500" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}