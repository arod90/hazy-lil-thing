"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useCart } from "./CartProvider";
import CanImage from "./CanImage";
import {
  CAN_SIZE_ML,
  FLAVORS,
  PACKS,
  getFlavor,
  money,
  unitPrice,
  type Pack,
} from "@/lib/products";
import { Check, Lock, Truck, ShieldCheck } from "./icons";
import { Circle } from "./Mark";

type AddState = "idle" | "adding" | "added";
const ADD_LABEL: Record<AddState, string> = {
  idle: "Add to Cart",
  adding: "Adding…",
  added: "Added — nice",
};

export default function Shop() {
  const { activeFlavorId, setActiveFlavor, addToCart, openDrawer } = useCart();
  const [packId, setPackId] = useState("12");
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [addState, setAddState] = useState<AddState>("idle");
  const timers = useRef<number[]>([]);

  const flavor = getFlavor(activeFlavorId);
  const current: Pack = PACKS.find((p) => p.id === packId) ?? PACKS[1];
  const unit = unitPrice(current, subscribe);
  const lineTotal = unit * qty;
  const fullPrice = current.price * qty;
  const saved = Math.max(0, fullPrice - lineTotal);

  const handleAdd = () => {
    addToCart(flavor, current, qty, subscribe);
    timers.current.forEach(clearTimeout);
    setAddState("adding");
    timers.current = [
      window.setTimeout(() => setAddState("added"), 480),
      window.setTimeout(() => {
        setAddState("idle");
        openDrawer();
      }, 1150),
    ];
  };

  return (
    <section
      id="shop"
      className="shop-section"
      style={
        {
          "--accent": flavor.accent,
          "--accent2": flavor.accent2,
        } as CSSProperties
      }
    >
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title reveal">
            Build Your <Circle>Order.</Circle>
          </h2>
        </div>

        <div className="shop-grid">
          <div className="shop-visual reveal">
            <span className="badge">{flavor.badge}</span>
            <div className="shop-can-swap" key={flavor.id}>
              <CanImage flavor={flavor} sizes="(max-width: 940px) 60vw, 320px" />
            </div>
          </div>

          <div className="buy reveal">
            <div className="field-label">Flavor</div>
            <div className="flavor-swatches">
              {FLAVORS.map((f) => {
                const on = f.id === activeFlavorId;
                return (
                  <button
                    key={f.id}
                    className={`swatch ${on ? "on" : ""}`}
                    style={{ "--accent": f.accent } as CSSProperties}
                    onClick={() => setActiveFlavor(f.id)}
                    aria-pressed={on}
                  >
                    <span className="sw-dot" />
                    <span className="sw-name">{f.name.replace(" Lil’ Thing", "")}</span>
                  </button>
                );
              })}
            </div>

            <h2>{flavor.name}</h2>
            <p className="lede">{flavor.tasting}</p>

            <div className="price-row">
              <span className="price">{money(unit)}</span>
              <span className="price-note">
                {money(unit / current.cans)} / can · {current.cans}× {CAN_SIZE_ML}ml
                {saved > 0 && <b className="save-inline"> · you save {money(saved)}</b>}
              </span>
            </div>

            <div className="field-label">Choose your pack</div>
            <div className="packs">
              {PACKS.map((p) => {
                const u = unitPrice(p, subscribe);
                const selected = p.id === packId;
                return (
                  <button
                    key={p.id}
                    className={selected ? "pack selected" : "pack"}
                    onClick={() => setPackId(p.id)}
                    aria-pressed={selected}
                  >
                    {p.save && <span className="save">{p.save}</span>}
                    <div className="pk">{p.label}</div>
                    <div className="pp">{money(u)}</div>
                    <div className="pc">{money(u / p.cans)}/can</div>
                    <Check className="tick" />
                  </button>
                );
              })}
            </div>

            <div className="row2">
              <div>
                <div className="field-label">Quantity</div>
                <div className="stepper">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="decrease">
                    −
                  </button>
                  <span className="q">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="increase">
                    +
                  </button>
                </div>
              </div>
              <div>
                <div className="field-label">Save 15% · ships monthly</div>
                <button
                  className={subscribe ? "subtoggle on" : "subtoggle"}
                  onClick={() => setSubscribe((s) => !s)}
                  aria-pressed={subscribe}
                >
                  <span className="switch">
                    <span className="knob" />
                  </span>
                  <span className="st">
                    Subscribe &amp; <b>save</b>
                  </span>
                </button>
              </div>
            </div>

            <button className={`btn primary add-btn ${addState}`} onClick={handleAdd}>
              {addState === "adding" && <span className="spin" />}
              {addState === "added" && <Check width={17} height={17} />}
              <span>
                {addState === "idle" ? `${ADD_LABEL.idle} · ${money(lineTotal)}` : ADD_LABEL[addState]}
              </span>
            </button>

            <div className="trust-row">
              <span>
                <Lock width={15} height={15} /> Secure checkout
              </span>
              <span>
                <Truck width={15} height={15} /> Ships cold in 2 days
              </span>
              <span>
                <ShieldCheck width={15} height={15} /> Free ship over $50
              </span>
            </div>

            <div className="price-annot">
              <b>Prototype:</b> prices are placeholders in <code>lib/products.ts</code>.
              Try promo <code>HAZY10</code> at checkout.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
