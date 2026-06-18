"use client";

import dynamic from "next/dynamic";

// Lazy-load client-only components — they're not needed for initial render
const ChatWidget = dynamic(() => import("@/components/features/ChatWidget"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/animations/CustomCursor"), { ssr: false });
const SmoothScrolling = dynamic(() => import("@/components/layout/SmoothScrolling"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <ChatWidget />
      <CustomCursor />
      <SmoothScrolling />
    </>
  );
}
