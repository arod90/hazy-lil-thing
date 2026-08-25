"use client";

import { useState, type FormEvent } from "react";
import { Circle } from "./Mark";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to your email provider (Klaviyo / Mailchimp / Resend, …)
    setDone(true);
  };

  return (
    <section>
      <div className="wrap">
        <div className="news reveal">
          <h2>
            Join the <Circle>Haze.</Circle>
          </h2>
          <p>
            New drops, restocks, and the occasional bad hop pun. No spam — we&apos;re
            too busy brewing to bother you.
          </p>
          {done ? (
            <p className="news-thanks">You&apos;re on the list. Stay hazy. 🍺</p>
          ) : (
            <form onSubmit={onSubmit}>
              <input type="email" placeholder="you@email.com" aria-label="email" required />
              <button className="btn primary" type="submit">
                <span>Count Me In</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
