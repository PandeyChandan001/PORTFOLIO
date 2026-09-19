import { projects } from "@/data/content";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Flagship Projects</h2>
        <p className="mt-2 text-muted-foreground font-mono text-sm uppercase tracking-wider text-[#06B6D4]">
          // Proof of Craft
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
