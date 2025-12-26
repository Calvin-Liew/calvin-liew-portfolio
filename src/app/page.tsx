import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsOverview from "@/components/sections/SkillsOverview";
import QuickContact from "@/components/sections/QuickContact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <QuickContact />
    </>
  );
}
