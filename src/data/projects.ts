import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "ast-visualizer",
    title: "AST Architecture Visualizer",
    description: "An interactive node-based explorer for deep JavaScript/TypeScript abstract syntax trees.",
    fullContent: "The AST Visualizer was built to map out complex monolithic codebases. By parsing TypeScript files locally and projecting their relationships onto a force-directed graph, we dramatically reduced the onboarding time for new engineers on the core platform team.",
    techStack: ["React", "TypeScript", "WebGL", "Node.js"],
    githubUrl: "https://github.com/example/ast-visualizer",
    year: 2024,
  },
  {
    slug: "command-center",
    title: "Terminal Command Center",
    description: "A keyboard-first navigation paradigm for web applications replacing traditional sidebars.",
    fullContent: "Re-thinking navigation by introducing a MacOS Spotlight-like interface directly in the browser. Employs a custom trie-based search index for sub-millisecond route resolution.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/command-center",
    year: 2023,
  },
  {
    slug: "distributed-cache",
    title: "Edge Distributed Cache",
    description: "Low-latency distributed key-value store optimized for V8 isolate edge workers.",
    fullContent: "Designed a multi-region caching layer to synchronize state across serverless edge nodes without relying on centralized Redis clusters. Achieved 99th percentile reads under 12ms globally.",
    techStack: ["Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/example/edge-cache",
    year: 2022,
  },
];
