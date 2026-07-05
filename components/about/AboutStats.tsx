"use client";

import AnimatedCounter from "./AnimatedCounter";

export default function AboutStats() {
  const stats = [
    { value: 2, suffix: "+", label: "Years Exp" },
    { value: 15, suffix: "+", label: "Projects" },
    { value: 1000, suffix: "+", label: "Hours" },
  ];

  return (
    <>
      {stats.map((stat, i) => (
        <div key={i} className="relative flex flex-col items-center justify-center p-8 bg-background text-center group">
          {i === 2 && (
            <div className="hidden lg:block absolute -top-[0.5px] -left-[0.5px] w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-border" />
          )}
          <span className="block text-4xl xl:text-5xl font-black text-foreground relative z-10 transition-transform group-hover:scale-110 duration-500">
            <AnimatedCounter to={stat.value} suffix={stat.suffix} />
          </span>
          <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider mt-2 relative z-10">
            {stat.label}
          </span>
        </div>
      ))}
    </>
  );
}
