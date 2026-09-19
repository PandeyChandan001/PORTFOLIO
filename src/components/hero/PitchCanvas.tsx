"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Mode = "fast" | "drive" | "hawkeye";

export function PitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("fast");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;

    const resize = () => {
      // Setup relative sizing based on container
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawPitch = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      // Draw 22-yard strip
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      const pitchW = w * 0.4;
      const pitchX = (w - pitchW) / 2;
      ctx.fillRect(pitchX, 0, pitchW, h);

      // Draw popping creases
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top crease
      ctx.moveTo(pitchX - 10, h * 0.1);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.1);
      // Bottom crease
      ctx.moveTo(pitchX - 10, h * 0.9);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.9);
      ctx.stroke();
    };

    const drawFastBowling = (ctx: CanvasRenderingContext2D, w: number, h: number, f: number) => {
      const cycle = f % 60;
      const progress = cycle / 60; // 0 to 1
      
      const startY = h * 0.1;
      const impactY = h * 0.6;
      const endY = h * 0.9;
      
      const pitchW = w * 0.4;
      const startX = w / 2;
      const impactX = w / 2 + (Math.sin(f * 0.1) * 10);
      const endX = impactX + (impactX - startX) * 0.5;

      let currentX, currentY;

      if (progress < 0.7) {
        const p = progress / 0.7;
        currentX = startX + (impactX - startX) * p;
        currentY = startY + (impactY - startY) * p;
      } else {
        const p = (progress - 0.7) / 0.3;
        currentX = impactX + (endX - impactX) * p;
        currentY = impactY + (endY - impactY) * p;
      }

      ctx.fillStyle = "#EF4444"; // Ball color
      ctx.beginPath();
      ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw impact mark
      if (progress > 0.7) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
        ctx.beginPath();
        ctx.arc(impactX, impactY, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCoverDrive = (ctx: CanvasRenderingContext2D, w: number, h: number, f: number) => {
      const cycle = f % 80;
      const progress = cycle / 80;

      const impactX = w / 2 - 10;
      const impactY = h * 0.85;

      // Draw bat swing
      if (progress < 0.2) {
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(impactX + 20, impactY - 20);
        ctx.lineTo(impactX, impactY);
        ctx.stroke();
      }

      if (progress > 0.2) {
        const p = (progress - 0.2) / 0.8;
        const currentX = impactX - (w * 0.4) * p;
        const currentY = impactY - (h * 0.6) * p;

        // Trace path
        ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(impactX, impactY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawHawkEye = (ctx: CanvasRenderingContext2D, w: number, h: number, f: number) => {
      const cycle = f % 120;
      const points = 5;
      const progress = Math.min(1, cycle / 60);
      
      const startX = w / 2 + 15;
      const startY = h * 0.1;
      const impactX = w / 2 - 5;
      const impactY = h * 0.7;
      const endX = w / 2 - 25;
      const endY = h * 0.95;

      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      const currentImpactX = startX + (impactX - startX) * progress;
      const currentImpactY = startY + (impactY - startY) * progress;
      ctx.lineTo(currentImpactX, currentImpactY);
      
      if (cycle > 60) {
        const postProgress = (cycle - 60) / 60;
        const currentEndX = impactX + (endX - impactX) * postProgress;
        const currentEndY = impactY + (endY - impactY) * postProgress;
        ctx.lineTo(currentEndX, currentEndY);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw heatmap impact zone
      if (cycle > 60) {
        const grad = ctx.createRadialGradient(impactX, impactY, 0, impactX, impactY, 20);
        grad.addColorStop(0, "rgba(239, 68, 68, 0.6)");
        grad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(impactX, impactY, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPitch(ctx, canvas.width, canvas.height);
      
      if (mode === "fast") drawFastBowling(ctx, canvas.width, canvas.height, frame);
      if (mode === "drive") drawCoverDrive(ctx, canvas.width, canvas.height, frame);
      if (mode === "hawkeye") drawHawkEye(ctx, canvas.width, canvas.height, frame);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <div className="w-full h-full flex flex-col bg-[#05070B] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground z-10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse"></span>
          PITCH_SIM.EXE
        </div>
      </div>
      
      <div className="relative flex-1 w-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>

      <div className="grid grid-cols-3 gap-[1px] bg-white/10 z-10 text-[9px] sm:text-[10px] font-mono border-t border-white/10">
        <button 
          onClick={() => setMode("fast")}
          className={`py-2 text-center transition-colors ${mode === "fast" ? "bg-[#EF4444]/20 text-[#EF4444]" : "bg-[#05070B] text-muted-foreground hover:bg-white/5"}`}
        >
          FAST BOWL<br/><span className="text-[8px] opacity-70">Sys/C++</span>
        </button>
        <button 
          onClick={() => setMode("drive")}
          className={`py-2 text-center transition-colors ${mode === "drive" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#05070B] text-muted-foreground hover:bg-white/5"}`}
        >
          STROKEPLAY<br/><span className="text-[8px] opacity-70">Full-Stack</span>
        </button>
        <button 
          onClick={() => setMode("hawkeye")}
          className={`py-2 text-center transition-colors ${mode === "hawkeye" ? "bg-[#06B6D4]/20 text-[#06B6D4]" : "bg-[#05070B] text-muted-foreground hover:bg-white/5"}`}
        >
          HAWK-EYE<br/><span className="text-[8px] opacity-70">AI/Doc Intel</span>
        </button>
      </div>
    </div>
  );
}
