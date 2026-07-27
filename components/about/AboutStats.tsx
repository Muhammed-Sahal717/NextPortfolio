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
        <div 
          key={i} 
          className="relative flex flex-col items-center justify-center p-8 bg-background text-center group h-full"
        >
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
