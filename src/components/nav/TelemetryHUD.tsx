"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function TelemetryHUD() {
  const [time, setTime] = useState("");
  const [muted, setMuted] = useState(false);

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
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05070B]/80 backdrop-blur-md px-4 py-2 flex items-center justify-between font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2">
        <span className="text-foreground">MATCH STATUS: AVAILABLE FOR INTERNSHIPS</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="font-mono hidden sm:block">{time}</div>
        <button 
          onClick={() => setMuted(!muted)}
          className="text-muted-foreground hover:text-foreground transition-colors bg-white/5 p-1.5 rounded-full"
          title="Toggle Match Audio"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}
