import { skills } from "@/data/content";

export function TechnicalArsenal() {
  const categories = [skills.pillar1, skills.pillar2, skills.pillar3];

  return (
    <section id="skills" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Technical Arsenal: 3 Comprehensive Pillars</h2>
        <p className="mt-2 text-muted-foreground font-mono text-sm uppercase tracking-wider text-[#06B6D4]">
          // Core Competencies Matrix
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-6 bg-[#0F1117] border border-white/10 p-6 rounded-2xl shadow-xl transition-all hover:border-[#06B6D4]/30">
            <h3 className="text-lg font-bold text-foreground border-b border-white/10 pb-3 text-[#10B981]">
              {cat.title}
            </h3>
            <ul className="space-y-5">
              {cat.items.map((item, j) => (
                <li key={j} className="flex flex-col gap-1">
                  <span className="font-semibold text-white font-mono text-sm uppercase tracking-tight">{item.name}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
