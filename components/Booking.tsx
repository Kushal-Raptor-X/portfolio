import Reveal from "./Reveal";

export default function Booking({ calLink }: { calLink: string }) {
  return (
    <section id="booking" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p data-reveal className="text-center font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
            // booking
          </p>
          <h2 data-reveal className="mt-4 text-center text-4xl font-medium tracking-tight text-white md:text-5xl">
            Fifteen minutes, <span className="font-serif italic text-neon-cyan">no agenda needed.</span>
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-xl text-center text-[16px] text-gray-400">
            Hiring for an internship, scoping a commission, or just want to talk
            builds — grab a slot.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          {calLink ? (
            <div data-reveal className="glass overflow-hidden rounded-3xl">
              <iframe
                src={`https://cal.com/${calLink}?theme=dark&layout=month_view`}
                className="h-[640px] w-full"
                title="Book a call with Kushal"
              />
            </div>
          ) : (
            <div data-reveal className="glass relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-10 text-center">
              <video
                src="/media/card-b.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="relative z-10">
                <p className="font-mono text-sm text-gray-400">
                  calendar link coming online soon —
                </p>
                <p className="mt-2 text-xl font-medium text-white">
                  until then, email works instantly.
                </p>
                <a
                  href="mailto:kushal.coder@gmail.com?subject=Call%20request"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  kushal.coder@gmail.com
                </a>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
