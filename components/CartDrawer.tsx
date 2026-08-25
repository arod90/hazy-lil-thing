"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { useCart } from "./CartProvider";
import {
  money,
  FREE_SHIP_THRESHOLD,
  SHIPPING,
  getFlavor,
  type ShippingId,
} from "@/lib/products";
import { CartIcon, Close, ChevronLeft, Check, Lock, Truck } from "./icons";

type Form = {
  email: string;
  first: string;
  last: string;
  address: string;
  city: string;
  region: string;
  zip: string;
  country: string;
  card: string;
  exp: string;
  cvc: string;
  cardName: string;
};

const EMPTY_FORM: Form = {
  email: "",
  first: "",
  last: "",
  address: "",
  city: "",
  region: "",
  zip: "",
  country: "United States",
  card: "",
  exp: "",
  cvc: "",
  cardName: "",
};

const STEP_INDEX: Record<string, number> = {
  cart: 0,
  information: 1,
  payment: 2,
  confirmation: 3,
};

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    promo,
    discount,
    shippingId,
    shippingCost,
    total,
    freeShipReached,
    freeShipRemaining,
    freeShipPct,
    drawerOpen,
    step,
    orderNo,
    closeDrawer,
    goStep,
    changeItem,
    removeItem,
    applyPromo,
    clearPromo,
    setShipping,
    placeOrder,
    resetOrder,
  } = useCart();

  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [processing, setProcessing] = useState(false);

  const set = (k: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (k === "card") v = formatCard(v);
    else if (k === "exp") v = formatExp(v);
    else if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    else if (k === "zip") v = v.slice(0, 10);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const submitPromo = () => {
    const res = applyPromo(promoInput);
    setPromoMsg({ ok: res.ok, text: res.message });
    if (res.ok) setPromoInput("");
  };

  const validateInfo = () => {
    const req: (keyof Form)[] = ["email", "first", "last", "address", "city", "zip"];
    const er: Partial<Record<keyof Form, boolean>> = {};
    req.forEach((k) => {
      if (!form[k].trim()) er[k] = true;
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = true;
    setErrors(er);
    if (Object.keys(er).length === 0) goStep("payment");
  };

  const validatePayment = () => {
    const er: Partial<Record<keyof Form, boolean>> = {};
    if (form.card.replace(/\s/g, "").length < 16) er.card = true;
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) er.exp = true;
    if (form.cvc.length < 3) er.cvc = true;
    if (!form.cardName.trim()) er.cardName = true;
    setErrors(er);
    if (Object.keys(er).length > 0) return;
    setProcessing(true);
    window.setTimeout(() => {
      setProcessing(false);
      placeOrder();
    }, 1400);
  };

  const finish = () => {
    resetOrder();
    setForm(EMPTY_FORM);
    setErrors({});
    setPromoMsg(null);
    setPromoInput("");
  };

  const idx = STEP_INDEX[step] ?? 0;
  const showSteps = step !== "confirmation";

  return (
    <>
      <div
        className={drawerOpen ? "backdrop open" : "backdrop"}
        onClick={step === "confirmation" ? undefined : closeDrawer}
        aria-hidden
      />
      <aside
        className={`drawer ${drawerOpen ? "open" : ""} ${step === "confirmation" ? "wide" : ""}`}
        aria-label="Cart and checkout"
      >
        {/* header */}
        <div className="drawer-head">
          {step !== "cart" && step !== "confirmation" ? (
            <button
              className="dh-back"
              onClick={() => goStep(step === "payment" ? "information" : "cart")}
              aria-label="Back"
            >
              <ChevronLeft />
            </button>
          ) : (
            <span className="dh">
              {step === "confirmation" ? "Order confirmed" : `Your Cart (${count})`}
            </span>
          )}
          {step !== "cart" && step !== "confirmation" && (
            <span className="dh">{step === "information" ? "Shipping details" : "Payment"}</span>
          )}
          <button className="x" onClick={step === "confirmation" ? finish : closeDrawer} aria-label="close">
            <Close />
          </button>
        </div>

        {/* step indicator */}
        {showSteps && (
          <div className="steps">
            {["Cart", "Details", "Payment"].map((label, i) => (
              <div key={label} className={`stp ${i === idx ? "on" : ""} ${i < idx ? "done" : ""}`}>
                <span className="stp-dot">{i < idx ? <Check width={12} height={12} /> : i + 1}</span>
                <span className="stp-l">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ============ CART STEP ============ */}
        {step === "cart" && (
          <>
            <div className="ship-bar">
              <div className="sm">
                {freeShipReached ? (
                  <b>You unlocked free shipping. Nice.</b>
                ) : items.length ? (
                  <>
                    You&apos;re <b>{money(freeShipRemaining)}</b> from free shipping.
                  </>
                ) : (
                  <>Free shipping over {money(FREE_SHIP_THRESHOLD)}.</>
                )}
              </div>
              <div className="ship-track">
                <div className="ship-fill" style={{ width: `${freeShipPct}%` }} />
              </div>
            </div>

            <div className="drawer-body">
              {items.length ? (
                items.map((it) => {
                  const fl = getFlavor(it.flavorId);
                  return (
                  <div className="line" key={it.key}>
                    <div className="thumb">
                      <Image
                        src={fl.image}
                        alt={fl.name}
                        width={fl.width}
                        height={fl.height}
                        className="thumb-can"
                        sizes="64px"
                      />
                    </div>
                    <div className="li">
                      <div className="ln">{it.flavorName}</div>
                      <div className="lp">
                        {it.packLabel}
                        {it.sub ? " · Subscription" : ""} · {money(it.price)} ea
                      </div>
                      <div className="mini">
                        <button onClick={() => changeItem(it.key, -1)} aria-label="decrease">−</button>
                        <span className="mq">{it.qty}</span>
                        <button onClick={() => changeItem(it.key, 1)} aria-label="increase">+</button>
                      </div>
                    </div>
                    <div className="lt">
                      <div className="lprice">{money(it.price * it.qty)}</div>
                      <button className="rm" onClick={() => removeItem(it.key)}>Remove</button>
                    </div>
                  </div>
                  );
                })
              ) : (
                <div className="empty">
                  <CartIcon />
                  <div className="empty-h">Your cart&apos;s bone dry.</div>
                  <div className="empty-p">Go grab a pack — future you is thirsty.</div>
                  <button className="btn ghost" onClick={closeDrawer}>
                    <span>Back to the beer</span>
                  </button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="drawer-foot">
                <div className="promo">
                  {promo ? (
                    <div className="promo-applied">
                      <span>
                        <Check width={14} height={14} /> <b>{promo.code}</b> · {promo.label}
                      </span>
                      <button onClick={() => { clearPromo(); setPromoMsg(null); }}>Remove</button>
                    </div>
                  ) : (
                    <>
                      <div className="promo-row">
                        <input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code"
                          aria-label="Promo code"
                          onKeyDown={(e) => e.key === "Enter" && submitPromo()}
                        />
                        <button onClick={submitPromo}>Apply</button>
                      </div>
                      {promoMsg && (
                        <div className={`promo-msg ${promoMsg.ok ? "ok" : "err"}`}>{promoMsg.text}</div>
                      )}
                      <div className="promo-hint">Try <code>HAZY10</code>, <code>STAYHAZY</code> or <code>SEASONAL</code>.</div>
                    </>
                  )}
                </div>

                <SummaryRows
                  subtotal={subtotal}
                  discount={discount}
                  promoCode={promo?.code}
                  shippingLabel="Calculated next step"
                />

                <button className="btn primary checkout" onClick={() => goStep("information")}>
                  <span>Checkout · {money(subtotal - discount)}</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ============ INFORMATION STEP ============ */}
        {step === "information" && (
          <>
            <div className="drawer-body form-body">
              <div className="form-sec">Contact</div>
              <Field label="Email" name="email" value={form.email} onChange={set("email")} err={errors.email} type="email" placeholder="you@email.com" />

              <div className="form-sec">Ship to</div>
              <div className="grid-2">
                <Field label="First name" name="first" value={form.first} onChange={set("first")} err={errors.first} />
                <Field label="Last name" name="last" value={form.last} onChange={set("last")} err={errors.last} />
              </div>
              <Field label="Address" name="address" value={form.address} onChange={set("address")} err={errors.address} placeholder="123 Hop Street" />
              <div className="grid-2">
                <Field label="City" name="city" value={form.city} onChange={set("city")} err={errors.city} />
                <Field label="State / Region" name="region" value={form.region} onChange={set("region")} err={errors.region} />
              </div>
              <div className="grid-2">
                <Field label="ZIP / Postcode" name="zip" value={form.zip} onChange={set("zip")} err={errors.zip} />
                <div className="fld">
                  <label>Country</label>
                  <select value={form.country} onChange={set("country")}>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>

              <div className="form-sec">Shipping method</div>
              <div className="ship-opts">
                {(Object.keys(SHIPPING) as ShippingId[]).map((id) => {
                  const s = SHIPPING[id];
                  const free = id === "standard" && freeShipReached;
                  return (
                    <button
                      key={id}
                      className={`ship-opt ${shippingId === id ? "on" : ""}`}
                      onClick={() => setShipping(id)}
                    >
                      <span className="radio" />
                      <span className="so-main">
                        <b>{s.label}</b>
                        <span className="so-eta">{s.eta}</span>
                      </span>
                      <span className="so-price">{free ? "Free" : money(s.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="drawer-foot">
              <SummaryRows subtotal={subtotal} discount={discount} promoCode={promo?.code} shipping={shippingCost} total={total} />
              <button className="btn primary checkout" onClick={validateInfo}>
                <span>Continue to payment</span>
              </button>
            </div>
          </>
        )}

        {/* ============ PAYMENT STEP ============ */}
        {step === "payment" && (
          <>
            <div className="drawer-body form-body">
              <div className="demo-banner">
                <Lock width={15} height={15} />
                <span>
                  <b>Prototype — do not enter real card details.</b> Use test number{" "}
                  <code>4242 4242 4242 4242</code>, any future date &amp; CVC.
                </span>
              </div>

              <Field label="Card number" name="card" value={form.card} onChange={set("card")} err={errors.card} placeholder="4242 4242 4242 4242" inputMode="numeric" />
              <div className="grid-2">
                <Field label="Expiry" name="exp" value={form.exp} onChange={set("exp")} err={errors.exp} placeholder="MM/YY" inputMode="numeric" />
                <Field label="CVC" name="cvc" value={form.cvc} onChange={set("cvc")} err={errors.cvc} placeholder="123" inputMode="numeric" />
              </div>
              <Field label="Name on card" name="cardName" value={form.cardName} onChange={set("cardName")} err={errors.cardName} />

              <div className="pay-secure">
                <Lock width={13} height={13} /> Encrypted &amp; secure · we never store card data
              </div>
            </div>

            <div className="drawer-foot">
              <SummaryRows subtotal={subtotal} discount={discount} promoCode={promo?.code} shipping={shippingCost} total={total} />
              <button className={`btn primary checkout ${processing ? "adding" : ""}`} onClick={validatePayment} disabled={processing}>
                {processing && <span className="spin" />}
                <span>{processing ? "Processing…" : `Pay ${money(total)}`}</span>
              </button>
            </div>
          </>
        )}

        {/* ============ CONFIRMATION STEP ============ */}
        {step === "confirmation" && (
          <div className="confirm">
            <div className="confirm-burst">
              <span className="ring" />
              <span className="ring r2" />
              <span className="tick-badge"><Check width={34} height={34} /></span>
            </div>
            <h3>You&apos;re all set.</h3>
            <p className="confirm-sub">
              Order <b>{orderNo}</b> is in. A receipt is on its way to{" "}
              <b>{form.email || "your inbox"}</b>.
            </p>

            <div className="confirm-card">
              <div className="cc-row"><span>Items</span><span>{count}</span></div>
              <div className="cc-row"><span>Shipping</span><span>{SHIPPING[shippingId].label} · {SHIPPING[shippingId].eta}</span></div>
              <div className="cc-row total"><span>Total paid</span><span>{money(total)}</span></div>
            </div>

            <div className="confirm-next">
              <div className="cn"><Truck width={17} height={17} /><span>We can it cold &amp; ship within 24h.</span></div>
              <div className="cn"><Check width={17} height={17} /><span>Tracking hits your email the moment it leaves.</span></div>
            </div>

            <p className="demo-note">
              <b>Prototype checkout.</b> No payment was taken. Wire this flow to Stripe
              Checkout or a Shopify cart and it&apos;s production-ready.
            </p>
            <button className="btn primary checkout" onClick={finish}>
              <span>Keep shopping</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ---------- small building blocks ---------- */

function Field({
  label,
  name,
  value,
  onChange,
  err,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  err?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "email";
}) {
  return (
    <div className="fld">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className={err ? "invalid" : ""}
        autoComplete="off"
      />
    </div>
  );
}

function SummaryRows({
  subtotal,
  discount,
  promoCode,
  shipping,
  shippingLabel,
  total,
}: {
  subtotal: number;
  discount: number;
  promoCode?: string;
  shipping?: number;
  shippingLabel?: string;
  total?: number;
}) {
  return (
    <div className="summary">
      <div className="sum-row">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="sum-row disc">
          <span>Discount {promoCode ? `(${promoCode})` : ""}</span>
          <span>−{money(discount)}</span>
        </div>
      )}
      <div className="sum-row">
        <span>Shipping</span>
        <span>
          {shippingLabel
            ? shippingLabel
            : shipping === 0
            ? "Free"
            : money(shipping ?? 0)}
        </span>
      </div>
      {typeof total === "number" && (
        <div className="sum-row grand">
          <span>Total</span>
          <span>{money(total)}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- formatters ---------- */

function formatCard(v: string): string {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExp(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}
