"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
}

interface DeepDive {
  overview: string;
  highlights: { title: string; desc: string; }[];
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
    deepDive?: DeepDive;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0F1117] overflow-hidden flex flex-col p-6 md:p-8 hover:border-white/20 transition-all shadow-lg">
      <div className="mb-4 text-xs font-mono text-[#06B6D4] uppercase tracking-wider font-bold">
        {project.tag}
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
        {project.title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {project.stack.map(tech => (
          <span key={tech} className="bg-slate-900/60 border border-white/10 text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-slate-300 font-medium mb-6 leading-relaxed text-sm md:text-base">
          {project.description}
        </p>
        <ul className="space-y-4">
          {project.points.map((point, i) => (
            <li key={i} className="flex items-start text-sm text-slate-400">
              <span className="text-[#10B981] mr-3 mt-0.5 font-bold">›</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.deepDive && (
        <div className="mt-4 mb-6">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-mono text-[#06B6D4] hover:text-white transition-colors py-2"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {isExpanded ? "CLOSE ARCHITECTURE DEEP DIVE" : "VIEW ARCHITECTURE DEEP DIVE"}
          </button>
          
          {isExpanded && (
            <div className="mt-6 p-6 rounded-xl bg-black/40 border border-white/5 space-y-6 animate-in slide-in-from-top-2 fade-in duration-300">
              <div>
                <h4 className="text-white font-bold mb-2">Overview</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{project.deepDive.overview}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-bold">Core Architectural Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.deepDive.highlights.map((highlight, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[#10B981] font-mono text-xs font-bold mb-2 uppercase">{highlight.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed">{highlight.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-6 mt-auto pt-6 border-t border-white/10">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="inline-flex items-center text-sm font-mono font-bold text-white hover:text-[#10B981] transition-colors uppercase tracking-wider"
          >
            [{link.label}]
          </a>
        ))}
      </div>
    </div>
  );
}
