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
      
      const duration = 3.0; // 3 seconds
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Synthesize pink/white noise combo for crowd roar
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
        data[i] *= 0.11; // scaling
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Filter to sound like a distant crowd roar
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1000;

      // Envelope to fade in and out
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.5);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070B] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(15px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Animated floodlight beams */}
          <motion.div 
            className="absolute inset-0 pointer-events-none" 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)"
            }} 
          />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4">
            <div className="space-y-2">
              <div className="font-mono text-sm tracking-[0.2em] text-[#10B981] animate-pulse">
                MATCH DAY // STADIUM TUNNEL
              </div>
              <div className="font-mono text-xs tracking-widest text-muted-foreground">
                NEXT BATTER IN: CHANDAN PANDEY
              </div>
            </div>

            <button 
              onClick={handleTakeGuard}
              className="group relative overflow-hidden rounded-md border border-[#10B981]/30 bg-[#10B981]/10 px-8 py-4 text-sm font-semibold tracking-wider text-[#10B981] transition-all hover:bg-[#10B981] hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              [ 🏏 TAKE GUARD & WALK OUT ]
            </button>

            <div className="space-y-2">
              <button 
                onClick={handleSkip}
                className="text-[10px] text-white/40 hover:text-white transition-colors underline underline-offset-4 font-mono"
              >
                [ Skip directly to scorecard (Muted) ]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
