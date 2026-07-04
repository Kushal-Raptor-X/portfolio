"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { GrainGradient } from "@paper-design/shaders-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { useInView } from "@/lib/useInView";
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
        width={item.width}
        height={item.height}
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
    <TiltCard className="mb-5 break-inside-avoid">
    <figure data-reveal className="glass gallery-card overflow-hidden rounded-2xl p-2">
      {item.type === "video" ? (
        <GalleryVideo item={item} />
      ) : (
        <Image
          src={item.file}
          alt={item.title}
          width={item.width}
          height={item.height}
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-full rounded-xl"
        />
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
          <p className="mt-1.5 inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] text-accent">
            {"compilationLink" in item && item.compilationLink ? (
              <a
                href={item.compilationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                ★ {item.badge}
                {"timestamp" in item && item.timestamp ? ` @ ${item.timestamp}` : ""} ↗
              </a>
            ) : (
              <>★ {item.badge}</>
            )}
          </p>
        )}
      </figcaption>
    </figure>
    </TiltCard>
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
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section ref={sectionRef} id="craft" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_10%,rgba(139,124,246,0.16),transparent_70%),radial-gradient(ellipse_55%_40%_at_90%_70%,rgba(34,211,238,0.08),transparent_70%)]" />
      {inView && (
        <GrainGradient
          colors={["#4c3aad", "#8b7cf6", "#22d3ee", "#3b2a8d", "#1c1640"]}
          colorBack="#000000"
          softness={0.5}
          intensity={0.4}
          noise={0.2}
          shape="corners"
          speed={0.6}
          scale={1}
          className="absolute inset-0 h-full w-full opacity-25"
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            // craft lab
          </p>
          <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-white md:text-5xl">
            The other half is <span className="font-serif italic text-accent">rendered.</span>
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
              <TiltCard key={f.id}>
                <div data-reveal className="glass rounded-2xl p-5">
                  <h3 className="font-mono text-sm font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p>
                </div>
              </TiltCard>
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
            <div data-reveal className="glass rounded-3xl border-accent/20 p-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
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
