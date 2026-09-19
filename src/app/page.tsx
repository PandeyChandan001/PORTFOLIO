import { HeroBroadcast } from "@/components/hero/HeroBroadcast";
import { ProjectList } from "@/components/projects/ProjectList";
import { CSFundamentals } from "@/components/algorithms/CSFundamentals";
import { TechnicalArsenal } from "@/components/skills/TechnicalArsenal";
import { Education } from "@/components/education/Education";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroBroadcast />
      <ProjectList />
      <CSFundamentals />
      <TechnicalArsenal />
      <Education />
    </div>
  );
}
