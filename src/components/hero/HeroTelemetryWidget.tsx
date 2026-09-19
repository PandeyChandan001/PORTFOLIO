"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeroTelemetryWidget() {
  const [skew, setSkew] = useState(0.9);
  const [hitRatio, setHitRatio] = useState(87.4);
  const [tailLatency, setTailLatency] = useState(1.14);

  useEffect(() => {
    // Simulate dynamic hit ratio based on Zipfian skew
    const baseHitRatio = 50 + (skew * 40);
    const jitter = (Math.random() - 0.5) * 1.5;
    
    const timeout = setTimeout(() => {
      setHitRatio(Math.min(99.9, Math.max(0, baseHitRatio + jitter)));
      setTailLatency(Math.max(0.5, 2.5 - skew + (Math.random() * 0.2)));
    }, 500);

    return () => clearTimeout(timeout);
  }, [skew, hitRatio]);

  return (
    <div className="w-full max-w-md rounded-lg border border-white/10 bg-card p-1 shadow-2xl overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#10B981]" />
          <span className="text-xs text-muted-foreground uppercase">aether-kv.telemetry.sys</span>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">EVICTION POLICY</div>
          <div className="text-[#06B6D4]">SIEVE / Dynamic Frequency Queue</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">LIVE HIT RATIO</div>
            <div className="text-2xl text-[#10B981] font-bold">
              {hitRatio.toFixed(1)}%
            </div>
            <div className="text-[10px] text-muted-foreground">(+14.2% over LRU)</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">TAIL LATENCY (P99)</div>
            <div className="text-2xl text-foreground font-bold">
              {tailLatency.toFixed(2)}ms
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">WORKLOAD SKEW (ZIPFIAN α)</span>
            <span className="text-[#06B6D4]">{skew.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.05"
            value={skew}
            onChange={(e) => setSkew(parseFloat(e.target.value))}
            className="w-full accent-[#06B6D4] h-1 bg-muted rounded-full appearance-none outline-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Uniform (0.5)</span>
            <span>Highly Skewed (1.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
