import type * as React from "react";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        "auto-rotate-delay"?: number | string;
        "rotation-per-second"?: string;
        "interaction-prompt"?: string;
        "disable-zoom"?: boolean | string;
        "disable-pan"?: boolean | string;
        "shadow-intensity"?: number | string;
        "environment-image"?: string;
        exposure?: number | string;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        loading?: string;
        reveal?: string;
        poster?: string;
      };
    }
  }
}

export {};
