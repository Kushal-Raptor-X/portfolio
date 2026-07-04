"use client";

import { useRef, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";
import Reveal from "./Reveal";
import type { GalleryItem } from "@/lib/content";

function GalleryVideo({ item }: { item: GalleryItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={toggle}>
      <video
        ref={ref}
        src={item.file}
        poster={item.poster}
        preload="none"
        loop
        playsInline
        className="w-full rounded-xl"
      />
      {!playing && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform hover:scale-110">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          </span>
        </span>
      )}
    </div>
  );
}

function GalleryCard({ item, categories }: { item: GalleryItem; categories: Record<string, string> }) {
  return (
    <figure data-reveal className="glass mb-5 break-inside-avoid overflow-hidden rounded-2xl p-2">
      {item.type === "video" ? (
        <GalleryVideo item={item} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- masonry layout needs natural aspect ratios; files are local + lazy
        <img src={item.file} alt={item.title} loading="lazy" className="w-full rounded-xl" />
      )}
      <figcaption className="px-2 pb-1.5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-white">{item.title}</p>
          <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-500">
            {categories[item.category] ?? item.category}
          </span>
        </div>
        {"client" in item && item.client && (
          <p className="mt-1 font-mono text-xs text-gray-500">{item.client}</p>
        )}
        {"badge" in item && item.badge && (
          <p className="mt-1.5 inline-block rounded-full border border-neon-magenta/30 bg-neon-magenta/10 px-2.5 py-0.5 text-[11px] text-neon-magenta">
            ★ {item.badge}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export default function Craft({
  gallery,
  categories,
  facets,
  game,
  profiles,
  commissions,
  commissionsOpen,
}: {
  gallery: GalleryItem[];
  categories: Record<string, string>;
  facets: { id: string; visible: boolean; title: string; description: string }[];
  game: { visible: boolean; title: string; description: string; url: string };
  profiles: { id: string; label: string; url: string }[];
  commissions: { headline: string; text: string; ctaText: string; ctaUrl: string };
  commissionsOpen: boolean;
}) {
  return (
    <section id="craft" className="relative overflow-hidden py-24 md:py-32">
      <GrainGradient
        colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff", "#33cc99"]}
        colorBack="#000000"
        softness={0.5}
        intensity={0.5}
        noise={0.25}
        shape="corners"
        speed={1}
        scale={1}
        className="absolute inset-0 h-full w-full opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0d] via-transparent to-[#0a0a0d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-neon-magenta">
            // craft lab
          </p>
          <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-white md:text-5xl">
            The other half is <span className="font-serif italic text-neon-magenta">rendered.</span>
          </h2>
          <p data-reveal className="mt-4 max-w-2xl text-[16px] text-gray-400">
            Client brand work, render-challenge entries and personal studies — all made
            in Blender, DaVinci Resolve and Figma.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {facets
            .filter((f) => f.visible)
            .map((f) => (
              <div key={f.id} data-reveal className="glass rounded-2xl p-5">
                <h3 className="font-mono text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p>
              </div>
            ))}
        </Reveal>

        <Reveal className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3" stagger={0.05}>
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} categories={categories} />
          ))}
        </Reveal>

        <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
          {game.visible && (
            <a
              data-reveal
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex flex-col justify-between rounded-3xl p-7 transition-colors hover:border-white/25"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
                  playable
                </span>
                <h3 className="mt-3 font-mono text-xl font-semibold text-white">{game.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{game.description}</p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform group-hover:scale-105">
                Play on itch.io
              </span>
            </a>
          )}

          {commissionsOpen && (
            <div data-reveal className="glass rounded-3xl border-neon-magenta/20 p-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 px-3 py-1 font-mono text-xs text-neon-magenta">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-magenta" />
                {commissions.headline}
              </span>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-400">{commissions.text}</p>
              <a
                href={commissions.ctaUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                {commissions.ctaText}
              </a>
            </div>
          )}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <span data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
            full portfolios →
          </span>
          {profiles.map((p) => (
            <a
              key={p.id}
              data-reveal
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {p.label} ↗
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
