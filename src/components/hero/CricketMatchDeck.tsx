"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "BATTING" | "BOWLING" | "FIELDING";
type SubAction = "play-shot" | "off-spin" | "leg-spin" | "in-swinger" | "out-swinger" | "drs" | "idle";

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
      
      // Fast whoosh
      const noise = ctx.createBufferSource();
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, t);
      noiseGain.gain.linearRampToValueAtTime(0.5, t + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t);
    } catch (e) {}
  };

  const playSpinPop = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      
      // Seam whistle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.linearRampToValueAtTime(800, t + 0.5);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
      
      // Pitch bounce pop
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = "triangle";
      popOsc.frequency.setValueAtTime(200, t + 0.3); // trigger at 0.3s (impact)
      popOsc.frequency.exponentialRampToValueAtTime(50, t + 0.4);
      popGain.gain.setValueAtTime(0.5, t + 0.3);
      popGain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(t + 0.3);
      popOsc.stop(t + 0.4);
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
      playPing(0.6);
      playPing(1.2);
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
        const startY = h * 0.1;
        const endY = h * 0.85;
        const startX = w / 2;
        
        if (action === "idle") {
           ctx.strokeStyle = "#10B981";
           ctx.lineWidth = 4;
           ctx.beginPath();
           ctx.moveTo(w/2 + 20, endY - 20);
           ctx.lineTo(w/2, endY);
           ctx.stroke();
        } else {
           const cycle = Math.min(frame, 60);
           const progress = cycle / 60; 

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
             const targetX = w * 0.2; // Drive
             const targetY = h * 0.1;

             const curX = w/2 + (targetX - w/2) * p;
             const curY = endY + (targetY - endY) * p;

             ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
             ctx.lineWidth = 3;
             ctx.beginPath();
             ctx.moveTo(w/2, endY);
             ctx.lineTo(curX, curY);
             ctx.stroke();
             
             // Spark trail for the shot
             if (frame % 2 === 0) {
                sparks.push({ x: curX, y: curY, vx: 0, vy: 0, life: 1.0 });
             }
             for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                ctx.fillStyle = `rgba(16, 185, 129, ${s.life})`;
                ctx.beginPath(); ctx.arc(s.x, s.y, 2, 0, Math.PI * 2); ctx.fill();
                s.life -= 0.05;
                if (s.life <= 0) sparks.splice(i, 1);
             }

             ctx.fillStyle = "#10B981";
             ctx.beginPath(); ctx.arc(curX, curY, 4, 0, Math.PI * 2); ctx.fill();
           }
        }
      }

      if (mode === "BOWLING") {
        const startY = h * 0.9;
        const impactY = h * 0.4;
        const endY = h * 0.1;

        if (action === "idle") {
           ctx.fillStyle = "#EF4444";
           ctx.beginPath(); ctx.arc(w/2, startY, 4, 0, Math.PI * 2); ctx.fill();
        } else {
           const isFast = action === "in-swinger" || action === "out-swinger";
           const frames = isFast ? 50 : 80;
           const cycle = Math.min(frame, frames);
           const progress = cycle / frames;
           
           let startX = w/2;
           let impactX = w/2;
           let endX = w/2;

           if (action === "off-spin") {
             impactX = w/2 + 20; // pitches outside off
             endX = w/2 - 10;    // bites back to middle/leg
           } else if (action === "leg-spin") {
             startX = w/2 - 10;
             impactX = w/2 - 15; // drifts to leg/middle
             endX = w/2 + 25;    // breaks to off
           } else if (action === "in-swinger") {
             startX = w/2 + 30;  // wide outside off
             impactX = w/2 + 10;
             endX = w/2 - 15;    // tails in
           } else if (action === "out-swinger") {
             startX = w/2 - 10;  // middle/leg line
             impactX = w/2;
             endX = w/2 + 25;    // swings away
           }

           let curX, curY;
           const impactTime = isFast ? 0.6 : 0.5;

           if (progress < impactTime) {
             const p = progress / impactTime;
             // Add curve for swing/drift
             const curve = isFast ? Math.sin(p * Math.PI) * 15 * (action === "in-swinger" ? 1 : -1) : 0;
             curX = startX + (impactX - startX) * p + curve;
             curY = startY + (impactY - startY) * p;
           } else {
             if (progress > impactTime && progress < impactTime + 0.05 && !soundPlayed) {
               if (isFast) playStumpRattle();
               else playSpinPop();
               soundPlayed = true;
               // Dust particles on impact
               const color = isFast ? "245, 158, 11" : "210, 180, 140";
               for (let i = 0; i < 15; i++) {
                 sparks.push({ x: impactX, y: impactY, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6 - 2, life: 1.0 });
               }
             }
             const p = (progress - impactTime) / (1 - impactTime);
             curX = impactX + (endX - impactX) * p;
             curY = impactY + (endY - impactY) * p;
           }

           // Draw sparks/dust
           for (let i = sparks.length - 1; i >= 0; i--) {
             const s = sparks[i];
             const c = isFast ? "245, 158, 11" : "210, 180, 140";
             ctx.fillStyle = `rgba(${c}, ${s.life})`;
             ctx.fillRect(s.x, s.y, 2, 2);
             s.x += s.vx; s.y += s.vy; s.life -= 0.05;
             if (s.life <= 0) sparks.splice(i, 1);
           }

           // Draw ball
           ctx.fillStyle = "#EF4444";
           ctx.beginPath(); ctx.arc(curX, curY, 4, 0, Math.PI * 2); ctx.fill();

           // Draw trail for spin
           if (!isFast && progress < 1) {
             ctx.strokeStyle = "rgba(239, 68, 68, 0.2)";
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.moveTo(curX - 5, curY - 5);
             ctx.lineTo(curX + 5, curY + 5);
             ctx.stroke();
           }

           // Stumps
           ctx.fillStyle = progress > 0.9 && isFast ? "rgba(255,255,255,0.2)" : "#ffffff";
           ctx.fillRect(w/2 - 12, h*0.05, 3, 25);
           ctx.fillRect(w/2 - 2, h*0.05, 3, 25);
           ctx.fillRect(w/2 + 8, h*0.05, 3, 25);
           
           // Flying stump if fast ball hits
           if (progress > 0.9 && isFast) {
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
           ctx.strokeStyle = "rgba(6, 182, 212, 0.1)";
           ctx.beginPath(); ctx.arc(w/2, h/2, 50, 0, Math.PI * 2); ctx.stroke();
           ctx.beginPath(); ctx.arc(w/2, h/2, 100, 0, Math.PI * 2); ctx.stroke();
           ctx.beginPath(); ctx.arc(w/2, h/2, 150, 0, Math.PI * 2); ctx.stroke();
        } else {
           const cycle = Math.min(frame, 150);
           const progress = cycle / 150;

           if (progress > 0.1 && !soundPlayed) {
             playDRSBeep();
             soundPlayed = true;
           }

           const startX = w/2 + 30; const startY = h * 0.9;
           const impactX = w/2 - 5; const impactY = h * 0.6;
           const endX = w/2 - 15; const endY = h * 0.1;

           ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
           ctx.lineWidth = 2;
           ctx.setLineDash([5, 5]);
           
           ctx.beginPath();
           ctx.moveTo(startX, startY);
           
           const p1 = Math.min(1, progress / 0.33); // Phase 1: Pitching
           const cX1 = startX + (impactX - startX) * p1;
           const cY1 = startY + (impactY - startY) * p1;
           ctx.lineTo(cX1, cY1);

           if (progress > 0.33) {
             const p2 = Math.min(1, (progress - 0.33) / 0.33); // Phase 2: Impact
             const cX2 = impactX + (endX - impactX) * p2;
             const cY2 = impactY + (endY - impactY) * p2;
             ctx.lineTo(cX2, cY2);
           }
           ctx.stroke();
           ctx.setLineDash([]);

           // 1. Pitching Spot
           if (progress > 0.33) {
             ctx.fillStyle = "#10B981"; // Green light
             ctx.beginPath(); ctx.arc(impactX, impactY, 5, 0, Math.PI * 2); ctx.fill();
           }
           
           // 2. Impact on pad (assume halfway between impact and end)
           const padX = impactX + (endX - impactX) * 0.3;
           const padY = impactY + (endY - impactY) * 0.3;
           if (progress > 0.66) {
             ctx.fillStyle = "#10B981";
             ctx.beginPath(); ctx.arc(padX, padY, 5, 0, Math.PI * 2); ctx.fill();
             
             // Heatmap
             const grad = ctx.createRadialGradient(padX, padY, 0, padX, padY, 20);
             grad.addColorStop(0, "rgba(239, 68, 68, 0.6)");
             grad.addColorStop(1, "rgba(239, 68, 68, 0)");
             ctx.fillStyle = grad;
             ctx.beginPath(); ctx.arc(padX, padY, 20, 0, Math.PI * 2); ctx.fill();
           }

           // 3. Wickets Hitting
           if (progress > 0.95) {
             ctx.fillStyle = "#10B981";
             ctx.beginPath(); ctx.arc(endX, endY, 5, 0, Math.PI * 2); ctx.fill();
           }

           // HUD Overlays
           if (progress > 0.33) {
             ctx.fillStyle = "#ffffff"; ctx.font = "bold 9px monospace";
             ctx.fillText(`PITCHING: IN LINE`, w/2 + 20, h * 0.3);
             ctx.fillStyle = "#10B981"; ctx.fillText(`[ ✅ GREEN LIGHT ]`, w/2 + 20, h * 0.3 + 14);
           }
           if (progress > 0.66) {
             ctx.fillStyle = "#ffffff"; ctx.font = "bold 9px monospace";
             ctx.fillText(`IMPACT: IN LINE (< 3m)`, w/2 + 20, h * 0.4);
             ctx.fillStyle = "#10B981"; ctx.fillText(`[ ✅ GREEN LIGHT ]`, w/2 + 20, h * 0.4 + 14);
           }
           if (progress > 0.95) {
             ctx.fillStyle = "#ffffff"; ctx.font = "bold 9px monospace";
             ctx.fillText(`WICKETS: HITTING (MIDDLE & OFF)`, w/2 + 20, h * 0.5);
             ctx.fillStyle = "#10B981"; ctx.fillText(`[ ✅ GREEN LIGHT ]`, w/2 + 20, h * 0.5 + 14);
           }

           // Final Decision Banner
           if (progress >= 1) {
             ctx.fillStyle = "rgba(239, 68, 68, 0.9)";
             ctx.fillRect(w/2 - 70, h/2 - 20, 140, 40);
             ctx.fillStyle = "#ffffff";
             ctx.font = "bold 16px sans-serif";
             ctx.textAlign = "center";
             ctx.fillText(`DECISION: OUT 🔴`, w/2, h/2 + 6);
             ctx.textAlign = "left"; // reset
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
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-2 z-20 flex-wrap">
          {mode === "BATTING" && (
            <button onClick={() => triggerAction("play-shot")} className="bg-black/80 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] px-8 py-3 rounded-lg font-mono text-xs uppercase font-bold hover:bg-[#10B981] hover:text-black transition-all shadow-lg active:scale-95">🏏 PLAY SHOT</button>
          )}
          {mode === "BOWLING" && (
            <>
              <button onClick={() => triggerAction("off-spin")} className="bg-black/80 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-3 py-2 rounded font-mono text-[9px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">🌀 OFF SPIN</button>
              <button onClick={() => triggerAction("leg-spin")} className="bg-black/80 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-3 py-2 rounded font-mono text-[9px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">🔄 LEG SPIN</button>
              <button onClick={() => triggerAction("in-swinger")} className="bg-black/80 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-3 py-2 rounded font-mono text-[9px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">⚡ IN-SWINGER</button>
              <button onClick={() => triggerAction("out-swinger")} className="bg-black/80 backdrop-blur-md border border-[#EF4444]/40 text-[#EF4444] px-3 py-2 rounded font-mono text-[9px] uppercase font-bold hover:bg-[#EF4444] hover:text-black transition-all shadow-lg active:scale-95">💨 OUT-SWINGER</button>
            </>
          )}
          {mode === "FIELDING" && (
            <button onClick={() => triggerAction("drs")} className="bg-black/80 backdrop-blur-md border border-[#06B6D4]/40 text-[#06B6D4] px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold hover:bg-[#06B6D4] hover:text-black transition-all shadow-lg active:scale-95">🔍 REVIEW LBW (DRS)</button>
          )}
        </div>
      </div>

      {/* 3. Skill Readout Card */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/10 p-4 font-mono z-10 min-h-[100px]">
        <div className="text-[10px] text-white/50 uppercase mb-2 font-bold tracking-wider">Tactical Engineering Readout</div>
        {mode === "BATTING" && (
          <div className="text-xs text-[#10B981] leading-relaxed">
            Executing clean strokeplay with <span className="text-white font-bold">TypeScript, Next.js 15, responsive UI architectures,</span> and <span className="text-white font-bold">Zod validation.</span> Front-foot drives representing fluid client-side hydration.
          </div>
        )}
        {mode === "BOWLING" && (
          <div className="text-xs text-[#EF4444] leading-relaxed">
            Pounding the deck with <span className="text-white font-bold">C++, Java, thread synchronization, mutex locking,</span> and intense <span className="text-white font-bold">cache eviction research.</span> High-velocity memory management and spin-rate control.
          </div>
        )}
        {mode === "FIELDING" && (
          <div className="text-xs text-[#06B6D4] leading-relaxed space-y-1">
            <div><span className="text-white/60">PITCHING:</span> Document Token Ingestion</div>
            <div><span className="text-white/60">IMPACT:</span> Zod Schema Boundary Validation</div>
            <div><span className="text-white/60">WICKETS:</span> Vector Embedding & Skill Match Verification (Zero Hallucinations)</div>
          </div>
        )}
      </div>
    </div>
  );
}
