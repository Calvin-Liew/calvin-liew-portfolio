import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsOverview from "@/components/sections/SkillsOverview";
import QuickContact from "@/components/sections/QuickContact";
import PersonSchema from "@/components/seo/PersonSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

export const metadata = {
  alternates: {
    canonical: 'https://calvinliew.space',
  },
};

export default function Home() {
  return (
    <>
      <PersonSchema />
      <WebSiteSchema />
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <QuickContact />
    </>
  );
}
