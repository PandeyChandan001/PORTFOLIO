export type TechStackItem = "React" | "Next.js" | "TypeScript" | "Tailwind CSS" | "Node.js" | "PostgreSQL" | "GraphQL" | "WebGL";

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullContent: string;
  techStack: TechStackItem[];
  githubUrl?: string;
  liveUrl?: string;
  year: number;
}
