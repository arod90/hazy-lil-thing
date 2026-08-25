import ParallaxCan from "./ParallaxCan";
import { ArrowRight } from "./icons";
import { Circle } from "./Mark";

const BASE = 1.45; // hero copy staggers in as the intro iris lifts

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-fade" style={{ animationDelay: `${BASE}s` }}>
            Small-batch hazy IPA · canned fresh
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span className="word-i" style={{ animationDelay: `${BASE + 0.05}s` }}>
                The Hazy IPA That
              </span>
            </span>
            <span className="line">
              <span className="word-i" style={{ animationDelay: `${BASE + 0.14}s` }}>
                Makes Other Beer
              </span>
            </span>
            <span className="line-open">
              <span className="word-o" style={{ animationDelay: `${BASE + 0.23}s` }}>
                <Circle>Insecure.</Circle>
              </span>
            </span>
          </h1>

          <p className="hero-sub hero-fade" style={{ animationDelay: `${BASE + 0.34}s` }}>
            Obnoxiously juicy, proudly cloudy, and brewed in batches small enough to
            feel personal. Crack one and let people assume you have taste.
          </p>

          <div className="hero-cta hero-fade" style={{ animationDelay: `${BASE + 0.42}s` }}>
            <a className="btn primary" href="#shop">
              <span>Grab a Pack</span>
              <ArrowRight />
            </a>
            <a className="btn ghost" href="#flavors">
              <span>Meet the Lineup</span>
            </a>
          </div>
        </div>

        <div className="can-stage">
          <div className="ghost-word">HAZY</div>
          <ParallaxCan flavorId="hazy" />
        </div>
      </div>
    </header>
  );
}
