import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaItchIo,
  FaXTwitter,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa6";
import { SiArtstation, SiLeetcode, SiHackerrank } from "react-icons/si";
import Reveal from "./Reveal";
import type { Social } from "@/lib/content";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
  artstation: SiArtstation,
  itchio: FaItchIo,
  x: FaXTwitter,
  leetcode: SiLeetcode,
  hackerrank: SiHackerrank,
  instagram: FaInstagram,
  discord: FaDiscord,
};

function SocialButton({ s }: { s: Social }) {
  const Icon = ICONS[s.id];
  return (
    <a
      href={s.url}
      target={s.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(167,139,250,0.5)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent/0 via-accent/15 to-accent-2/0 transition-transform duration-500 group-hover:translate-x-0" />
      {Icon && (
        <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-white/15 to-white/0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]">
          <Icon className="h-3.5 w-3.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
        </span>
      )}
      <span className="relative z-10">{s.label}</span>
    </a>
  );
}

export default function Footer({ socials }: { socials: Social[] }) {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/5 pt-28 pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(59,42,141,0.35),transparent_75%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <h2 data-reveal className="text-4xl font-medium tracking-tight text-white md:text-6xl">
            Got a role or a <span className="font-serif italic text-accent">brief?</span>
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
              <SocialButton key={s.id} s={s} />
            ))}
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center justify-center gap-3 border-t border-white/5 pt-8 text-center font-mono text-xs text-gray-600 md:flex-row">
          <span>© 2026 Kushal Naik</span>
          <span className="hidden md:inline">·</span>
          <span className="text-accent-2/50">&gt; end of transmission_</span>
        </div>
      </div>
    </footer>
  );
}
