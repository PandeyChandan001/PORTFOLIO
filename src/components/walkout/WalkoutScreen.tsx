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

  const handleTakeGuard = () => {
    const audio = new Audio("/sounds/walkout.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Audio playback blocked or file not found, fail gracefully
      console.warn("Audio playback skipped.");
    });
    
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050608]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Subtle CSS radial floodlight gradients */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)"
          }} />

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
              className="group relative overflow-hidden rounded-md border border-[#10B981]/30 bg-[#10B981]/10 px-8 py-4 text-sm font-semibold tracking-wider text-[#10B981] transition-all hover:bg-[#10B981] hover:text-black"
            >
              [ 🏏 TAKE GUARD & WALK OUT ]
            </button>

            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground font-mono">
                Includes short stadium walkout audio experience
              </p>
              <button 
                onClick={handleSkip}
                className="text-[10px] text-white/40 hover:text-white transition-colors underline underline-offset-4"
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
