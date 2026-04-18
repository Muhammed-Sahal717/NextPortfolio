"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const numDots = 8;
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation logic refs
  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef(
    Array.from({ length: numDots }, () => ({ x: 0, y: 0 })),
  );
  const angle = useRef(0);

  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  // Check if device supports hover
  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    // Linear Interpolation
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    const render = () => {
      angle.current += 0.05;

      for (let i = 0; i < numDots; i++) {
        if (isHovering.current) {
          // Morph into a spinning ring
          const offset = ((Math.PI * 2) / numDots) * i;
          const radius = 24;
          const targetX =
            mouse.current.x + Math.cos(angle.current + offset) * radius;
          const targetY =
            mouse.current.y + Math.sin(angle.current + offset) * radius;
          points.current[i].x = lerp(points.current[i].x, targetX, 0.15);
          points.current[i].y = lerp(points.current[i].y, targetY, 0.15);
        } else {
          // Snake tail following leader
          if (i === 0) {
            points.current[i].x = lerp(
              points.current[i].x,
              mouse.current.x,
              0.4,
            );
            points.current[i].y = lerp(
              points.current[i].y,
              mouse.current.y,
              0.4,
            );
          } else {
            points.current[i].x = lerp(
              points.current[i].x,
              points.current[i - 1].x,
              0.45,
            );
            points.current[i].y = lerp(
              points.current[i].y,
              points.current[i - 1].y,
              0.45,
            );
          }
        }
      }

      // Apply transformations to DOM
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const p = points.current[i];

        // Dynamically adjust size and opacity
        const size = isHovering.current ? 6 : Math.max(3, 12 - i * 1.2);
        const opacity = isVisible.current
          ? isHovering.current
            ? 0.8
            : Math.max(0.2, 1 - i * 0.1)
          : 0;
        const scale = isClicking.current ? 0.5 : 1;

        dot.style.transform = `translate3d(calc(${p.x}px - 50%), calc(${p.y}px - 50%), 0) scale(${scale})`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = opacity.toString();
        dot.style.backgroundColor = isHovering.current
          ? "var(--theme-lime-400, #a3e635)"
          : "white";
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        // Snap all dots to mouse position on first movement
        points.current.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        isVisible.current = true;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".group") ||
        target.getAttribute("role") === "button";

      isHovering.current = !!interactive;
    };

    const onMouseDown = () => (isClicking.current = true);
    const onMouseUp = () => (isClicking.current = false);
    const onMouseLeave = () => (isVisible.current = false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice]);

  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000000001] hidden md:block overflow-hidden mix-blend-difference">
      {Array.from({ length: numDots }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="fixed top-0 left-0 rounded-full bg-white"
          style={{
            transition:
              "background-color 0.3s, width 0.3s, height 0.3s, opacity 0.3s",
            willChange: "transform, opacity, width, height",
          }}
        />
      ))}
    </div>
  );
}
