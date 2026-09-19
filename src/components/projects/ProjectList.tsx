import { projects } from "@/data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  return (
    <section id="innings" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12 text-center sm:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Flagship Innings</h2>
        <p className="mt-2 text-muted-foreground font-mono text-sm uppercase tracking-wider text-[#10B981]">
          // Featured Projects
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
