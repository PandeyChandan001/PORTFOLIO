import { Hero } from "@/components/hero/Hero";
import { ProjectList } from "@/components/projects/ProjectList";
import { AlgorithmicLab } from "@/components/algorithms/AlgorithmicLab";
import { TechnicalArsenal } from "@/components/skills/TechnicalArsenal";
import { Education } from "@/components/education/Education";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProjectList />
      <AlgorithmicLab />
      <TechnicalArsenal />
      <Education />
    </div>
  );
}
