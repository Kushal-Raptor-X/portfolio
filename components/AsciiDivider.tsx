/** Thin ASCII divider — terminal green, monospace, deliberately quiet. */
export default function AsciiDivider({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-7xl items-center gap-4 overflow-hidden px-6 py-2 font-mono text-[10px] tracking-[0.35em] text-term/40 select-none"
    >
      <span className="whitespace-nowrap">{"─".repeat(24)}</span>
      {label && <span className="shrink-0 text-term/60">[ {label} ]</span>}
      <span className="w-full overflow-hidden whitespace-nowrap">{"─".repeat(160)}</span>
    </div>
  );
}
