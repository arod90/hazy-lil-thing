import type { Metadata, Viewport } from "next";
import { Anton, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import Intro from "@/components/Intro";
import ScrollReveal from "@/components/ScrollReveal";

const head = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-head",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hazy Lil’ Thing — Double Dry-Hopped Hazy IPA",
  description:
    "Obnoxiously juicy, proudly cloudy, double dry-hopped and canned fresh. Shop the flagship and the seasonal drops.",
};

export const viewport: Viewport = {
  themeColor: "#100B06",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${head.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.mark-svg path{stroke-dasharray:none;stroke-dashoffset:0}`}</style>
        </noscript>
        <Intro />
        <CartProvider>
          <Nav />
          {children}
          <CartDrawer />
        </CartProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
