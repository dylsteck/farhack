'use client'

import { Context, sdk, SignIn } from "@farcaster/frame-sdk";
import { FrameSDK } from "@farcaster/frame-sdk/dist/types";
import { Session } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";
import { useCallback, useEffect } from "react";

export function FrameProvider({ children, session }: { children: React.ReactNode, session: Session | null }){
  const getNonce = useCallback(async () => {
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error("Unable to generate nonce");
      return nonce;
    }, []);

    const handleSignIn = useCallback(async (user: Context.FrameContext['user']) => {
      try {
        const nonce = await getNonce();
        const result = await sdk.actions.signIn({ nonce });
        await signIn("credentials", {
            message: result.message,
            signature: result.signature,
            name: user.username,
            pfp: user.pfpUrl,
            csrfToken: (result as unknown as any).csrfToken,
            redirect: false,
        });
      } catch (e) {
        if (e instanceof SignIn.RejectedByUser) {
          throw new Error("Rejected by user");
          return;
        }
      }
    }, [getNonce]);

    useEffect(() => {
        const init = async () => {
          const context = await sdk.context;
          // WIP: removing auto sign-in to promote better UX and only sign in when needed
          // Also need to save data to the FrameContext
          // if (context?.client.clientFid && !session) {
          //   await handleSignIn(context.user);
          // }
          setTimeout(() => {
            sdk.actions.ready()
          }, 500)
        }
        init()
      }, [handleSignIn, session])

    return(
        <>
         {children}
        </>
    )
}