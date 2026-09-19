"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WalkoutScreen() {
  const [show, setShow] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const hasWalkedOut = sessionStorage.getItem("hasWalkedOut");
    if (hasWalkedOut) {
      setShow(false);
    }
  }, []);

  const playProceduralCrowdRoar = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const duration = 3.5; 
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11; 
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1200;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start();
    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  };

  const handleTakeGuard = () => {
    playProceduralCrowdRoar();
    sessionStorage.setItem("hasWalkedOut", "true");
    setShow(false);
  };

  const handleSkip = () => {
    sessionStorage.setItem("hasWalkedOut", "true");
    setShow(false);
  };

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden font-mono text-xs uppercase tracking-wider text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Background Image & Gradient Overlays */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/60 pointer-events-none" />

          {/* Full Broadcast HUD Container */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-10 pointer-events-auto">
            
            {/* Top Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 opacity-80">
                <div>MATCH: SUMMER 2027 SDE & AI FIXTURE</div>
                <div className="text-[#F59E0B]">SURFACE: 22-YARD CS ARCHITECTURE // HARD SEAM</div>
                <div className="text-[#06B6D4]">WEATHER: HIGH-THROUGHPUT EXECUTION // ZERO DROPPED CATCHES</div>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  <span>LIVE MATCH BROADCAST</span>
                </div>
                <div className="text-[10px] opacity-60">STADIUM ACOUSTICS: UNMUTED ON ENTRY</div>
              </div>
            </div>

            {/* Center Walkout Broadcast Plaque */}
            <div className="max-w-xl mx-auto w-full text-center bg-black/65 backdrop-blur-md border border-[#10B981]/40 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
              <div className="text-[#10B981] mb-2 font-bold animate-pulse">
                DUGOUT CALL-UP // INNINGS 01 • OVER 00.1
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight font-sans tracking-normal">
                NEXT BATTER TO THE CREASE:<br/>CHANDAN PANDEY
              </h1>
              <div className="text-[#06B6D4] mb-8 text-[11px] sm:text-xs">
                All-Rounder in Java, C++, part-time Python, SQL, AI tools
              </div>
              
              <button 
                onClick={handleTakeGuard}
                className="bg-[#10B981] hover:bg-[#34d399] text-black font-bold tracking-wide py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] text-sm sm:text-lg transition-all active:scale-95 w-full sm:w-auto"
              >
                🏏 TAKE GUARD & WALK OUT
              </button>
              
              <button 
                onClick={handleSkip}
                className="mt-6 text-[10px] text-white/50 hover:text-white transition-colors underline underline-offset-4 normal-case tracking-normal"
              >
                [ Skip walkout & view scorecard directly ]
              </button>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 opacity-70">
              <div className="max-w-md">
                <div className="text-[#10B981] mb-1 font-bold">PITCH REPORT:</div>
                <div className="text-[10px] leading-relaxed normal-case font-sans">
                  "Surface rewards low-latency C++ line-and-length, clean Next.js strokeplay, and deterministic Zod schema fielding."
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] sm:text-[10px] bg-black/40 px-3 py-2 rounded border border-white/10 backdrop-blur-sm">
                  BATSMAN: NEXT.JS 15 • BOWLER: C++ CACHE •<br className="sm:hidden" /> WICKET-KEEPER: SQL • DRS: APPLIED AI
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
