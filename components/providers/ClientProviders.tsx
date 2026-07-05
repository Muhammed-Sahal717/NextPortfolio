"use client";

import dynamic from "next/dynamic";

// Lazy-load client-only components — they're not needed for initial render
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), { ssr: false });

const SmoothScrolling = dynamic(() => import("@/components/providers/SmoothScrolling"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <div id="ai-chat-widget-container">
        <ChatWidget />
      </div>
      <SmoothScrolling />
    </>
  );
}
