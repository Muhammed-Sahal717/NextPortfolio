export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="space-y-6 mb-12 animate-pulse">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-zinc-800 rounded-full" />
          <div className="h-6 w-24 bg-zinc-800 rounded-full" />
        </div>
        <div className="h-16 w-3/4 bg-zinc-800 rounded-lg" />
        <div className="h-4 w-1/2 bg-zinc-800 rounded" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-21/9 bg-zinc-900 rounded-3xl mb-20 animate-pulse border border-zinc-800" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-3 space-y-8">
          <div className="h-4 w-20 bg-zinc-800 rounded" />
          <div className="h-8 w-32 bg-zinc-800 rounded" />
          <div className="h-12 w-full bg-zinc-800 rounded-lg mt-8" />
        </div>
        <div className="lg:col-span-9 space-y-4">
          <div className="h-4 w-full bg-zinc-800 rounded" />
          <div className="h-4 w-full bg-zinc-800 rounded" />
          <div className="h-4 w-2/3 bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}
