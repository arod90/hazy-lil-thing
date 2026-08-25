"use client";

import { useEffect } from "react";

/**
 * Drives `.reveal` (fade/rise) and `.mark` (hand-drawn annotations).
 *
 * Annotations copy the damngoodbrands technique: on view, measure the SVG's real
 * pixel box, rewrite the viewBox to that box (1:1, no vector-effect), regenerate
 * the reference path scaled to fit, then trace stroke-dashoffset from the true
 * path length → 0. That keeps the stroke uniform and the dash math exact, so it
 * draws like a pen from a dot to the full stroke.
 */

// reference paths + their authoring viewBox dimensions
const CIRCLE = {
  d: "M 89.308 22.764 C 127.586 22.764, 156.589 27.170, 156.589 39.794 C 156.589 52.417, 127.586 68.638, 89.308 68.638 C 51.030 68.638, 18.646 55.138, 18.646 42.514 C 18.646 29.890, 51.030 23.724, 89.308 23.724 C 127.586 23.724, 159.169 32.181, 159.169 44.805 C 159.169 57.429, 127.586 65.924, 89.308 65.924 C 51.030 65.924, 20.251 52.606, 20.251 39.982 C 20.251 27.359, 51.030 20.986, 89.308 20.986",
  w: 178.6,
  h: 85.7,
  dur: 0.95,
};
const UNDERLINE = {
  d: "M 9.473 14.750 L 205.497 9.336 L 0.575 4.654 L 199.360 4.017",
  w: 197,
  h: 20,
  dur: 0.6,
};
const STRIKE = { d: "M 4 12 C 60 8, 140 14, 196 9", w: 200, h: 20, dur: 0.5 };

function scalePath(d: string, sx: number, sy: number): string {
  let i = 0;
  // every number in these M/C/L paths is part of an (x, y) pair
  return d.replace(/-?\d*\.?\d+(?:e-?\d+)?/g, (n) =>
    (parseFloat(n) * (i++ % 2 === 0 ? sx : sy)).toFixed(2)
  );
}

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const introTimer = window.setTimeout(() => root.classList.add("intro-done"), 3600);

    const showMarks = () =>
      root.querySelectorAll<SVGPathElement>(".mark-svg path").forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });

    if (reduce || typeof IntersectionObserver === "undefined") {
      showMarks();
      return () => window.clearTimeout(introTimer);
    }

    root.classList.add("reveal-ready");

    const traceMark = (el: Element) => {
      const isHero = !!el.closest(".hero");
      const svg = el.querySelector("svg.mark-svg");
      const path = svg?.querySelector("path");
      if (!svg || !path) return;
      const ref = el.classList.contains("mark-c")
        ? CIRCLE
        : el.classList.contains("mark-u")
        ? UNDERLINE
        : STRIKE;
      const box = svg.getBoundingClientRect();
      const W = Math.max(1, box.width);
      const H = Math.max(1, box.height);
      // rewrite viewBox to the real pixel box + regenerate the path to fit it
      svg.setAttribute("viewBox", `0 0 ${W.toFixed(1)} ${H.toFixed(1)}`);
      path.setAttribute("d", scalePath(ref.d, W / ref.w, H / ref.h));
      let len = 0;
      try {
        len = path.getTotalLength();
      } catch {
        len = 0;
      }
      if (!len) {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        return;
      }
      path.style.transition = "none";
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      void path.getBoundingClientRect(); // commit the hidden start
      // hero circle is the finale of the load choreography; section marks draw
      // just after their copy has settled
      const delay = isHero ? 2000 : 400;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          path.style.transition = `stroke-dashoffset ${ref.dur}s ease ${delay}ms`;
          path.style.strokeDashoffset = "0";
        })
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.classList.contains("mark")) traceMark(el);
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );

    const scan = () =>
      root
        .querySelectorAll(".reveal:not(.in), .mark:not(.in)")
        .forEach((el) => io.observe(el));
    scan();
    const t = window.setTimeout(scan, 300);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        root.classList.toggle("scrolled", window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.clearTimeout(t);
      window.clearTimeout(introTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
