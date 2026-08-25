// ============================================================
// Product, flavor + pricing config.
// PRICES ARE PLACEHOLDERS chosen so the cart math reads cleanly —
// swap for your real pack pricing. Can art lives in /public (trimmed
// to content: hazy-can.png / festive-can.png / scary-can.png).
// ============================================================

export type Flavor = {
  id: string;
  name: string; // "Hazy Lil' Thing"
  tag: string; // short kicker: "The Original", "Winter Drop"
  style: string; // "Double Dry-Hopped Hazy IPA"
  tasting: string; // one-line tasting note
  abv: string; // "6.8%"
  ibu: string; // "45"
  accent: string; // primary accent (hex)
  accent2: string; // secondary accent (hex)
  image: string;
  width: number;
  height: number;
  seasonal: boolean;
  badge: string; // "Flagship" | "Winter — Limited"
  soldPct: number; // 0..100, drives the "batch remaining" bar (placeholder urgency)
};

export const FLAVORS: Flavor[] = [
  {
    id: "hazy",
    name: "Hazy Lil’ Thing",
    tag: "The Original",
    style: "Double Dry-Hopped Hazy IPA",
    tasting: "Ripe mango and passionfruit, a pillow for a body, and just enough pine to remember it’s beer.",
    abv: "6.8%",
    ibu: "45",
    accent: "#f15726",
    accent2: "#c89a4e",
    image: "/hazy-can.png",
    width: 507,
    height: 1217,
    seasonal: false,
    badge: "The Flagship",
    soldPct: 62,
  },
  {
    id: "festive",
    name: "Festive Lil’ Thing",
    tag: "Winter Drop",
    style: "Spiced Winter Hazy IPA",
    tasting: "Cranberry, orange peel and a wink of cinnamon. Basically a hug that happens to get you tipsy.",
    abv: "8.4%",
    ibu: "40",
    accent: "#2e9e57",
    accent2: "#e0392e",
    image: "/festive-can.png",
    width: 617,
    height: 1509,
    seasonal: true,
    badge: "Winter — Limited",
    soldPct: 84,
  },
  {
    id: "scary",
    name: "Scary Lil’ Thing",
    tag: "Halloween Drop",
    style: "Blood-Orange Pumpkin Hazy",
    tasting: "Blood orange and roasted pumpkin. Spooky smooth and gone faster than your candy.",
    abv: "6.66%",
    ibu: "50",
    accent: "#8b3fe0",
    accent2: "#f15726",
    image: "/scary-can.png",
    width: 601,
    height: 1465,
    seasonal: true,
    badge: "Halloween — Limited",
    soldPct: 91,
  },
];

export const FLAVOR_MAP: Record<string, Flavor> = Object.fromEntries(
  FLAVORS.map((f) => [f.id, f])
);

export function getFlavor(id: string): Flavor {
  return FLAVOR_MAP[id] ?? FLAVORS[0];
}

export type Pack = {
  id: string;
  label: string;
  cans: number;
  price: number;
  save: string | null;
};

export const PACKS: Pack[] = [
  { id: "4", label: "4-Pack", cans: 4, price: 16, save: null },
  { id: "12", label: "12-Pack", cans: 12, price: 42, save: "Save 12%" },
  { id: "24", label: "24-Pack", cans: 24, price: 76, save: "Save 21%" },
];

export const PACK_MAP: Record<string, Pack> = Object.fromEntries(
  PACKS.map((p) => [p.id, p])
);

export const SUBSCRIBE_DISCOUNT = 0.15; // 15% off, ongoing
export const FREE_SHIP_THRESHOLD = 50;
export const CAN_SIZE_ML = 473;

// Mock promo codes for the prototype checkout. Case-insensitive.
export const PROMOS: Record<string, { pct: number; label: string }> = {
  HAZY10: { pct: 0.1, label: "10% off — welcome" },
  STAYHAZY: { pct: 0.15, label: "15% off — insiders" },
  SEASONAL: { pct: 0.2, label: "20% off — seasonal drop" },
};

export const SHIPPING = {
  standard: { id: "standard", label: "Standard", eta: "3–5 days", price: 6 },
  express: { id: "express", label: "Express — ships cold", eta: "2 days", price: 14 },
} as const;

export type ShippingId = keyof typeof SHIPPING;

export function money(n: number): string {
  return "$" + (Math.round(n * 100) / 100).toFixed(2);
}

/** Per-pack price, subscription discount applied. */
export function unitPrice(pack: Pack, subscribe: boolean): number {
  const p = subscribe ? pack.price * (1 - SUBSCRIBE_DISCOUNT) : pack.price;
  return Math.round(p * 100) / 100;
}

/** Cheapest per-can price across packs (for "from $x/can" copy). */
export function fromPerCan(): number {
  return Math.min(...PACKS.map((p) => p.price / p.cans));
}
