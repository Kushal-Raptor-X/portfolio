import Reveal from "./Reveal";
import type { Social } from "@/lib/content";

export default function Footer({ socials }: { socials: Social[] }) {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/5 pt-28 pb-10">
      <video
        src="/media/wash-dark.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0d] via-black/70 to-[#0a0a0d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <h2 data-reveal className="text-4xl font-medium tracking-tight text-white md:text-6xl">
            Got a role or a <span className="font-serif italic text-term">brief?</span>
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-xl text-[16px] text-gray-400">
            Open to internships, freelance builds and art commissions.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:kushal.coder@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Email me
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-[#1F1F22] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2A2A2D]"
            >
              Book a call
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div data-reveal className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-sm text-gray-300 transition-colors hover:border-term/40 hover:text-term"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center justify-center gap-3 border-t border-white/5 pt-8 text-center font-mono text-xs text-gray-600 md:flex-row">
          <span>© 2026 Kushal Naik</span>
          <span className="hidden md:inline">·</span>
          <span>
            built with Next.js + <span className="text-gray-400">Claude</span>
          </span>
          <span className="hidden md:inline">·</span>
          <span className="text-term/50">&gt; end of transmission_</span>
        </div>
      </div>
    </footer>
  );
}
