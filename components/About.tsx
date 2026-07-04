import Image from "next/image";
import Reveal from "./Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal className="relative mx-auto w-full max-w-sm">
          <div className="glass overflow-hidden rounded-3xl p-3">
            <Image
              src={about.photo}
              alt="Kushal Naik"
              width={640}
              height={640}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-4 py-1.5 font-mono text-xs text-accent backdrop-blur-sm">
            PR Head @ CSI VESIT
          </span>
        </div>

        <div>
          <h2 data-reveal className="text-4xl font-medium tracking-tight text-white md:text-5xl">
            {about.headline.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="font-serif italic text-accent">
              {about.headline.split(" ").slice(-3).join(" ")}
            </span>
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} data-reveal className="mt-6 text-[16px] leading-relaxed text-gray-400">
              {p}
            </p>
          ))}

          <div data-reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
                <p className="font-mono text-2xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
