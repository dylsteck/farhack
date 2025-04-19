'use client';

import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useCallback, useEffect, useState } from "react";

export function FrameProvider({ children }: { children: React.ReactNode }){
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);

  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
      // handleAddFrame();
    }
  }, [setFrameReady, isFrameReady, handleAddFrame]);

  return (
    <>
      {children}
    </>
  )
}