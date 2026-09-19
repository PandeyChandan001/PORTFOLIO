import { Hero } from "@/components/hero/Hero";
import { ProjectList } from "@/components/projects/ProjectList";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProjectList />
    </div>
  );
}
