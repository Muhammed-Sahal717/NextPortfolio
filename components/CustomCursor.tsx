"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
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

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10001 hidden md:block overflow-hidden">
      {/* 1. THE TRAILING SCANNER (Wireframe Box) */}
      <motion.div
        className="fixed top-0 left-0 border-[1.5px] border-white/40 backdrop-blur-[1px]"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          // Hover: Snap to center, fill lime, stop rotating
          width: isHovering ? 12 : 40,
          height: isHovering ? 12 : 40,
          backgroundColor: isHovering ? "#84cc16" : "transparent",
          borderColor: isHovering ? "#84cc16" : "rgba(255,255,255,0.4)",
          rotate: isHovering ? 0 : 45, // 45deg diamond in idle, 0deg square in hover
          scale: isClicking ? 1.5 : 1, // Explode slightly on click
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8, // Heavy feel
        }}
      />

      {/* 2. THE LEADER PIXEL (Solid Lime Square) */}
      <motion.div
        className="fixed top-0 left-0 bg-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.6)]"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          // Hover: Disappear (merge into the trailer)
          scale: isHovering ? 0 : 1,
          rotate: isClicking ? 90 : 0, // Spin on click
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
        // Dimensions directly on the element
        // Use a style object to avoid duplicate className prop issues
      >
        <div style={{ width: "8px", height: "8px" }} />
      </motion.div>

      {/* 3. CROSSHAIR LINES (Subtle Guide) */}
      {/* Only visible when NOT hovering, gives a 'Sniper' feel */}
      <motion.div
        className="fixed top-0 left-0"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          opacity: isHovering ? 0 : 0.2,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Horizontal Guide */}
        <div className="absolute top-0 -left-5 w-10 h-px bg-white" />
        {/* Vertical Guide */}
        <div className="absolute left-0 -top-5 w-px h-10 bg-white" />
      </motion.div>
    </div>
  );
}
