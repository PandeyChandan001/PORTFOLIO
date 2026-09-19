import { csFundamentals, algorithmicRigor } from "@/data/content";

export function CSFundamentals() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">CS Fundamentals & Algorithmic Rigor</h2>
        <div className="mt-6 border-l-2 border-[#10B981] pl-4 italic text-muted-foreground max-w-3xl leading-relaxed">
          "Engineering reliable systems requires depth across the stack—from protocol handshakes and relational consistency models to deliberate complexity analysis across DSA problem spectrums."
        </div>
      </div>

      <div className="space-y-16">
        {/* Block A: Core CS Pillars */}
        <div>
          <div className="mb-6 font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
            // Block A: Systems & Core Fundamentals
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {csFundamentals.map((card, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-[#0F1117] p-6 flex flex-col h-full hover:border-white/20 transition-colors">
                <div className="mb-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">Card 0{idx + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground leading-tight">{card.title}</h3>
                  <p className="text-sm text-[#10B981] mt-1 font-mono tracking-tight">{card.subheader}</p>
                </div>
                <ul className="mt-auto space-y-3">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-white/20 mr-2 mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Block B: Algorithmic Progression Matrix */}
        <div>
          <div className="mb-6 font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
            // Block B: Algorithmic Rigor
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {algorithmicRigor.map((tier, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-[#0F1117] p-6 flex flex-col hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">Tier: {tier.tier}</h3>
                  <span className={`px-2 py-1 rounded text-[10px] font-mono border uppercase tracking-wider ${tier.tagColor}`}>
                    {tier.tag}
                  </span>
                </div>
                <div className="mb-2 text-foreground font-medium">
                  {tier.title}
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <span className="block text-xs font-mono text-muted-foreground mb-1 uppercase">Focus</span>
                    <span className="text-muted-foreground leading-relaxed">{tier.focus}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-muted-foreground mb-1 uppercase">Key Topics</span>
                    <span className="text-muted-foreground leading-relaxed">{tier.topics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
