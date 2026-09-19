"use client";

import { useState } from "react";
import { profile } from "@/data/content";
import { HeroTelemetryWidget } from "./HeroTelemetryWidget";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center border-b border-white/10 overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative z-10 w-full">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 text-xs font-mono text-[#10B981] w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            {profile.status}
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {profile.headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {profile.bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-md bg-foreground text-background px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
            >
              [Inspect Projects]
            </button>
            <button className="rounded-md border border-white/10 bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted text-foreground">
              [Quick Resume / Terminal View]
            </button>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <HeroTelemetryWidget />
        </div>
      </div>
    </section>
  );
}
