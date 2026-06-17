"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  className?: string;
  height?: number;
  radius?: number;
}

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  density: number;
  color: string;
  vx: number;
  vy: number;
  update: () => void;
  draw: () => void;
};

export default function ParticleText({
  text,
  className = "",
  height = 240,
  radius = 30,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = container.clientWidth;
    let h = height;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let animationFrameId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      radius,
    };

    const setCanvasSize = () => {
      width = container.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${h}px`;

      // Reset transform cleanly before scaling again
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
    };

    class ParticleClass {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1.4 + 1.1;
        this.density = Math.random() * 20 + 8;
        this.vx = 0;
        this.vy = 0;

        const palette = [
          "rgba(255,255,255,0.82)",
          "rgba(255,255,255,0.65)",
          "rgba(168,255,79,0.92)",
          "rgba(168,255,79,0.72)",
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        if (pointer.active) {
          const dx = pointer.x - this.x;
          const dy = pointer.y - this.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);

          if (distance < pointer.radius) {
            const force = (pointer.radius - distance) / pointer.radius;
            // Add randomness so they scatter freely instead of forming a perfect circle shape
            const randomAngle = Math.random() * Math.PI * 2;
            const scatterForceX = Math.cos(randomAngle);
            const scatterForceY = Math.sin(randomAngle);

            // Blend radial repulsion with random scattering
            const repulsionX = (dx / distance) * 0.3 + scatterForceX * 0.7;
            const repulsionY = (dy / distance) * 0.3 + scatterForceY * 0.7;

            const repulsionStrength = force * this.density * 1.5;
            this.vx -= repulsionX * repulsionStrength;
            this.vy -= repulsionY * repulsionStrength;
          }
        }

        const ease = 0.075;

        this.vx += (this.baseX - this.x) * ease;
        this.vy += (this.baseY - this.y) * ease;

        this.vx *= 0.82;
        this.vy *= 0.82;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const buildParticles = () => {
      const tmpCanvas = document.createElement("canvas");
      const tmpCtx = tmpCanvas.getContext("2d", { willReadFrequently: true });
      if (!tmpCtx) return;

      tmpCanvas.width = width;
      tmpCanvas.height = h;

      tmpCtx.clearRect(0, 0, width, h);
      tmpCtx.fillStyle = "#ffffff";
      tmpCtx.textAlign = "center";
      tmpCtx.textBaseline = "middle";

      const fontSize = Math.max(
        44,
        Math.min(width < 640 ? width / 5.4 : width / 8.5, 170),
      );

      tmpCtx.font = `900 ${fontSize}px "Space Grotesk", "Inter", "Outfit", system-ui, sans-serif`;

      // Slight vertical lift makes it feel more centered and premium
      tmpCtx.fillText(text, width / 2, h / 2 - 4);
      // Add stroke to make the letters bolder, fixing the thin line inconsistency
      tmpCtx.lineWidth = 3;
      tmpCtx.strokeStyle = "#ffffff";
      tmpCtx.strokeText(text, width / 2, h / 2 - 4);

      const imageData = tmpCtx.getImageData(0, 0, width, h);
      const data = imageData.data;

      particles = [];
      const step = Math.max(4, Math.floor(width / 220)); // adaptive density

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            const jitterX = x + (Math.random() - 0.5) * 1.2;
            const jitterY = y + (Math.random() - 0.5) * 1.2;
            particles.push(new ParticleClass(jitterX, jitterY));
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Soft ambient glow behind the text particles
      const gradient = ctx.createRadialGradient(
        width / 2,
        h / 2,
        20,
        width / 2,
        h / 2,
        Math.max(width, h) * 0.55,
      );
      gradient.addColorStop(0, "rgba(168, 255, 79, 0.05)");
      gradient.addColorStop(0.4, "rgba(168, 255, 79, 0.025)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, h);

      for (const p of particles) {
        p.update();
        p.draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleResize = () => {
      setCanvasSize();
      buildParticles();
    };

    setCanvasSize();
    buildParticles();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Still draw once for reduced motion users
      ctx.clearRect(0, 0, width, h);
      for (const p of particles) {
        p.draw();
      }
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [text, height, radius]);

  return (
    <div className={`w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full select-none cursor-none"
        aria-label={text}
        role="img"
      />
    </div>
  );
}
