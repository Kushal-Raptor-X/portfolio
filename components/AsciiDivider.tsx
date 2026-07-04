/** Quiet section divider — hairline gradient with a small mono label. */
export default function AsciiDivider({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2 select-none"
    >
      <span className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-white/15" />
      {label && (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.35em] text-gray-600">
          {label}
        </span>
      )}
      <span className="h-px w-full bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}
