"use client";

import dynamic from "next/dynamic";
import Noise from "@/components/animations/Noise";
import { useTheme } from "next-themes";

const LiquidEther = dynamic(
  () => import("@/components/animations/LiquidEther"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-background" />,
  },
);

export default function HeroBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const liquidColors = isLight
    ? ["#dcfce7", "#86efac", "#22c55e"] // mint → soft green → vibrant green (much lighter for light mode!)
    : ["#166534", "#22c55e", "#86efac"]; // deep emerald → green → soft highlight

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-90 dark:opacity-70 mix-blend-normal">
        <LiquidEther
          colors={liquidColors}
          isViscous={true}
          viscous={5} // Lower viscosity makes it move like thin, beautiful smoke rather than thick honey
          iterationsViscous={8} // Keeps viscous passes low
          iterationsPoisson={8} // MASSIVE OPTIMIZATION: default was 32. Lowering to 8 saves 24 render passes per frame!
          mouseForce={25} // Stronger swirls
          cursorSize={90} // Larger interaction area
          dt={0.016}
          autoDemo={true}
          autoSpeed={0.4} // Faster, more dynamic movement
          autoIntensity={1.8} // Spreads out further across the screen
          resolution={0.2} // OPTIMIZATION: 0.2 resolution provides buttery smooth 60fps on almost all devices while remaining beautiful
          isBounce={true}
        />
      </div>

      <Noise patternAlpha={10} />
    </div>
  );
}
