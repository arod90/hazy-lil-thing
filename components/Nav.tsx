"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { CartIcon, Close } from "./icons";

const LINKS = [
  { href: "#flavors", label: "Flavors" },
  { href: "#shop", label: "Shop" },
  { href: "#beer", label: "The Beer" },
  { href: "#reviews", label: "Reviews" },
];

export default function Nav() {
  const { count, openDrawer } = useCart();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <nav className="bar">
      <div className="wrap nav-in">
        <a className="brand" href="#top" onClick={() => setMenu(false)} aria-label="Hazy Lil' Thing — home">
          <Image
            src="/logo-cream.png"
            alt="Hazy Lil' Thing"
            width={1825}
            height={1369}
            className="brand-logo"
            priority
          />
        </a>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              <span className="nll">
                <span>{l.label}</span>
                <span>{l.label}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="#shop" className="nav-cta">
            <span className="nll">
              <span>Grab a Pack</span>
              <span>Let&apos;s Go</span>
            </span>
          </a>
          <button className="cart-btn" onClick={openDrawer} aria-label="Open cart">
            <CartIcon />
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <button
            className={`burger ${menu ? "is-open" : ""}`}
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menu ? "open" : ""}`}>
        <button className="mm-close" onClick={() => setMenu(false)} aria-label="Close menu">
          <Close />
        </button>
        <div className="mm-links">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="btn primary mm-cart"
          onClick={() => {
            setMenu(false);
            openDrawer();
          }}
        >
          <span>View Cart ({count})</span>
        </button>
      </div>
    </nav>
  );
}
