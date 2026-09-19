import { profile } from "@/data/content";

export function Education() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10 pb-40">
      <div className="rounded-xl border border-white/10 bg-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Academic Background</h2>
        
        <div className="space-y-6">
          <div>
            <div className="text-[#10B981] font-mono text-sm mb-1">Current Standing</div>
            <div className="text-lg text-foreground font-medium">{profile.academic}</div>
          </div>
          
          <div>
            <div className="text-[#06B6D4] font-mono text-sm mb-1">Foundational Background</div>
            <div className="text-foreground">{profile.schooling}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
