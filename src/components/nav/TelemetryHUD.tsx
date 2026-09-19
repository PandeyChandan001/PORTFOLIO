"use client";

import { useEffect, useState } from "react";

export function TelemetryHUD() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().split("T")[1].slice(0, 8) + "Z");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#08090C]/80 backdrop-blur-md px-4 py-2 flex items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        <span className="text-foreground">SYSTEM ONLINE</span>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <span>LOCATION: KANPUR, IN</span>
        <span className="text-white/20">//</span>
        <span>ROLE: SDE + AI INTERNSHIP READY</span>
        <span className="text-white/20">//</span>
        <span className="text-[#06B6D4]">RESEARCH: ACTIVE (EVICTION HEURISTICS)</span>
      </div>

      <div className="flex md:hidden items-center text-[#06B6D4]">
        RESEARCH: ACTIVE
      </div>

      <div className="font-mono">{time}</div>
    </div>
  );
}
