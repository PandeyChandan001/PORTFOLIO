"use client";

import { Project } from "@/types";
import { useState } from "react";
import { AstModal } from "./AstModal";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="group relative cursor-pointer rounded-xl border bg-background p-6 transition-colors hover:bg-muted/50"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-foreground">
            {project.title}
          </h3>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AstModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
