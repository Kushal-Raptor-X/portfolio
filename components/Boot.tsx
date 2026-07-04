"use client";

import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

const NAME = "KUSHAL NAIK";
const BOOT_MS = 1450;

/**
 * ASCII boot overlay: name types out over a dithering shader, auto-dismisses
 * in <1.5s, click to skip. Shows once per browser session.
 */
export default function Boot() {
  const [phase, setPhase] = useState<"hidden" | "typing" | "fading">("hidden");
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    sessionStorage.setItem("booted", "1");
    setPhase("typing");

    const typeTimer = setInterval(() => {
      setTyped((n) => (n >= NAME.length ? n : n + 1));
    }, 55);
    const fadeTimer = setTimeout(() => setPhase("fading"), BOOT_MS);
    return () => {
      clearInterval(typeTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("hidden"), 450);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      onClick={() => setPhase("fading")}
      className={`fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#0a0a0d] transition-opacity duration-400 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Dithering
        colorBack="#301c2a"
        colorFront="#56ae6c"
        shape="warp"
        type="4x4"
        size={2.5}
        speed={1}
        className="absolute inset-0 h-full w-full opacity-25"
      />
      <div className="relative z-10 font-mono text-term">
        <p className="mb-3 text-xs text-term/60">&gt; boot sequence initiated_</p>
        <p className="text-3xl font-bold tracking-widest md:text-5xl">
          {NAME.slice(0, typed)}
          <span className="cursor-blink">█</span>
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-widest text-term/40">
          click to skip
        </p>
      </div>
    </div>
  );
}
