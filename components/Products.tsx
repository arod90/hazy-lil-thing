"use client";

import type { CSSProperties } from "react";
import { useCart } from "./CartProvider";
import CanImage from "./CanImage";
import { FLAVORS } from "@/lib/products";
import { ArrowRight } from "./icons";

export default function Products() {
  const { activeFlavorId, setActiveFlavor } = useCart();
  const idx = Math.max(0, FLAVORS.findIndex((f) => f.id === activeFlavorId));
  const flavor = FLAVORS[idx];

  const go = (dir: number) =>
    setActiveFlavor(FLAVORS[(idx + dir + FLAVORS.length) % FLAVORS.length].id);
  const toShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const num = String(idx + 1).padStart(2, "0");

  return (
    <section
      id="flavors"
      className="carousel"
      style={{ "--accent": flavor.accent, "--accent2": flavor.accent2 } as CSSProperties}
    >
      <div className="wrap car-head">
        <span className="car-index">Product N0.{num}</span>
        <span className="car-flavor">{flavor.name}</span>
      </div>

      <div className="car-stage">
        <button className="car-arrow" onClick={() => go(-1)} aria-label="Previous flavor">
          <ArrowRight className="flip" />
        </button>

        <div className="car-can" key={flavor.id}>
          <span className="car-circle" />
          <CanImage flavor={flavor} sizes="(max-width: 720px) 66vw, 320px" />
          <span className="car-style">{flavor.style}</span>
        </div>

        <button className="car-arrow" onClick={() => go(1)} aria-label="Next flavor">
          <ArrowRight />
        </button>
      </div>

      <div className="car-foot">
        <div className="car-dots">
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              className={`car-dot ${i === idx ? "on" : ""}`}
              onClick={() => setActiveFlavor(f.id)}
              aria-label={f.name}
            />
          ))}
        </div>
        <button className="btn primary car-shop" onClick={toShop}>
          <span>Shop Now</span>
        </button>
      </div>
    </section>
  );
}
