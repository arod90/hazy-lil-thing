import Image from "next/image";

// Pure-CSS circular "iris" intro, Buck's-style: concentric orange/red rings
// bloom from center with a logo core, then the core expands to swallow the
// screen and cross-fade into the site. No JS → no hydration flash, SSR-safe.
// Hidden entirely under prefers-reduced-motion (see globals.css).

export default function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-bg" />
      <div className="intro-ring ring-1" />
      <div className="intro-ring ring-2" />
      <div className="intro-core">
        <Image
          src="/logo-cream.png"
          alt=""
          width={1825}
          height={1369}
          className="intro-logo"
          priority
        />
      </div>
    </div>
  );
}
