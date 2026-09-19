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
          className="fixed inset-0 z-[100] w-screen h-screen flex flex-col justify-between p-6 md:p-10 select-none overflow-hidden text-white"
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

          {/* Full Broadcast HUD Container */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-auto">
            
            {/* Top Row (Match & Broadcast Telemetry) */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
              <div className="space-y-1">
                <div className="font-bold text-[#10B981] tracking-widest uppercase">🏏 FIXTURE: SDE & APPLIED AI RECRUITMENT 2027</div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase">VENUE: MANIPAL UNIVERSITY JAIPUR // DEBUT: METHODIST HIGH SCHOOL, KANPUR</div>
              </div>
              
              <div className="flex flex-col items-end gap-1 text-right">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">LIVE TELEMETRY</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/50 uppercase">AUDIO: 3D STADIUM SUB-WOOFER // READY FOR WALKOUT</div>
              </div>
            </div>

            {/* Center Stage: Batter Walkout Dossier Card */}
            <div className="max-w-2xl mx-auto w-full bg-black/75 backdrop-blur-xl border border-[#10B981]/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center relative overflow-hidden flex flex-col items-center">
              <div className="text-[#10B981] font-mono text-xs uppercase tracking-widest mb-4 font-bold">
                MATCH INNINGS 01 // OVER 00.1 // NEXT BATTER TO THE CREASE
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight font-sans">
                CHANDAN PANDEY
              </h1>
              
              <div className="bg-[#10B981]/10 border border-[#10B981]/20 px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs text-[#06B6D4] uppercase tracking-wider mb-6">
                All-Rounder in Java, C++, part-time Python, SQL, AI tools
              </div>
              
              <p className="text-sm md:text-base text-slate-300 font-medium max-w-xl mb-8 leading-relaxed mx-auto">
                "Taking guard with disciplined OOP architecture in Java and low-level thread synchronization in C++. Driving full-stack deliveries through typed TypeScript pipelines, backed by Python scripts and vector AI embeddings for Hawk-Eye precision. Grounded in ACID-compliant SQL scorekeeping and reliable network handshakes—playing every technical delivery on merit."
              </p>
              
              <button 
                onClick={handleTakeGuard}
                className="bg-[#10B981] hover:bg-[#34d399] text-black font-extrabold text-lg tracking-wider py-4 px-10 rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto uppercase"
              >
                <span>🏏</span> TAKE GUARD & WALK OUT
              </button>
              
              <button 
                onClick={handleSkip}
                className="mt-5 text-[11px] text-white/40 hover:text-white transition-colors underline underline-offset-4"
              >
                [ Skip walkout & view scorecard directly (Muted) ]
              </button>
            </div>

            {/* Bottom Row (Dugout Strategy & Playing XI Lineup) */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-8">
              {/* Bottom-Left */}
              <div className="max-w-sm">
                <div className="text-[#10B981] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  PITCH REPORT & STRATEGY
                </div>
                <div className="text-xs text-white/70 leading-relaxed font-sans">
                  Hard turf with true bounce. Low-latency C++ cache algorithms handle the pace; Zod-validated AI pipelines anchor the middle order.
                </div>
              </div>
              
              {/* Bottom-Right */}
              <div className="text-right">
                <div className="text-[#10B981] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  SQUAD ATTACK
                </div>
                <ul className="text-[9px] sm:text-[10px] text-white/60 font-mono space-y-1.5 uppercase text-left inline-block">
                  <li><span className="text-white/40">01.</span> JAVA & OOP (ANCHOR)</li>
                  <li><span className="text-white/40">02.</span> C++ & CONCURRENCY (EXPRESS PACE)</li>
                  <li><span className="text-white/40">03.</span> NEXT.JS & TYPESCRIPT (STROKEPLAY)</li>
                  <li><span className="text-white/40">04.</span> APPLIED AI & RAG (HAWK-EYE DRS)</li>
                  <li><span className="text-white/40">05.</span> SQL & DBMS (SCOREBOOK INTEGRITY)</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
