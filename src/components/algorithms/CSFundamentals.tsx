import { cricketCSFundamentals, cricketAlgorithmicRigor } from "@/data/content";

export function CSFundamentals() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Pitch Conditions: CS Fundamentals & Match-Ready DSA</h2>
        <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[#10B981]">
          // ANALYTICAL PLAYBOOK // 22-YARD INVARIANTS
        </div>
        <div className="mt-6 border-l-2 border-[#10B981] pl-4 italic text-muted-foreground max-w-3xl leading-relaxed">
          "Dominating the match requires reading the pitch as deeply as executing the shots—from understanding protocol handshakes at the crease to building disciplined innings across easy, medium, and death-over algorithmic spells."
        </div>
      </div>

      <div className="space-y-16">
        {/* Block A: Match Fundamentals & Ground Conditions */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
              // Block A: Match Fundamentals & Ground Conditions
            </div>
            <div className="hidden sm:block font-mono text-[10px] text-white/30">MATCH ENGINE: ACTIVE</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cricketCSFundamentals.map((card, idx) => (
              <div key={idx} className={`rounded-xl border border-white/10 bg-[#0F1117] p-6 flex flex-col h-full transition-colors duration-300 ${card.hoverBorder} group relative overflow-hidden`}>
                <div className="mb-4">
                  <div className={`inline-block px-2 py-1 rounded text-[10px] font-mono border uppercase tracking-wider mb-4 ${card.badgeColor}`}>
                    {card.badge}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground leading-tight">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "{card.concept}"
                  </p>
                </div>
                <ul className="mt-auto space-y-3 pt-4 border-t border-white/5">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-white/20 mr-2 mt-0.5">›</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Block B: The Inning Curve */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
              // Block B: The Inning Curve — DSA Algorithmic Progression
            </div>
            <div className="hidden sm:block font-mono text-[10px] text-white/30">STRIKE RATE: O(1)</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cricketAlgorithmicRigor.map((tier, idx) => (
              <div key={idx} className={`rounded-xl border border-white/10 bg-[#0F1117] p-6 flex flex-col transition-colors duration-300 ${tier.hoverBorder} group relative`}>
                <div className="flex items-start justify-between mb-4 flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">Tier {idx + 1}: {tier.tier}</h3>
                </div>
                <div className="mb-4">
                  <span className={`inline-block px-2 py-1 rounded text-[10px] font-mono border uppercase tracking-wider ${tier.tagColor}`}>
                    {tier.tag}
                  </span>
                </div>
                <div className="mb-2 text-foreground font-medium border-b border-white/5 pb-2">
                  {tier.title}
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <span className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Mindset</span>
                    <span className="text-muted-foreground leading-relaxed">{tier.mindset}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">Key Shots & Topics</span>
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
