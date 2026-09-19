"use client";

import { profile } from "@/data/content";

export function Hero() {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center border-b border-white/10 overflow-hidden px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 relative z-10 w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-foreground">
          {profile.status}
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.2] text-balance max-w-3xl mx-auto">
            {profile.headline}
          </h1>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              {profile.bio}
            </p>
            <p className="text-sm text-muted-foreground/80 font-mono">
              {profile.background}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <button 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-md bg-foreground text-background px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
          >
            [View What I've Built]
          </button>
          <button className="rounded-md border border-white/10 bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted text-foreground">
            [Check Out Resume]
          </button>
        </div>
      </div>
    </section>
  );
}
