"use client";

import dynamic from "next/dynamic";
import Noise from "@/components/animations/Noise";
import { useTheme } from "next-themes";

const LiquidEther = dynamic(() => import("@/components/animations/LiquidEther"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

export default function HeroBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const liquidColors = isLight
    ? ["#ccff00", "#39ff14"]
    : ["#ccff00", "#39ff14"];

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 opacity-60">
        <LiquidEther
          colors={liquidColors}
          isViscous={true}
          viscous={12}
          iterationsViscous={8}
          mouseForce={12}
          cursorSize={70}
          dt={0.016}
          autoDemo={true}
          autoSpeed={0.25}
          autoIntensity={1.0}
          resolution={0.25}
          isBounce={true}
        />
      </div>

      <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
    </div>
  );
}
