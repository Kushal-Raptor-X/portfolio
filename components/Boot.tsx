"use client";

import { useEffect, useState } from "react";
import { Dithering } from "@paper-design/shaders-react";

const NAME = "KUSHAL NAIK";
const MIN_MS = 1900; // give the shader + typing a real moment on screen
const MAX_MS = 4200; // never hold the visitor hostage on a slow network

/**
 * Splash screen: name types out over a dithered shader wash and dismisses as
 * soon as the page has loaded (min ~2s, max ~4.2s). Click to skip.
 */
export default function Boot() {
  const [phase, setPhase] = useState<"typing" | "fading" | "hidden">("typing");
  const [typed, setTyped] = useState(0);
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    const typeTimer = setInterval(() => {
      setTyped((n) => (n >= NAME.length ? n : n + 1));
    }, 70);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(96, p + Math.random() * 9));
    }, 140);

    const start = performance.now();
    const dismiss = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setPhase((p) => (p === "typing" ? "fading" : p)), 200);
      }, wait);
    };
    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });
    const maxTimer = setTimeout(dismiss, MAX_MS);

    return () => {
      clearInterval(typeTimer);
      clearInterval(progressTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("hidden"), 550);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      onClick={() => setPhase("fading")}
      className={`fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-[#0a0a0d] transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Dithering
        colorBack="#0a0a0d"
        colorFront="#8b7cf6"
        shape="warp"
        type="4x4"
        size={2.5}
        speed={1.1}
        className="absolute inset-0 h-full w-full opacity-40"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(59,42,141,0.5),transparent_75%)]" />

      <div className="relative z-10 text-center font-mono">
        <p className="mb-3 text-xs tracking-widest text-accent-2/70">&gt; initializing portfolio_</p>
        <p className="text-3xl font-bold tracking-widest text-white md:text-5xl">
          {NAME.slice(0, typed)}
          <span className="cursor-blink text-accent">█</span>
        </p>
        <div className="mx-auto mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-widest text-gray-500">click to skip</p>
      </div>
    </div>
  );
}
