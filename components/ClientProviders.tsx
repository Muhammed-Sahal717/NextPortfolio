"use client";

import dynamic from "next/dynamic";

// Lazy-load client-only components — they're not needed for initial render
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SmoothScrolling = dynamic(() => import("@/components/SmoothScrolling"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <ChatWidget />
      <CustomCursor />
      <SmoothScrolling />
    </>
  );
}
