"use client";

import { useEffect, useRef } from "react";
import CanImage from "./CanImage";

/**
 * Wraps the can in a scroll-driven parallax layer. The wrapper translates on
 * scroll (via a CSS var updated in rAF); the inner .can keeps its ambient float,
 * so the two transforms compose cleanly.
 */
export default function ParallaxCan({
  intensity = 64,
  flavorId = "hazy",
}: {
  intensity?: number;
  flavorId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (!vh || vh < 2) return; // not laid out yet
      const rect = el.getBoundingClientRect();
      // -1 (below viewport) .. 0 (centered) .. 1 (above viewport)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const py = Math.max(-intensity, Math.min(intensity, -progress * intensity));
      el.style.setProperty("--py", `${py.toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div ref={ref} className="can-parallax">
      <CanImage flavorId={flavorId} priority sizes="(max-width: 940px) 68vw, 480px" />
    </div>
  );
}
