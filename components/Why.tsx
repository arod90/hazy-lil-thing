import { Circle } from "./Mark";

const ITEMS = [
  {
    n: "01",
    title: ["Small", "Batch"],
    body: (
      <>
        Tiny runs, no conveyor belts. Just long brew days, constant tasting, and
        someone hovering over the tank like it owes them money.
      </>
    ),
  },
  {
    n: "02",
    title: ["Canned", "Fresh"],
    body: (
      <>
        Hops fade fast, so we don&apos;t dawdle. We can it the second it peaks and
        ship it cold — what you crack tastes like the brewhouse, not a warehouse.
      </>
    ),
  },
  {
    n: "03",
    title: ["Oh,", "This?"],
    body: (
      <>
        <span className="ph">[Your Beer Fest] 2026</span> — &ldquo;Best Hazy
        IPA&rdquo;, 2nd place. Not bad for a lil&apos; thing. Swap in a real award
        (or bin this card) once you&apos;ve earned it.
      </>
    ),
  },
];

export default function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title reveal">
            Why <Circle>Bother.</Circle>
          </h2>
          <p className="sec-lead reveal">
            We make small-batch hazy IPA because factory beer tastes like a
            spreadsheet.
          </p>
        </div>
        <div className="why-grid">
          {ITEMS.map((it) => (
            <div className="why-item reveal" key={it.n}>
              <div className="wn">{it.n}</div>
              <h3>
                {it.title[0]}
                <br />
                {it.title[1]}
              </h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
