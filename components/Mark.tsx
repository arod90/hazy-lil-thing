import type { ReactNode } from "react";

/**
 * Hand-drawn marker annotations that draw themselves on scroll, using the
 * exact circle + underline paths from the reference site (preserveAspectRatio
 * "none" so they stretch to fit whatever word they wrap). `.mark` gets `.in`
 * from ScrollReveal → the stroke draws in ~0.8s like a pen stroke.
 */

// double-loop scribble ellipse (reference path)
const CIRCLE_D =
  "M 89.308 22.764 C 127.586 22.764, 156.589 27.170, 156.589 39.794 C 156.589 52.417, 127.586 68.638, 89.308 68.638 C 51.030 68.638, 18.646 55.138, 18.646 42.514 C 18.646 29.890, 51.030 23.724, 89.308 23.724 C 127.586 23.724, 159.169 32.181, 159.169 44.805 C 159.169 57.429, 127.586 65.924, 89.308 65.924 C 51.030 65.924, 20.251 52.606, 20.251 39.982 C 20.251 27.359, 51.030 20.986, 89.308 20.986";

// zig-zag scribble underline (reference path)
const UNDERLINE_D =
  "M 9.473 14.750 L 205.497 9.336 L 0.575 4.654 L 199.360 4.017";

export function Circle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mark mark-c ${className}`}>
      <span className="mark-t">{children}</span>
      <svg
        className="mark-svg"
        viewBox="0 0 178.6 85.7"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={CIRCLE_D} />
      </svg>
    </span>
  );
}

export function Underline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mark mark-u ${className}`}>
      <span className="mark-t">{children}</span>
      <svg
        className="mark-svg"
        viewBox="0 0 197 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={UNDERLINE_D} />
      </svg>
    </span>
  );
}

export function Strike({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mark mark-s ${className}`}>
      <span className="mark-t">{children}</span>
      <svg className="mark-svg" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
        <path d="M4 12 C60 8 140 14 196 9" />
      </svg>
    </span>
  );
}
