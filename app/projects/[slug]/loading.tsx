export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans pb-32">
      {/* 1. TOP NAV SKELETON */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-12">
          <div className="h-4 w-32 bg-muted/60 rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted/60 rounded-full animate-pulse" />
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN GRID SKELETON */}
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* LEFT COLUMN SKELETON (3 Cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="p-5 border border-border/80 rounded-2xl bg-card/60 space-y-4">
              <div className="h-4 w-24 bg-muted/60 rounded animate-pulse" />
              <div className="h-1.5 w-full bg-muted/40 rounded-full animate-pulse" />
              <div className="space-y-2 pt-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-6 w-full bg-muted/40 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="p-4 border border-border/60 rounded-2xl bg-card/40 space-y-3">
              <div className="h-4 w-20 bg-muted/60 rounded animate-pulse" />
              <div className="h-3 w-full bg-muted/40 rounded animate-pulse" />
              <div className="h-8 w-full bg-muted/60 rounded-md animate-pulse" />
            </div>
          </div>

          {/* CENTER COLUMN SKELETON (6 Cols) */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            {/* Hero Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted/60 rounded-md animate-pulse" />
                <div className="h-6 w-24 bg-muted/60 rounded-md animate-pulse" />
                <div className="h-6 w-20 bg-muted/60 rounded-md animate-pulse" />
              </div>
              <div className="h-12 w-3/4 bg-muted/80 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
              <div className="flex gap-3 pt-2">
                <div className="h-11 w-32 bg-muted/80 rounded-lg animate-pulse" />
                <div className="h-11 w-36 bg-muted/60 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Browser Showcase Skeleton */}
            <div className="w-full aspect-video rounded-2xl border border-border bg-card/40 animate-pulse" />

            {/* Content Sections Skeleton */}
            <div className="space-y-6 pt-4">
              <div className="h-6 w-40 bg-muted/70 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-muted/50 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="h-28 border border-border/60 rounded-2xl bg-card/40 animate-pulse" />
                <div className="h-28 border border-border/60 rounded-2xl bg-card/40 animate-pulse" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN SKELETON (3 Cols) */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="p-6 border border-border/80 rounded-2xl bg-card/60 space-y-6">
              <div className="h-4 w-28 bg-muted/60 rounded animate-pulse" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 w-16 bg-muted/40 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-muted/60 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-border/80 rounded-2xl bg-card/60 space-y-4">
              <div className="h-4 w-32 bg-muted/60 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-9 w-full bg-muted/40 rounded-xl animate-pulse" />
                <div className="h-9 w-full bg-muted/40 rounded-xl animate-pulse" />
                <div className="h-9 w-full bg-muted/40 rounded-xl animate-pulse" />
              </div>
              <div className="h-10 w-full bg-muted/80 rounded-lg animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
