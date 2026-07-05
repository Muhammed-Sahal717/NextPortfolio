"use client";

// import ScrollReveal from "@/components/animations/ScrollReveal"; // Kept for reference but not used

export default function AboutHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8">
      <div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          About Me
        </h2>
      </div>
      <div className="max-w-md text-muted-foreground text-lg leading-relaxed">
        <p>
          I am dedicated to building high-performance, accessible, and scalable web applications with clean, maintainable code.
        </p>
      </div>
    </div>
  );
}
