export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans pb-32">
      {/* 1. TOP NAV SKELETON */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-background border-b border-dashed border-zinc-200 dark:border-zinc-800 shadow-md">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-6 lg:px-16">
          <div className="h-4 w-32 bg-muted/60 rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted/60 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="mx-auto max-w-[100rem] px-6 pt-32 lg:px-16">
        {/* SINGLE BOARD WRAPPER */}
        <div className="border border-border rounded-[2rem] overflow-hidden bg-card flex flex-col shadow-sm">
          
          {/* 1. HERO HEADER SKELETON */}
          <div className="border-b border-border p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12 bg-transparent">
            <div className="max-w-3xl space-y-4 w-full">
              {/* Tech Stack Pills Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="h-7 w-20 bg-muted/80 rounded-md animate-pulse" />
                <div className="h-7 w-24 bg-muted/80 rounded-md animate-pulse" />
                <div className="h-7 w-16 bg-muted/80 rounded-md animate-pulse" />
                <div className="h-7 w-28 bg-muted/80 rounded-md animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div className="h-10 md:h-14 w-3/4 bg-muted/90 rounded-lg animate-pulse mb-4" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/70 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted/70 rounded animate-pulse" />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="mt-8 flex flex-row gap-3 lg:mt-0 shrink-0">
              <div className="h-10 w-28 bg-muted/90 rounded-md animate-pulse" />
              <div className="h-10 w-32 bg-muted/70 rounded-md animate-pulse" />
            </div>
          </div>

          {/* 2. MAIN GRID SKELETON */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-transparent relative">
            {/* LEFT COLUMN: Carousel + Content Skeleton (8 Cols) */}
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
              
              {/* Carousel Section Skeleton */}
              <div className="w-full aspect-video relative border-b border-border bg-muted/30 animate-pulse flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-muted/60" />
              </div>

              {/* Markdown Content Skeleton */}
              <div className="p-8 md:p-12 space-y-6">
                <div className="h-7 w-48 bg-muted/80 rounded animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-muted/60 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-muted/60 rounded animate-pulse" />
                </div>

                <div className="h-7 w-40 bg-muted/80 rounded animate-pulse pt-4" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted/60 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Skeleton (4 Cols) */}
            <div className="lg:col-span-4 bg-muted/20 h-full flex flex-col p-8 md:p-12 space-y-8">
              <div className="h-6 w-36 bg-muted/80 rounded animate-pulse mb-4" />

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
                  <div className="h-5 w-32 bg-muted/80 rounded animate-pulse" />
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
                  <div className="h-5 w-28 bg-muted/80 rounded animate-pulse" />
                </div>
              </div>

              <div className="mt-auto pt-12 space-y-4 border-t border-border/50">
                <div className="h-3 w-48 bg-muted/60 rounded animate-pulse" />
                <div className="h-11 w-full bg-muted/80 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
