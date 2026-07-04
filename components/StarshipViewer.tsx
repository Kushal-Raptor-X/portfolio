"use client";

import { useEffect, useState } from "react";

/** Kushal's own Blender starship, converted from the original .obj. */
export default function StarshipViewer({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  if (!ready) return <div className={className} aria-hidden="true" />;

  return (
    <model-viewer
      src="/models/starship.glb"
      alt="Original starship 3D model by Kushal Naik"
      camera-controls
      auto-rotate
      rotation-per-second="24deg"
      interaction-prompt="none"
      disable-zoom
      shadow-intensity="0"
      exposure="1.1"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
