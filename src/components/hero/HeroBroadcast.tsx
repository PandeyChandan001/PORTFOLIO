"use client";

import { profile } from "@/data/content";
import { PitchCanvas } from "./PitchCanvas";

export function HeroBroadcast() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center border-b border-white/10 overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative z-10 w-full">
        
        {/* Left Column: Pro Broadcast Match Deck */}
        <div className="flex flex-col justify-center space-y-8 lg:max-w-[110%]">
          <div className="w-full rounded-2xl border border-[#10B981]/30 bg-[#0B0E14]/90 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
            
            {/* Top Header Strip */}
            <div className="bg-[#10B981]/10 border-b border-[#10B981]/20 px-6 py-3 font-mono text-xs font-bold tracking-wider text-[#10B981] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 uppercase">
                <span className="h-2 w-2 bg-[#10B981] rounded-full animate-pulse" />
                MATCH DAY PROFILE // CAP #05
              </div>
              <div className="uppercase opacity-80 text-[10px] sm:text-xs">
                TIER: FULL-STACK & SYSTEMS ALL-ROUNDER
              </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase border-b border-white/10 pb-4">
                CHANDAN PANDEY
              </h2>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 font-mono">
                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Batting Style</div>
                  <div className="text-white text-sm">Top-Order Anchor <span className="text-[#06B6D4]">(TypeScript, Next.js 15, Responsive UI)</span></div>
                </div>
                
                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Bowling Action</div>
                  <div className="text-white text-sm">Right-Arm Express Pace <span className="text-[#06B6D4]">(C++, Java, Low-Latency Memory & Concurrency)</span></div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Specialist Shot</div>
                  <div className="text-white text-sm">Cover Drive through Zod-Validated Schemas & Clean APIs</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Mystery Delivery</div>
                  <div className="text-white text-sm">SIEVE Cache Eviction (Beating LRU Pollution under High Skew)</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">6th Bowling Option</div>
                  <div className="text-white text-sm">Part-Time Python, SQL Scorekeeping & Applied AI Embeddings</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Academy Grounds</div>
                  <div className="text-white text-sm">Methodist High School, Kanpur</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Home Franchise</div>
                  <div className="text-white text-sm">Manipal University Jaipur</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Current Innings</div>
                  <div className="text-white text-sm">Innings 05 (B.Tech CSE: IoT & Intelligent Systems)</div>
                </div>

                <div className="space-y-1 border-l-2 border-[#10B981]/30 pl-3 md:col-span-2 mt-2">
                  <div className="text-slate-400 text-xs tracking-wider uppercase">Match Form</div>
                  <div className="text-[#10B981] font-semibold text-sm">🟢 Match-Fit // Available for SDE & Applied AI Internships</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pr-8">
            <div className="border-l-4 border-[#10B981] pl-4 italic text-muted-foreground leading-relaxed text-sm">
              "{profile.bio}"
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-md bg-foreground text-background px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                <span>🏏</span> Inspect Flagship Innings
              </button>
              <a 
                href="/resume.pdf"
                className="rounded-md border border-white/10 bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted text-foreground flex items-center gap-2"
                target="_blank"
              >
                <span>📄</span> Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Pitch Simulation Canvas */}
        <div className="flex items-center justify-center lg:justify-end w-full h-[400px] lg:h-auto py-8">
          <div className="w-full max-w-sm h-[500px]">
             <PitchCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
