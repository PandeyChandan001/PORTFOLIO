import { HeroBroadcast } from "@/components/hero/HeroBroadcast";
import { ProjectList } from "@/components/projects/ProjectList";
import { CSFundamentals } from "@/components/algorithms/CSFundamentals";
import { TechnicalArsenal } from "@/components/skills/TechnicalArsenal";
import { Education } from "@/components/education/Education";
import { HeaderBanner } from "@/components/nav/HeaderBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <div className="pt-8 pb-4">
        <HeaderBanner />
      </div>
      <HeroBroadcast />
      <ProjectList />
      <CSFundamentals />
      <TechnicalArsenal />
      <Education />
    </div>
  );
}
