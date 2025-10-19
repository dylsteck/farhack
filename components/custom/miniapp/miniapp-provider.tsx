'use client';
import { useCallback, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const ready = useCallback(async () => {
    await sdk.actions.ready();
  }, []);

  useEffect(() => {
    const checkMiniApp = async () => {
      const isInMiniApp = await sdk.isInMiniApp();
      if (isInMiniApp) {
        ready();
      }
    };
    checkMiniApp();
  }, [ready]);

  return (
    <>
      {children}
    </>
  );
}
