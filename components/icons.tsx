import type { SVGProps } from "react";
import {
  ShoppingCart,
  ArrowRight as LArrowRight,
  ChevronLeft as LChevronLeft,
  Check as LCheck,
  X,
  Star as LStar,
  Lock as LLock,
  Truck as LTruck,
  ShieldCheck as LShieldCheck,
  Beer,
} from "lucide-react";

// Real icons (lucide). Re-exported under the names the app already uses.
export const CartIcon = ShoppingCart;
export const ArrowRight = LArrowRight;
export const ChevronLeft = LChevronLeft;
export const Check = LCheck;
export const Close = X;
export const Star = LStar;
export const Lock = LLock;
export const Truck = LTruck;
export const ShieldCheck = LShieldCheck;
export const CanGlyph = Beer;

// Brand marks — lucide dropped its brand icons, so these stay custom.
const brand = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const Instagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...brand(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTok = (p: SVGProps<SVGSVGElement>) => (
  <svg {...brand(p)}>
    <path d="M15 4c.4 2.6 2 4.2 4.5 4.5v3c-1.7 0-3.2-.5-4.5-1.4V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.5 2.3V4H15Z" />
  </svg>
);

export const XMark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...brand(p)}>
    <path d="M4 4l7.2 9.3L4.4 20H6l6-6.4L16.8 20H20l-7.5-9.7L19.6 4H18l-5.6 6L7.6 4H4Z" fill="currentColor" stroke="none" />
  </svg>
);
