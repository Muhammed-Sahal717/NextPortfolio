"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [inView, count, to]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}
