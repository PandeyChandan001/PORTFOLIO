"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "BATTING" | "BOWLING" | "FIELDING";
type SubAction = "cover-drive" | "pull-shot" | "in-swinger" | "fast-bouncer" | "drs" | "idle";

export function CricketMatchDeck() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("BOWLING");
  const [action, setAction] = useState<SubAction>("idle");

  // --- AUDIO SYNTHESIS ENGINE ---
  const playBatCrack = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);
      
      gain.gain.setValueAtTime(1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    } catch (e) {}
  };

  const playStumpRattle = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      const playThud = (timeOffset: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(120, t + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(40, t + timeOffset + 0.15);
        
        gain.gain.setValueAtTime(0.8, t + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, t + timeOffset + 0.15);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + timeOffset);
        osc.stop(t + timeOffset + 0.15);
      };

      playThud(0);
      playThud(0.05);
      playThud(0.12);
    } catch (e) {}
  };

  const playDRSBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      
      const playPing = (timeOffset: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, t + timeOffset);
        
        gain.gain.setValueAtTime(0, t + timeOffset);
        gain.gain.linearRampToValueAtTime(0.3, t + timeOffset + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, t + timeOffset + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + timeOffset);
        osc.stop(t + timeOffset + 0.3);
      };

      playPing(0);
      playPing(0.4);
      playPing(0.8);
    } catch (e) {}
  };

  const triggerAction = (newAction: SubAction) => {
    setAction("idle");
    setTimeout(() => {
      setAction(newAction);
    }, 50);
  };

  // --- CANVAS RENDER ENGINE ---
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

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Common Pitch Draw
      ctx.fillStyle = "rgba(16, 185, 129, 0.03)";
      const pitchW = w * 0.4;
      const pitchX = (w - pitchW) / 2;
      ctx.fillRect(pitchX, 0, pitchW, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pitchX - 10, h * 0.1);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.1);
      ctx.moveTo(pitchX - 10, h * 0.9);
      ctx.lineTo(pitchX + pitchW + 10, h * 0.9);
      ctx.stroke();

      if (mode === "BATTING") {
        // Striker's perspective (ball comes FROM top TO bottom)
        const startY = h * 0.1;
        const endY = h * 0.85;
        const startX = w / 2;
        
        if (action === "idle") {
           // Draw idle bat
           ctx.strokeStyle = "#10B981";
           ctx.lineWidth = 4;
           ctx.beginPath();
           ctx.moveTo(w/2 + 20, endY - 20);
           ctx.lineTo(w/2, endY);
           ctx.stroke();
        } else {
           const cycle = Math.min(frame, 60);
           const progress = cycle / 60; // 0 to 1

           // Incoming ball
           if (progress < 0.5) {
             const p = progress / 0.5;
             const bX = startX;
             const bY = startY + (endY - startY) * p;
             ctx.fillStyle = "#EF4444";
             ctx.beginPath(); ctx.arc(bX, bY, 4, 0, Math.PI * 2); ctx.fill();
             
             ctx.strokeStyle = "#ffffff";
             ctx.lineWidth = 4;
             ctx.beginPath();
             ctx.moveTo(w/2 + 20, endY - 20);
             ctx.lineTo(w/2, endY);
             ctx.stroke();
           }

           if (progress >= 0.5) {
             if (!soundPlayed) {
               playBatCrack();
               soundPlayed = true;
             }
             const p = (progress - 0.5) / 0.5;
             const targetX = action === "cover-drive" ? w * 0.1 : w * 0.9;
             const targetY = h * 0.2;

             const curX = w/2 + (targetX - w/2) * p;
             const curY = endY + (targetY - endY) * p;

             ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
             ctx.lineWidth = 3;
             ctx.beginPath();
             ctx.moveTo(w/2, endY);
             ctx.lineTo(curX, curY);
             ctx.stroke();

             ctx.fillStyle = "#10B981";
             ctx.beginPath(); ctx.arc(curX, curY, 4, 0, Math.PI * 2); ctx.fill();
           }
        }
      }

      if (mode === "BOWLING") {
        // Bowler's perspective (ball goes FROM bottom TO top)
        const startY = h * 0.9;
        const impactY = h * 0.4;
        const endY = h * 0.1;
        const startX = w / 2;

        if (action === "idle") {
           // Idle ball at bottom
           ctx.fillStyle = "#EF4444";
           ctx.beginPath(); ctx.arc(startX, startY, 4, 0, Math.PI * 2); ctx.fill();
        } else {
           const cycle = Math.min(frame, 60);
           const progress = cycle / 60;
           
           const impactX = action === "in-swinger" ? w/2 - 15 : w/2;
           const endX = action === "in-swinger" ? w/2 - 20 : w/2;

           let curX, curY;
           if (progress < 0.6) {
             const p = progress / 0.6;
             curX = startX + (impactX - startX) * p;
             curY = startY + (impactY - startY) * p;
           } else {
             if (progress > 0.6 && progress < 0.65 && !soundPlayed) {
               // Hit pitch
               for (let i = 0; i < 15; i++) {
                 sparks.push({ x: impactX, y: impactY, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6 - 2, life: 1.0 });
               }
             }
             if (progress > 0.9 && !soundPlayed) {
               playStumpRattle();
               soundPlayed = true;
             }
             const p = (progress - 0.6) / 0.4;
             curX = impactX + (endX - impactX) * p;
             curY = impactY + (endY - impactY) * p;
           }

           // Draw sparks
           for (let i = sparks.length - 1; i >= 0; i--) {
             const s = sparks[i];
             ctx.fillStyle = `rgba(245, 158, 11, ${s.life})`;
             ctx.fillRect(s.x, s.y, 2, 2);
             s.x += s.vx; s.y += s.vy; s.life -= 0.05;
             if (s.life <= 0) sparks.splice(i, 1);
           }

           ctx.fillStyle = "#EF4444";
           ctx.beginPath(); ctx.arc(curX, curY, 4, 0, Math.PI * 2); ctx.fill();

           // Stumps
           ctx.fillStyle = progress > 0.9 ? "rgba(255,255,255,0.2)" : "#ffffff";
           ctx.fillRect(w/2 - 12, h*0.05, 3, 25);
           ctx.fillRect(w/2 - 2, h*0.05, 3, 25);
           ctx.fillRect(w/2 + 8, h*0.05, 3, 25);
           
           // Flying stump if hit
           if (progress > 0.9) {
             const p = (progress - 0.9) / 0.1;
             ctx.fillStyle = "#ffffff";
             ctx.save();
             ctx.translate(w/2 - 12 - (p*20), h*0.05 - (p*15));
             ctx.rotate(-p * Math.PI / 4);
             ctx.fillRect(0, 0, 3, 25);
             ctx.restore();
           }
        }
      }

      if (mode === "FIELDING") {
        if (action === "idle") {
           // Radar circles
           ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
           ctx.beginPath(); ctx.arc(w/2, h/2, 50, 0, Math.PI * 2); ctx.stroke();
           ctx.beginPath(); ctx.arc(w/2, h/2, 100, 0, Math.PI * 2); ctx.stroke();
           ctx.beginPath(); ctx.arc(w/2, h/2, 150, 0, Math.PI * 2); ctx.stroke();
        } else {
           const cycle = Math.min(frame, 100);
           const progress = cycle / 100;

           if (progress > 0.1 && !soundPlayed) {
             playDRSBeep();
             soundPlayed = true;
           }

           const startX = w/2 + 20; const startY = h * 0.9;
           const impactX = w/2 - 10; const impactY = h * 0.6;
           const endX = w/2 - 15; const endY = h * 0.1;

           ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
           ctx.lineWidth = 2;
           ctx.setLineDash([5, 5]);
           
           ctx.beginPath();
           ctx.moveTo(startX, startY);
           
           const p1 = Math.min(1, progress / 0.5);
           const cX1 = startX + (impactX - startX) * p1;
           const cY1 = startY + (impactY - startY) * p1;
           ctx.lineTo(cX1, cY1);

           if (progress > 0.5) {
             const p2 = (progress - 0.5) / 0.5;
             const cX2 = impactX + (endX - impactX) * p2;
             const cY2 = impactY + (endY - impactY) * p2;
             ctx.lineTo(cX2, cY2);
           }
           ctx.stroke();
           ctx.setLineDash([]);

           // Heatmap & Tags
           if (progress > 0.5) {
             const grad = ctx.createRadialGradient(impactX, impactY, 0, impactX, impactY, 30);
             grad.addColorStop(0, "rgba(239, 68, 68, 0.5)");
             grad.addColorStop(1, "rgba(239, 68, 68, 0)");
             ctx.fillStyle = grad;
             ctx.beginPath(); ctx.arc(impactX, impactY, 30, 0, Math.PI * 2); ctx.fill();

             ctx.fillStyle = "#06B6D4";
             ctx.beginPath(); ctx.arc(impactX, impactY, 4, 0, Math.PI * 2); ctx.fill();
           }

           if (progress > 0.9) {
             ctx.fillStyle = "#ffffff";
             ctx.font = "bold 11px monospace";
             ctx.fillText(`IMPACT: IN LINE`, impactX + 20, impactY);
             ctx.fillStyle = "#EF4444";
             ctx.fillText(`WICKETS: HITTING STUMPS`, impactX + 20, impactY + 14);
           }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, action]);

  return (
    <div className="w-full h-full flex flex-col bg-[#05070B] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* 1. Mode Selector Tabs */}
      <div className="flex items-center justify-between bg-black/40 border-b border-white/10 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground p-1 z-10">
        <button onClick={() => { setMode("BATTING"); setAction("idle"); }} className={`flex-1 py-2 text-center transition-colors rounded ${mode === "BATTING" ? "bg-[#10B981]/20 text-[#10B981]" : "hover:bg-white/5"}`}>🏏 BATTING</button>
        <button onClick={() => { setMode("BOWLING"); setAction("idle"); }} className={`flex-1 py-2 text-center transition-colors rounded ${mode === "BOWLING" ? "bg-[#EF4444]/20 text-[#EF4444]" : "hover:bg-white/5"}`}>⚡ BOWLING</button>
        <button onClick={() => { setMode("FIELDING"); setAction("idle"); }} className={`flex-1 py-2 text-center transition-colors rounded ${mode === "FIELDING" ? "bg-[#06B6D4]/20 text-[#06B6D4]" : "hover:bg-white/5"}`}>🎯 FIELDING & DRS</button>
      </div>

      {/* 2. Interactive Canvas */}
      <div className="relative flex-1 w-full min-h-[300px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Floating Action Buttons based on mode */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
          {mode === "BATTING" && (
            <>
              <button onClick={() => triggerAction("cover-drive")} className="bg-black/60 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] px-4 py-2 rounded font-mono text-[10px] uppercase font-bold hover:bg-[#10B981] hover:text-black transition-all shadow-lg active:scale-95">Cover Drive</button>
              <button onClick={() => triggerAction("pull-shot")} className="bg-black/60 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] px-4 py-2 rounded font-mono text-[10px] uppercase font-bold hover:bg-[#10B981] hover:text-black transition-all shadow-lg active:scale-95">Pull Shot</button>
            </>
          )}
          {mode === "BOWLING" && (
            <>
              <button onClick={() => triggerAction("in-swinger")} className="bg-black/60 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-4 py-2 rounded font-mono text-[10px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">In-Swinger (C++ Cache)</button>
              <button onClick={() => triggerAction("fast-bouncer")} className="bg-black/60 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-4 py-2 rounded font-mono text-[10px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">Fast Bouncer (Java OOP)</button>
            </>
          )}
          {mode === "FIELDING" && (
            <button onClick={() => triggerAction("drs")} className="bg-black/60 backdrop-blur-md border border-[#06B6D4]/40 text-[#06B6D4] px-6 py-2 rounded font-mono text-[10px] uppercase font-bold hover:bg-[#06B6D4] hover:text-black transition-all shadow-lg active:scale-95">🔍 Review Decision (DRS)</button>
          )}
        </div>
      </div>

      {/* 3. Skill Readout Card */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/10 p-4 font-mono z-10">
        <div className="text-[10px] text-white/50 uppercase mb-2 font-bold tracking-wider">Tactical Engineering Readout</div>
        {mode === "BATTING" && (
          <div className="text-xs text-[#10B981] leading-relaxed">
            Executing clean strokeplay with <span className="text-white font-bold">TypeScript, Next.js 15, responsive UI architectures,</span> and <span className="text-white font-bold">Zod validation.</span> Front-foot drives representing fluid client-side hydration.
          </div>
        )}
        {mode === "BOWLING" && (
          <div className="text-xs text-[#EF4444] leading-relaxed">
            Pounding the deck with <span className="text-white font-bold">C++, Java, thread synchronization, mutex locking,</span> and intense <span className="text-white font-bold">cache eviction research.</span> High-velocity memory management.
          </div>
        )}
        {mode === "FIELDING" && (
          <div className="text-xs text-[#06B6D4] leading-relaxed">
            Hawk-Eye data integrity powered by <span className="text-white font-bold">Python, Vector Embeddings, RAG pipelines,</span> and <span className="text-white font-bold">SQL schema normalization (3NF)</span> from the Career Co-Pilot framework.
          </div>
        )}
      </div>
    </div>
  );
}
