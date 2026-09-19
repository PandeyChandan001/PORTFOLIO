"use client";

import { useState } from "react";

type Tab = "architecture" | "benchmarks" | "tradeoffs";

interface ProjectProps {
  project: {
    slug: string;
    title: string;
    role: string;
    stack: string[];
    architecture: string;
    benchmarks: string;
    tradeoffs: string;
    type: string;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [activeTab, setActiveTab] = useState<Tab>("architecture");

  return (
    <div className="w-full rounded-xl border border-white/10 bg-card overflow-hidden flex flex-col md:flex-row">
      {/* Left Details */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
        <div className="mb-2 text-xs font-mono text-[#06B6D4]">{project.role}</div>
        <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map(tech => (
            <span key={tech} className="rounded bg-muted px-2 py-1 text-xs font-mono text-muted-foreground border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 border-b border-white/10 mb-6">
          {(["architecture", "benchmarks", "tradeoffs"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium capitalize transition-colors border-b-2 ${
                activeTab === tab 
                  ? "border-[#10B981] text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground leading-relaxed min-h-[120px]">
          {project[activeTab]}
        </div>
      </div>

      {/* Right Interactive Element */}
      <div className="w-full md:w-1/2 bg-muted/30 p-6 flex items-center justify-center min-h-[300px]">
        {project.type === "systems" ? (
          <SystemsInteractiveWidget />
        ) : (
          <AIInteractiveWidget />
        )}
      </div>
    </div>
  );
}

function SystemsInteractiveWidget() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#08090C] p-4 font-mono text-xs">
      <div className="text-muted-foreground mb-4">[ SIMULATED CACHE SPIKE ]</div>
      <div className="relative h-32 w-full flex items-end gap-1">
        {[40, 45, 30, 80, 95, 88, 92, 90, 85, 87].map((val, i) => (
          <div key={i} className="flex-1 bg-[#10B981]/80 hover:bg-[#10B981] transition-colors" style={{ height: `${val}%` }} />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
        <span>T=0 (LRU Collapse)</span>
        <span>T=N (SIEVE Recovery)</span>
      </div>
    </div>
  );
}

function AIInteractiveWidget() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#08090C] font-mono text-[10px] flex overflow-hidden">
      <div className="w-1/2 border-r border-white/10 p-3 text-muted-foreground bg-muted/20">
        <div>RAW_TOKENS</div>
        <div className="mt-2 text-white/40">
          "Led team of 5 to build...<br/>
          Proficient in C++, Java...<br/>
          Reduced latency by 40%..."
        </div>
      </div>
      <div className="w-1/2 p-3 text-[#10B981]">
        <div>SCHEMA_OUT (ZOD)</div>
        <pre className="mt-2 text-[9px] overflow-hidden">
{`{
  "skills": ["C++", "Java"],
  "metrics": [
    "latency: -40%"
  ],
  "valid": true
}`}
        </pre>
      </div>
    </div>
  );
}
