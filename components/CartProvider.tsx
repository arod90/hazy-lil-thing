"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  FREE_SHIP_THRESHOLD,
  PROMOS,
  SHIPPING,
  unitPrice,
  type Flavor,
  type Pack,
  type ShippingId,
} from "@/lib/products";

export type CartItem = {
  key: string; // flavorId:packId:sub
  flavorId: string;
  flavorName: string;
  accent: string;
  packId: string;
  packLabel: string;
  cans: number;
  price: number; // per-pack unit price at time added
  qty: number;
  sub: boolean;
};

export type CheckoutStep = "cart" | "information" | "payment" | "confirmation";

export type PromoState = { code: string; pct: number; label: string } | null;

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  promo: PromoState;
  discount: number;
  shippingId: ShippingId;
  shippingCost: number;
  total: number;
  freeShipRemaining: number;
  freeShipReached: boolean;
  freeShipPct: number;

  drawerOpen: boolean;
  step: CheckoutStep;
  orderNo: string | null;

  activeFlavorId: string;
  setActiveFlavor: (id: string) => void;

  openDrawer: () => void;
  closeDrawer: () => void;
  goStep: (s: CheckoutStep) => void;
  placeOrder: () => void;
  resetOrder: () => void;

  addToCart: (flavor: Flavor, pack: Pack, qty: number, sub: boolean) => void;
  changeItem: (key: string, delta: number) => void;
  removeItem: (key: string) => void;

  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  setShipping: (id: ShippingId) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

function orderId(): string {
  // browser-only; fine in a client component
  const n = Math.floor(100000 + Math.random() * 899999);
  return `HLT-${n}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [promo, setPromo] = useState<PromoState>(null);
  const [shippingId, setShippingId] = useState<ShippingId>("standard");
  const [activeFlavorId, setActiveFlavorId] = useState("hazy");
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const addToCart = useCallback(
    (flavor: Flavor, pack: Pack, qty: number, sub: boolean) => {
      const price = unitPrice(pack, sub);
      const key = `${flavor.id}:${pack.id}${sub ? ":sub" : ""}`;
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        }
        return [
          ...prev,
          {
            key,
            flavorId: flavor.id,
            flavorName: flavor.name,
            accent: flavor.accent,
            packId: pack.id,
            packLabel: pack.label,
            cans: pack.cans,
            price,
            qty,
            sub,
          },
        ];
      });
    },
    []
  );

  const changeItem = useCallback((key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { ok: false, message: "Enter a code." };
    const hit = PROMOS[clean];
    if (!hit) return { ok: false, message: "That code isn’t valid." };
    setPromo({ code: clean, pct: hit.pct, label: hit.label });
    return { ok: true, message: hit.label };
  }, []);

  const clearPromo = useCallback(() => setPromo(null), []);
  const setShipping = useCallback((id: ShippingId) => setShippingId(id), []);

  const openDrawer = useCallback(() => {
    setStep("cart");
    setDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const goStep = useCallback((s: CheckoutStep) => setStep(s), []);
  const setActiveFlavor = useCallback((id: string) => setActiveFlavorId(id), []);

  const placeOrder = useCallback(() => {
    setOrderNo(orderId());
    setStep("confirmation");
  }, []);

  const resetOrder = useCallback(() => {
    setItems([]);
    setPromo(null);
    setOrderNo(null);
    setStep("cart");
    setDrawerOpen(false);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = promo ? Math.round(subtotal * promo.pct * 100) / 100 : 0;
    const netSubtotal = Math.max(0, subtotal - discount);
    const freeShipReached = items.length > 0 && subtotal >= FREE_SHIP_THRESHOLD;
    const ship = SHIPPING[shippingId];
    const shippingCost =
      items.length === 0
        ? 0
        : shippingId === "standard" && freeShipReached
        ? 0
        : ship.price;
    const total = Math.round((netSubtotal + shippingCost) * 100) / 100;
    const freeShipRemaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
    const freeShipPct = items.length
      ? Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)
      : 0;

    return {
      items,
      count,
      subtotal,
      promo,
      discount,
      shippingId,
      shippingCost,
      total,
      freeShipRemaining,
      freeShipReached,
      freeShipPct,
      drawerOpen,
      step,
      orderNo,
      activeFlavorId,
      setActiveFlavor,
      openDrawer,
      closeDrawer,
      goStep,
      placeOrder,
      resetOrder,
      addToCart,
      changeItem,
      removeItem,
      applyPromo,
      clearPromo,
      setShipping,
    };
  }, [
    items,
    promo,
    shippingId,
    drawerOpen,
    step,
    orderNo,
    activeFlavorId,
    setActiveFlavor,
    openDrawer,
    closeDrawer,
    goStep,
    placeOrder,
    resetOrder,
    addToCart,
    changeItem,
    removeItem,
    applyPromo,
    clearPromo,
    setShipping,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
