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

  const playCinematicStadiumIntro = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      
      // 1. Sub-Bass Drop (Sine sweep 180Hz -> 35Hz over 1.2s)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(180, t);
      subOsc.frequency.exponentialRampToValueAtTime(35, t + 1.2);
      
      subGain.gain.setValueAtTime(0, t);
      subGain.gain.linearRampToValueAtTime(1.0, t + 0.1);
      subGain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
      
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(t);
      subOsc.stop(t + 1.2);

      // 2. Bat Crack (Snare / High-pass noise burst 0.15s)
      const bufferSize = ctx.sampleRate * 0.15;
      const crackBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const crackData = crackBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        crackData[i] = Math.random() * 2 - 1;
      }
      const crackSource = ctx.createBufferSource();
      crackSource.buffer = crackBuffer;
      
      const crackFilter = ctx.createBiquadFilter();
      crackFilter.type = "highpass";
      crackFilter.frequency.value = 1500;
      
      const crackGain = ctx.createGain();
      crackGain.gain.setValueAtTime(0, t);
      crackGain.gain.linearRampToValueAtTime(1.0, t + 0.01);
      crackGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      
      crackSource.connect(crackFilter);
      crackFilter.connect(crackGain);
      crackGain.connect(ctx.destination);
      crackSource.start(t);

      // 3. Brass Riff (F4 -> Ab4 -> C5 with slight detune)
      const playBrassNote = (freq: number, start: number, dur: number) => {
        const playOsc = (f: number, pan: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(f, start);
          
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, start + dur);
          
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1000, start);
          filter.frequency.linearRampToValueAtTime(3000, start + 0.05);
          filter.frequency.exponentialRampToValueAtTime(1000, start + dur);

          osc.connect(filter);
          
          if (panner) {
            panner.pan.value = pan;
            filter.connect(panner);
            panner.connect(gain);
          } else {
            filter.connect(gain);
          }
          
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + dur);
        };
        
        // Main note + detuned clone for chorus effect
        playOsc(freq, -0.3);
        playOsc(freq * 1.005, 0.3);
      };

      // F4 (349.23), Ab4 (415.30), C5 (523.25)
      playBrassNote(349.23, t + 0.2, 0.3);
      playBrassNote(415.30, t + 0.5, 0.3);
      playBrassNote(523.25, t + 0.8, 1.2);

      // 4. Stadium Crowd Cheer (Bandpass noise 400Hz - 2200Hz, 3.5s duration)
      const crowdDuration = 3.5;
      const crowdBuffer = ctx.createBuffer(1, ctx.sampleRate * crowdDuration, ctx.sampleRate);
      const crowdData = crowdBuffer.getChannelData(0);
      for (let i = 0; i < crowdBuffer.length; i++) {
        crowdData[i] = (Math.random() * 2 - 1) * 0.5; // Scaled down white noise
      }
      
      const crowdSource = ctx.createBufferSource();
      crowdSource.buffer = crowdBuffer;
      
      const crowdFilter = ctx.createBiquadFilter();
      crowdFilter.type = "bandpass";
      crowdFilter.frequency.value = 1000;
      crowdFilter.Q.value = 0.5; // Roughly 400Hz to 2200Hz spread
      
      const crowdGain = ctx.createGain();
      crowdGain.gain.setValueAtTime(0, t);
      crowdGain.gain.linearRampToValueAtTime(0.8, t + 1.0); // Swell up
      crowdGain.gain.exponentialRampToValueAtTime(0.01, t + crowdDuration);
      
      crowdSource.connect(crowdFilter);
      crowdFilter.connect(crowdGain);
      crowdGain.connect(ctx.destination);
      crowdSource.start(t);

    } catch (e) {
      console.warn("Audio synthesis failed:", e);
    }
  };

  const handleTakeGuard = () => {
    playCinematicStadiumIntro();
    sessionStorage.setItem("hasWalkedOut", "true");
    setTimeout(() => {
      setShow(false);
    }, 50); // Slight delay to ensure state triggers render cycle properly
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
          className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center select-none overflow-hidden bg-black/60 text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Background Image & Vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=2000&q=80')` }}
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.85) 100%)' }} />

          {/* Real-World Broadcast Telemetry Overlay */}
          <div className="fixed inset-0 p-6 md:p-8 pointer-events-none z-30 flex flex-col justify-between">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              {/* Top-Left: Historic Venue & Fixture */}
              <div className="flex flex-col gap-1 select-none pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-white font-black text-xs md:text-sm tracking-widest uppercase font-sans">
                    LIVE // LORD'S CRICKET GROUND
                  </span>
                </div>
                <span className="text-neutral-400 font-mono text-[11px] tracking-wider uppercase">
                  THE ASHES • DAY 5 // FINAL INNINGS
                </span>
              </div>
              
              {/* Top-Right: Target Status */}
              <div className="flex flex-col items-end select-none pointer-events-none opacity-80">
                <div className="text-white font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em]">
                  TRYING TO BUILD A TECHNICAL INNING
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end">
              {/* Bottom-Left: Conditions */}
              <div className="flex flex-col gap-1 select-none pointer-events-none">
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                  CONDITIONS
                </div>
                <div className="text-white font-black text-xs tracking-wider uppercase">
                  OVERCAST // SEAM MOVEMENT EXPECTED
                </div>
              </div>

              {/* Bottom-Right: Session */}
              <div className="flex flex-col items-end gap-1 select-none pointer-events-none">
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                  MATCH STATUS
                </div>
                <div className="text-white font-black text-xs tracking-wider uppercase">
                  SESSION 3 // BALL 1
                </div>
              </div>
            </div>
          </div>

          {/* Center Walkout Card */}
          <div className="relative z-40 flex flex-col items-center w-full max-w-4xl px-4">
            <div className="w-full bg-[#0B0E14]/85 border border-emerald-500/40 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
              
              {/* Photo Cutout */}
              <div className="relative w-48 h-48 md:w-72 md:h-72 shrink-0 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)] bg-[#0B0E14]">
                {/* Emerald Wash / Cinematic Lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/60 via-emerald-500/10 to-emerald-300/30 z-10 pointer-events-none mix-blend-overlay" />
                
                {/* Image */}
                <img 
                  src="/chandan-walkout.jpg" 
                  alt="Chandan Pandey" 
                  className="relative z-0 w-full h-full object-cover object-top grayscale contrast-[1.15] brightness-[1.10]"
                />
                
                {/* Vignette to blend the harsh background edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(11,14,20,1)] z-20 pointer-events-none" />
              </div>

              {/* Dossier Content */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                {/* Top Badge */}
                <div className="mb-3">
                  <h2 className="font-mono text-xl md:text-2xl font-black tracking-[0.3em] text-emerald-400 uppercase drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                    NEXT BATTER TO THE CREASE
                  </h2>
                </div>

                {/* Player Name */}
                <h1 className="font-mono text-3xl md:text-5xl font-black tracking-tight text-white uppercase mb-2">
                  CHANDAN PANDEY
                </h1>

                {/* Role */}
                <div className="font-mono text-xs md:text-sm font-semibold tracking-wider text-emerald-300/90 mb-6 uppercase">
                  All-Rounder in Java, C++, part-time Python, SQL, AI tools
                </div>

                {/* Technical Intro */}
                <p className="font-sans text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl mb-8">
                  "Taking guard with disciplined OOP architecture in Java and low-level thread synchronization in C++. Driving full-stack deliveries through typed TypeScript pipelines, backed by Python scripts and vector AI embeddings for Hawk-Eye precision. Grounded in ACID-compliant SQL scorekeeping and reliable network handshakes—playing every technical delivery on merit."
                </p>

                {/* Action Button */}
                <div className="flex flex-col items-center md:items-start w-full">
                  <button 
                    onClick={handleTakeGuard}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base tracking-wider py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 uppercase w-full sm:w-auto"
                  >
                    <span>🏏 TAKE GUARD & WALK OUT</span>
                  </button>
                  
                  <button 
                    onClick={handleSkip}
                    className="mt-5 text-[11px] text-white/40 hover:text-white transition-colors underline underline-offset-4 font-mono"
                  >
                    [ Skip walkout & view scorecard directly (Muted) ]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
