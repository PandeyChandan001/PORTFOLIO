"use client";

import { Project } from "@/types";
import { useEffect } from "react";
import { X } from "lucide-react";

interface AstModalProps {
  project: Project;
  onClose: () => void;
}

export function AstModal({ project, onClose }: AstModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-6">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border bg-background shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{project.title}</h2>
          <button 
            onClick={onClose}
            className="rounded-md p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-foreground leading-relaxed">{project.fullContent}</p>
          </div>
          
          <div className="rounded-lg border bg-muted/30 p-6 flex items-center justify-center min-h-[200px]">
            <p className="text-sm text-muted-foreground font-mono">
              [ AST Visualization Canvas Placeholder ]
            </p>
          </div>

          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm hover:underline text-foreground">
                GitHub Repo
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm hover:underline text-foreground">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
