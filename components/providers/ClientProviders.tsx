"use client";

import dynamic from "next/dynamic";

// Lazy-load client-only components — they're not needed for initial render
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), { ssr: false });
const SmoothCursor = dynamic(() => import("@/components/lightswind/smooth-cursor"), { ssr: false });
const SmoothScrolling = dynamic(() => import("@/components/providers/SmoothScrolling"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <ChatWidget />
      <SmoothCursor 
        color="#ccff00" 
        size={16} 
        glowEffect={true} 
        rotateOnMove={true} 
        scaleOnClick={true}
        springConfig={{
          stiffness: 1200,
          damping: 40,
          mass: 0.1,
          restDelta: 0.001,
        }}
      />
      <SmoothScrolling />
    </>
  );
}
