import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsOverview from "@/components/sections/SkillsOverview";
import QuickContact from "@/components/sections/QuickContact";
import PersonSchema from "@/components/seo/PersonSchema";

export default function Home() {
  return (
    <>
      <PersonSchema />
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <QuickContact />
    </>
  );
}
