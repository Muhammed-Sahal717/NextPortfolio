"use client";

import React, { useEffect, useRef } from "react";

interface CircuitBoardProps {
  lineColor?: string;
  pulseColor?: string;
  gridSize?: number;
}

export default function CircuitBoard({
  lineColor = "rgba(255, 255, 255, 0.03)",
  pulseColor = "rgba(163, 230, 53, 0.4)", // lime-400 equivalent
  gridSize = 40,
}: CircuitBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- CIRCUIT GRID GENERATION ---
    // We'll generate a grid of "nodes" and connect them to form circuit paths.
    // Each path is a series of points.
    const paths: { x: number; y: number }[][] = [];
    const pulses: { pathIndex: number; progress: number; speed: number }[] = [];

    const init = () => {
      paths.length = 0;
      pulses.length = 0;

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Create strictly horizontal/vertical paths
      // Algorithm: Random walkers that follow grid lines
      const numPaths = Math.floor((cols * rows) / 10); // Density

      for (let i = 0; i < numPaths; i++) {
        const path: { x: number; y: number }[] = [];
        let cx = Math.floor(Math.random() * cols) * gridSize;
        let cy = Math.floor(Math.random() * rows) * gridSize;
        let dir = Math.floor(Math.random() * 4); // 0: right, 1: down, 2: left, 3: up
        const length = Math.floor(Math.random() * 10) + 5;

        path.push({ x: cx, y: cy });

        for (let j = 0; j < length; j++) {
          if (Math.random() > 0.5) {
            // Change direction
            dir = (dir + (Math.random() > 0.5 ? 1 : 3)) % 4;
          }

          if (dir === 0) cx += gridSize;
          else if (dir === 1) cy += gridSize;
          else if (dir === 2) cx -= gridSize;
          else if (dir === 3) cy -= gridSize;

          // Keep in bounds
          if (cx < 0 || cx > width || cy < 0 || cy > height) break;

          path.push({ x: cx, y: cy });
        }

        if (path.length > 2) {
          paths.push(path);
          // Add a pulse to this path
          if (Math.random() > 0.6) {
            pulses.push({
              pathIndex: paths.length - 1,
              progress: Math.random(),
              speed: 0.002 + Math.random() * 0.005,
            });
          }
        }
      }
    };

    const draw = () => {
      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      // Draw standard grid dots (subtle)
      ctx.fillStyle = lineColor;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Paths
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();

        // Draw endpoints (nodes)
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(path[0].x, path[0].y, 2, 0, Math.PI * 2);
        ctx.arc(
          path[path.length - 1].x,
          path[path.length - 1].y,
          2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      // Update and Draw Pulses
      pulses.forEach((pulse) => {
        const path = paths[pulse.pathIndex];
        const totalLen = path.length;

        // Calculate current position based on progress
        // progress 0 -> path[0], progress 1 -> path[last]
        // mapped to segments

        const floatIndex = pulse.progress * (totalLen - 1);
        const currentIndex = Math.floor(floatIndex);
        const nextIndex = Math.min(currentIndex + 1, totalLen - 1);
        const segmentProgress = floatIndex - currentIndex;

        const p1 = path[currentIndex];
        const p2 = path[nextIndex];

        const x = p1.x + (p2.x - p1.x) * segmentProgress;
        const y = p1.y + (p2.y - p1.y) * segmentProgress;

        // Draw glowing pulse head
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, pulseColor);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Solid center
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Move pulse
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0; // Loop
        }
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", handleResize);
    init();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lineColor, pulseColor, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
}
