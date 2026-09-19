"use client";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectProps {
  project: {
    slug: string;
    title: string;
    tag: string;
    stack: string[];
    description: string;
    points: string[];
    links: ProjectLink[];
  };
}

export function ProjectCard({ project }: ProjectProps) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-card overflow-hidden flex flex-col p-6 md:p-8 hover:border-white/20 transition-colors">
      <div className="mb-4 text-xs font-mono text-[#06B6D4] uppercase tracking-wider">{project.tag}</div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map(tech => (
          <span key={tech} className="rounded bg-muted px-2 py-1 text-xs font-mono text-muted-foreground border border-white/5">
            {tech}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-foreground font-medium mb-4">{project.description}</p>
        <ul className="space-y-3">
          {project.points.map((point, i) => (
            <li key={i} className="flex items-start text-sm text-muted-foreground">
              <span className="text-[#10B981] mr-2 mt-0.5">›</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-white/10">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="inline-flex items-center text-sm font-medium text-foreground hover:text-[#10B981] transition-colors"
          >
            [{link.label}]
          </a>
        ))}
      </div>
    </div>
  );
}
