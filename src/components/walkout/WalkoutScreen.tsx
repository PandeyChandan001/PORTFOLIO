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

  const playProceduralEntrance = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      
      // 1. Synthesize Brass Fanfare (C4 -> G4 -> C5)
      const playNote = (freq: number, start: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth"; // Brass-like
        osc.frequency.setValueAtTime(freq, start);
        
        // Brass envelope
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.3, start + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, start + dur);
        
        // Filter for brassy swell
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, start);
        filter.frequency.linearRampToValueAtTime(2500, start + 0.1);
        filter.frequency.exponentialRampToValueAtTime(800, start + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(start);
        osc.stop(start + dur);
      };

      // C4 (261.63Hz) -> G4 (392.00Hz) -> C5 (523.25Hz)
      playNote(261.63, t, 0.4);
      playNote(392.00, t + 0.4, 0.4);
      playNote(523.25, t + 0.8, 1.2);

      // 2. Synthesize Crowd Roar (Pink Noise Burst with Slow Decay)
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

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 1000;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, t);
      noiseGain.gain.linearRampToValueAtTime(0.5, t + 0.8); // Peak with C5
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + duration);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseSource.start(t);
    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  };

  const handleTakeGuard = () => {
    playProceduralEntrance();
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#080B10]/85 to-transparent pointer-events-none" />

          {/* Full Broadcast HUD Container */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-10 pointer-events-auto">
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-1 opacity-80">
                <div className="text-[#10B981] animate-pulse font-bold tracking-widest text-lg">MATCH DAY // STADIUM TUNNEL</div>
                <div className="text-xl">NEXT BATTER IN: CHANDAN PANDEY</div>
                <div className="text-[#06B6D4]">Role: All-Rounder in Java, C++, part-time Python, SQL, AI tools</div>
              </div>
            </div>

            <div className="max-w-xl mx-auto w-full text-center flex flex-col items-center mt-12">
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
                [ Skip to Scorecard (Muted) ]
              </button>
            </div>

            <div />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
