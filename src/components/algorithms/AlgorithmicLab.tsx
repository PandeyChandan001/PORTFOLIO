import { invariants } from "@/data/content";

export function AlgorithmicLab() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Algorithmic Invariants & Pattern Mastery</h2>
        <div className="mt-6 border-l-2 border-[#10B981] pl-4 italic text-muted-foreground max-w-3xl">
          "Rather than grinding vanity counts, my practice focuses on deliberate algorithmic mastery—analyzing time-space invariants across Two-Pointer convergence, Monotonic Queue boundaries, and Tree/Heap state transitions."
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {invariants.map((item, i) => (
          <div key={i} className="group relative rounded-xl border border-white/10 bg-card p-6 transition-all hover:bg-muted/50 hover:border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] font-mono text-xs">
                0{i + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-12">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
