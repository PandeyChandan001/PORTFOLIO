import { skills } from "@/data/content";

export function TechnicalArsenal() {
  const categories = [
    { title: "Low-Level & Systems", items: skills.lowLevel },
    { title: "Full-Stack & Web", items: skills.fullStack },
    { title: "Data & Intelligence", items: skills.dataInt },
    { title: "Core CS & Security", items: skills.coreCS },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Technical Arsenal</h2>
        <p className="mt-2 text-muted-foreground font-mono text-sm uppercase tracking-wider text-[#06B6D4]">
          // Layered Matrix
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b border-white/10 pb-2 uppercase tracking-wider">
              {cat.title}
            </h3>
            <ul className="space-y-3">
              {cat.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-[#06B6D4] mt-0.5">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
