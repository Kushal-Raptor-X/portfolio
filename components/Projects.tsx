"use client";

import { useRef, useState } from "react";
import { Warp, Dithering } from "@paper-design/shaders-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { useInView } from "@/lib/useInView";
import type { Project } from "@/lib/content";

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-accent-2 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9L9 3M9 3H4M9 3v5" />
      </svg>
    </a>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const [hovered, setHovered] = useState(false);
  const links = project.links ?? {};

  return (
    <TiltCard className={featured ? "md:col-span-2" : ""}>
      <article
        data-reveal
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass group relative overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/30"
      >
        {hovered && (
          <Dithering
            colorBack="#1c1640"
            colorFront="#a78bfa"
            shape="warp"
            type="2x2"
            size={2.5}
            speed={1}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
          />
        )}

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-medium text-accent">
              {project.badge}
            </span>
            <span className="text-xs text-gray-500">{project.event}</span>
          </div>

          <h3 className="mt-5 font-mono text-2xl font-semibold text-white">{project.title}</h3>

          <p className="mt-3 text-[15px] leading-relaxed text-gray-400">{project.description}</p>

          {project.myRole && (
            <p className="mt-3 text-[15px] leading-relaxed text-gray-400">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-2">my part → </span>
              {project.myRole}
            </p>
          )}

          {project.highlights?.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-gray-500">
                  <span className="mt-0.5 shrink-0 font-mono text-accent-2/60">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-gray-400">
                {s}
              </span>
            ))}
          </div>

          {(links.live || links.github || links.video || project.linkNote) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {links.live && <LinkPill href={links.live}>Live</LinkPill>}
              {links.github && <LinkPill href={links.github}>GitHub</LinkPill>}
              {links.video && <LinkPill href={links.video}>Demo video</LinkPill>}
              {project.linkNote && (
                <span className="text-xs italic text-gray-600">{project.linkNote}</span>
              )}
            </div>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_10%,rgba(139,124,246,0.14),transparent_70%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(59,42,141,0.25),transparent_70%)]" />
      {inView && (
        <Warp
          colors={["#0a0a0d", "#8b7cf6", "#0a0a0d", "#22d3ee"]}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          speed={0.6}
          scale={1}
          className="absolute inset-0 h-full w-full opacity-25"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0d] via-black/60 to-[#0a0a0d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
            // projects
          </p>
          <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-white md:text-5xl">
            Built under pressure, <span className="font-serif italic text-accent-2">judged on stage.</span>
          </h2>
          <p data-reveal className="mt-4 max-w-2xl text-[16px] text-gray-400">
            Four hackathon finishes and a real-client field project — every card below
            was demoed to judges or piloted with real users.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.1}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} featured={p.featured} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
