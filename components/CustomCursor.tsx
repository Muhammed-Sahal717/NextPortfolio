"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const clickingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Check if device supports hover (no touch-only devices)
  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    // Don't mount on touch devices at all
    if (isTouchDevice()) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const crosshair = crosshairRef.current;
    if (!cursor || !dot || !crosshair) return;

    // Initially hidden
    cursor.style.display = "none";

    const updateCursorStyle = () => {
      const hovering = hoveringRef.current;
      const clicking = clickingRef.current;

      // Trailing scanner
      cursor.style.width = hovering ? "12px" : "40px";
      cursor.style.height = hovering ? "12px" : "40px";
      cursor.style.backgroundColor = hovering
        ? "var(--theme-lime-400)"
        : "transparent";
      cursor.style.borderColor = hovering
        ? "var(--theme-lime-400)"
        : "rgba(255,255,255,0.4)";
      cursor.style.transform = `translate(-50%, -50%) rotate(${hovering ? 0 : 45}deg) scale(${clicking ? 1.5 : 1})`;

      // Leader pixel
      dot.style.transform = `translate(-50%, -50%) scale(${hovering ? 0 : 1}) rotate(${clicking ? 90 : 0}deg)`;

      // Crosshair
      crosshair.style.opacity = hovering ? "0" : "0.2";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        cursor.style.display = "";
      }
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      // Direct DOM update — no React re-render
      const xPx = `${e.clientX}px`;
      const yPx = `${e.clientY}px`;
      cursor.style.left = xPx;
      cursor.style.top = yPx;
      dot.style.left = xPx;
      dot.style.top = yPx;
      crosshair.style.left = xPx;
      crosshair.style.top = yPx;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".group") ||
        target.getAttribute("role") === "button";

      const wasHovering = hoveringRef.current;
      hoveringRef.current = !!isInteractive;
      if (wasHovering !== hoveringRef.current) updateCursorStyle();
    };

    const onMouseDown = () => {
      clickingRef.current = true;
      updateCursorStyle();
    };
    const onMouseUp = () => {
      clickingRef.current = false;
      updateCursorStyle();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-1000000001 hidden md:block overflow-hidden">
      {/* 1. THE TRAILING SCANNER (Wireframe Box) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 border-[1.5px] backdrop-blur-[1px]"
        style={{
          transition:
            "width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s, transform 0.3s",
          willChange: "left, top",
        }}
      />

      {/* 2. THE LEADER PIXEL (Solid Lime Square) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 bg-[var(--theme-lime-400)] shadow-[0_0_15px_var(--theme-lime-400)]"
        style={{
          width: "8px",
          height: "8px",
          transition: "transform 0.1s ease-out",
          willChange: "left, top",
        }}
      />

      {/* 3. CROSSHAIR LINES */}
      <div
        ref={crosshairRef}
        className="fixed top-0 left-0"
        style={{
          transition: "opacity 0.2s",
          willChange: "left, top",
        }}
      >
        <div className="absolute top-0 -left-5 w-10 h-px bg-white" />
        <div className="absolute left-0 -top-5 w-px h-10 bg-white" />
      </div>
    </div>
  );
}
