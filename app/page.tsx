import Boot from "@/components/Boot";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Craft from "@/components/Craft";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import AsciiDivider from "@/components/AsciiDivider";
import {
  config,
  projects,
  gallery,
  galleryCategories,
  craft,
  visibleSocials,
} from "@/lib/content";

export default function Home() {
  const { sections, features } = config;
  const divider = (label: string) =>
    features.asciiDividers ? <AsciiDivider label={label} /> : null;

  return (
    <main className="flex-1">
      {sections.boot && features.bootAnimation && <Boot />}
      <Nav />

      {sections.hero && (
        <Hero
          roles={config.hero.roles}
          badge={config.hero.badge}
          ctaText={config.hero.ctaText}
          marquee={config.marquee}
          showStarship={features.starshipModel}
          showMarquee={features.techMarquee}
        />
      )}

      {sections.about && (
        <>
          {divider("about")}
          <About />
        </>
      )}

      {sections.projects && (
        <>
          {divider("projects")}
          <Projects projects={projects} />
        </>
      )}

      {sections.experience && (
        <>
          {divider("experience")}
          <Timeline />
        </>
      )}

      {sections.craft && (
        <>
          {divider("craft_lab")}
          <Craft
            gallery={gallery}
            categories={galleryCategories}
            facets={craft.facets}
            game={craft.game}
            profiles={craft.profiles}
            commissions={craft.commissions}
            commissionsOpen={features.commissionsOpen}
          />
        </>
      )}

      {sections.booking && (
        <>
          {divider("booking")}
          <Booking calLink={config.booking.calLink} />
        </>
      )}

      {sections.contact && <Footer socials={visibleSocials} />}
    </main>
  );
}
