import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <style>{`
        #ai-chat-widget-container {
          display: none !important;
        }
      `}</style>
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center font-sans p-4 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-foreground">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Page not found
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">
              Return to Portfolio
            </Link>
          </Button>
        </div>
        </div>
      </div>
    </>
  );
}
