"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TimelineLine({ count }: { count: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;

    const tween = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
      }
    );

    const dotTriggers = dotRefs.current.map((dot) => {
      if (!dot) return null;
      return ScrollTrigger.create({
        trigger: dot,
        start: "top 75%",
        onEnter: () => dot.classList.add("timeline-dot-lit"),
        onLeaveBack: () => dot.classList.remove("timeline-dot-lit"),
      });
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      dotTriggers.forEach((t) => t?.kill());
    };
  }, [count]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-y-0 left-0 w-px">
      <div className="absolute inset-0 bg-white/10" />
      <div ref={lineRef} className="absolute inset-x-0 top-0 h-full origin-top bg-accent shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="timeline-dot absolute -left-[4.5px] h-2.5 w-2.5 rounded-full bg-white/20 transition-all duration-300"
          style={{ top: `calc(${(i / count) * 100}% + 6px)` }}
        />
      ))}
    </div>
  );
}
