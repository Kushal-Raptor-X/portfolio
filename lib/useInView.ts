"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the ref'd element is on-screen — used to gate expensive shaders. */
export function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return inView;
}
