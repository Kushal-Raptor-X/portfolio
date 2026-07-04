"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import StarshipViewer from "./StarshipViewer";

function TypingRoles({ roles }: { roles: string[] }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIdx];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = full.slice(0, text.length + 1);
          setText(next);
          if (next === full) setTimeout(() => setDeleting(true), 1600);
        } else {
          const next = full.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx, roles]);

  return (
    <span className="font-mono text-neon-cyan">
      {text}
      <span className="cursor-blink">_</span>
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask w-full overflow-hidden">
      <div className="marquee-track flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={i}
            className="shrink-0 px-8 font-mono text-sm text-gray-500 transition-colors hover:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero({
  roles,
  badge,
  ctaText,
  marquee,
  showStarship,
  showMarquee,
}: {
  roles: string[];
  badge: string;
  ctaText: string;
  marquee: string[];
  showStarship: boolean;
  showMarquee: boolean;
}) {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      <MeshGradient
        colors={["#aaa7d7", "#3b2a8d"]}
        distortion={1}
        swirl={1}
        grainMixer={0.29}
        grainOverlay={0.5}
        speed={1.06}
        scale={0.88}
        offsetX={-0.08}
        className="absolute inset-0 h-full w-full"
      />
      {/* keep text readable + settle into page canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0a0a0d]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-32 pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="animate-on-load load-delay-100 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-medium text-gray-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-term" />
              {badge}
            </span>

            <h1 className="animate-on-load load-delay-200 mt-8 font-mono text-5xl font-bold tracking-tight text-white md:text-7xl">
              Kushal Naik
            </h1>

            <p className="animate-on-load load-delay-300 mt-4 h-8 text-xl md:text-2xl">
              <TypingRoles roles={roles} />
            </p>

            <p className="animate-on-load load-delay-400 mt-6 max-w-xl text-[16px] leading-relaxed text-gray-300">
              I build AI-agent backends, real-time systems and Flutter apps — and
              render the 3D art that makes them memorable. B.Tech AI &amp; Data
              Science @ VESIT, Mumbai.
            </p>

            <div className="animate-on-load load-delay-500 mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                {ctaText}
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-[#1F1F22] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2A2A2D]"
              >
                See projects
              </a>
            </div>
          </div>

          {showStarship && (
            <div className="animate-on-load load-delay-600 relative h-72 md:h-96">
              <StarshipViewer />
              <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-gray-500">
                my own model — drag to orbit
              </p>
            </div>
          )}
        </div>
      </div>

      {showMarquee && (
        <div className="relative z-10 pb-8">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
            builds with
          </p>
          <Marquee items={marquee} />
        </div>
      )}
    </section>
  );
}
