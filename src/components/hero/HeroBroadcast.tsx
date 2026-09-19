"use client";

import { profile } from "@/data/content";

export function HeroBroadcast() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center border-b border-white/10 overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative z-10 w-full">
        
        {/* Left Column: Player Card Graphic (Broadcast Lower-Third) */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0F1117] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            
            <div className="bg-[#10B981] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
              <span className="h-2 w-2 bg-black rounded-full animate-pulse" />
              {profile.name} // Player Profile
            </div>
            
            <div className="p-6 sm:p-8 space-y-4 font-mono text-sm">
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-start border-b border-white/5 pb-3">
                <span className="text-muted-foreground uppercase">Role</span>
                <span className="text-[#06B6D4] font-semibold">{profile.role}</span>
              </div>
              
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-start border-b border-white/5 pb-3">
                <span className="text-muted-foreground uppercase">Debut Grounds</span>
                <span className="text-foreground">{profile.debut}</span>
              </div>
              
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-start border-b border-white/5 pb-3">
                <span className="text-muted-foreground uppercase">Curr. Innings</span>
                <span className="text-foreground">{profile.innings}</span>
              </div>
              
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-2 items-start">
                <span className="text-muted-foreground uppercase">Form Status</span>
                <span className="text-[#10B981]">{profile.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Student Narrative */}
        <div className="flex flex-col justify-center space-y-6 lg:pl-8">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2] text-balance">
            {profile.headline}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button 
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-md bg-foreground text-background px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
            >
              [ Inspect Flagship Innings ]
            </button>
            <button className="rounded-md border border-white/10 bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted text-foreground">
              [ Download Match Record ]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
