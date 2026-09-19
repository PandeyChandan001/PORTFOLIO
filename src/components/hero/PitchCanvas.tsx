"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "fast" | "drive" | "hawkeye";

export function PitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("fast");

  const playBatSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Ignore
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;
    let soundPlayed = false;
    const sparks: { x: number, y: number, vx: number, vy: number, life: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawPitch = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.fillStyle = "rgba(16, 185, 129, 0.03)";
      const pitchW = w * 0.4;
      const pitchX = (w - pitchW) / 2;
      ctx.fillRect(pitchX, 0, pitchW, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pitchX - 10, h * 0.1);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.1);
      ctx.moveTo(pitchX - 10, h * 0.9);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.9);
      ctx.stroke();
    };

    const drawFastBowling = (ctx: CanvasRenderingContext2D, w: number, h: number, f: number) => {
      const cycle = f % 90;
      const progress = cycle / 90; 
      
      const startY = h * 0.1;
      const impactY = h * 0.6;
      const endY = h * 0.9;
      
      const startX = w / 2;
      const impactX = w / 2 + (Math.sin(f * 0.1) * 10);
      const endX = impactX + (impactX - startX) * 0.5;

      let currentX, currentY;

      if (progress < 0.7) {
        const p = progress / 0.7;
        currentX = startX + (impactX - startX) * p;
        currentY = startY + (impactY - startY) * p;
      } else {
        if (progress > 0.7 && progress < 0.72 && cycle === Math.floor(90 * 0.7)) {
          // Generate sparks on impact
          for (let i = 0; i < 10; i++) {
            sparks.push({
              x: impactX,
              y: impactY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4 - 2,
              life: 1.0
            });
          }
        }

        const p = (progress - 0.7) / 0.3;
        currentX = impactX + (endX - impactX) * p;
        currentY = impactY + (endY - impactY) * p;
      }

      // Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        ctx.fillStyle = `rgba(245, 158, 11, ${s.life})`;
        ctx.fillRect(s.x, s.y, 2, 2);
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.05;
        if (s.life <= 0) sparks.splice(i, 1);
      }

      ctx.fillStyle = "#EF4444"; 
      ctx.beginPath();
      ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
      ctx.fill();

      if (progress > 0.7) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
        ctx.beginPath();
        ctx.arc(impactX, impactY, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCoverDrive = (ctx: CanvasRenderingContext2D, w: number, h: number, f: number) => {
      const cycle = f % 100;
      const progress = cycle / 100;

      const impactX = w / 2 - 10;
      const impactY = h * 0.85;

      if (progress < 0.2) {
        soundPlayed = false;
        // Ball coming in
        const p = progress / 0.2;
        const currentX = (w/2) + (impactX - w/2) * p;
        const currentY = (h*0.1) + (impactY - h*0.1) * p;
        
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(impactX + 20, impactY - 20);
        ctx.lineTo(impactX, impactY);
        ctx.stroke();
      }

      if (progress >= 0.2) {
        if (!soundPlayed) {
          playBatSound();
          soundPlayed = true;
        }

        const p = (progress - 0.2) / 0.8;
        const currentX = impactX - (w * 0.4) * p;
        const currentY = impactY - (h * 0.6) * p;

        ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
        ctx.lineWidth = 3;
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
      const cycle = f % 150;
      const progress = Math.min(1, cycle / 75);
      
      const startX = w / 2 + 15;
      const startY = h * 0.1;
      const impactX = w / 2 - 5;
      const impactY = h * 0.7;
      const endX = w / 2 - 25;
      const endY = h * 0.95;

      ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      const currentImpactX = startX + (impactX - startX) * progress;
      const currentImpactY = startY + (impactY - startY) * progress;
      ctx.lineTo(currentImpactX, currentImpactY);
      
      if (cycle > 75) {
        const postProgress = (cycle - 75) / 75;
        const currentEndX = impactX + (endX - impactX) * postProgress;
        const currentEndY = impactY + (endY - impactY) * postProgress;
        ctx.lineTo(currentEndX, currentEndY);
      }
      ctx.stroke();

      // Nodes
      ctx.fillStyle = "#06B6D4";
      ctx.beginPath(); ctx.arc(startX, startY, 4, 0, Math.PI * 2); ctx.fill();
      if (cycle > 75) {
        ctx.beginPath(); ctx.arc(impactX, impactY, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(endX, endY, 4, 0, Math.PI * 2); ctx.fill();
      }

      // Heatmap impact zone
      if (cycle > 75) {
        const grad = ctx.createRadialGradient(impactX, impactY, 0, impactX, impactY, 25);
        grad.addColorStop(0, "rgba(239, 68, 68, 0.6)");
        grad.addColorStop(0.5, "rgba(245, 158, 11, 0.4)");
        grad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(impactX, impactY, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "10px monospace";
        ctx.fillText(`PITCH: (${Math.round(impactX)}, ${Math.round(impactY)})`, impactX + 15, impactY);
        ctx.fillText(`IMPACT: IN LINE`, impactX + 15, impactY + 12);
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
    <div className="w-full h-full flex flex-col bg-[#05070B] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative" id="pitch-canvas">
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
