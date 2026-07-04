import Reveal from "./Reveal";
import ParallaxGlow from "./ParallaxGlow";
import TimelineLine from "./TimelineLine";
import { timeline, achievements } from "@/lib/content";

export default function Timeline() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 md:py-32">
      <ParallaxGlow className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_15%,rgba(139,124,246,0.10),transparent_70%),radial-gradient(ellipse_45%_35%_at_10%_85%,rgba(59,42,141,0.16),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            // experience
          </p>
          <h2 data-reveal className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl">
            The <span className="font-serif italic text-accent">timeline.</span>
          </h2>
        </Reveal>

        <Reveal className="relative mt-14 max-w-3xl" stagger={0.12}>
          <TimelineLine count={timeline.length} />
          {timeline.map((entry) => (
            <div key={entry.id} data-reveal className="relative pb-12 pl-8 last:pb-0">
              <p className="font-mono text-xs tracking-wider text-gray-500">{entry.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{entry.role}</h3>
              <p className="mt-0.5 text-sm font-medium text-accent/80">{entry.org}</p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">{entry.description}</p>
              {entry.highlights.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-20">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
            achievements.log
          </p>
          <div data-reveal className="mt-6 flex flex-wrap gap-3">
            {achievements.map((a) => (
              <span
                key={a.id}
                className="glass rounded-full px-4 py-2 text-sm text-gray-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                {a.text}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
