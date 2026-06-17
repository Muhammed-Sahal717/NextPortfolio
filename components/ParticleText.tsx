"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
}

export default function ParticleText({ text }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Handle high DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = 250; // medium height
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let particlesArray: Particle[] = [];
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 100 // interaction radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // We attach it to window so it reacts even if moving fast outside canvas bounds
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 2.5; // size of the particle
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 5;
        // Make some particles primary theme color and most white/gray
        this.color = Math.random() > 0.9 ? "var(--theme-lime-400)" : "rgba(255, 255, 255, 0.7)";
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function initParticles() {
      const tmpCanvas = document.createElement("canvas");
      const tmpCtx = tmpCanvas.getContext("2d", { willReadFrequently: true });
      if (!tmpCtx) return;
      
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      
      tmpCtx.fillStyle = "white";
      
      // Auto scale font size based on screen width
      let fontSize = width < 768 ? Math.floor(width / 8) : Math.floor(width / 12);
      if (fontSize > 160) fontSize = 160; // Max size
      
      tmpCtx.font = `900 ${fontSize}px "Space Grotesk", "Outfit", sans-serif`;
      tmpCtx.textAlign = "center";
      tmpCtx.textBaseline = "middle";
      
      // Draw text exactly in the center
      tmpCtx.fillText(text, width / 2, height / 2);
      
      const textData = tmpCtx.getImageData(0, 0, width, height);
      
      particlesArray = [];
      // Sample every Nth pixel to create the halftone particle effect
      const step = 6; 
      
      for (let y = 0; y < textData.height; y += step) {
        for (let x = 0; x < textData.width; x += step) {
           const alpha = textData.data[(y * 4 * textData.width) + (x * 4) + 3];
           if (alpha > 128) {
              // Add a tiny bit of random jitter to x/y to make it look organic
              const jitterX = x + (Math.random() - 0.5);
              const jitterY = y + (Math.random() - 0.5);
              particlesArray.push(new Particle(jitterX, jitterY));
           }
        }
      }
    }

    initParticles();

    let animationFrameId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <canvas 
      ref={canvasRef} 
      className="block w-full cursor-crosshair mix-blend-screen"
    />
  );
}
