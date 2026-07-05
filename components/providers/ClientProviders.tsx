"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy-load client-only components — they're not needed for initial render
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), { ssr: false });

const SmoothScrolling = dynamic(() => import("@/components/providers/SmoothScrolling"), { ssr: false });

export default function ClientProviders() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <div id="ai-chat-widget-container">
          <ChatWidget />
        </div>
      )}
      <SmoothScrolling />
    </>
  );
}
