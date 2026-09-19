import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Selected Work</h2>
        <p className="mt-4 text-muted-foreground">Architectural deep dives and production case studies.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
