import { Star } from "./icons";

// SAMPLE copy showing the voice — replace with real, verifiable testimonials.
const REVIEWS = [
  { t: "I forgot how strong it was.", b: "Then I remembered. Worth it.", who: "@hopfiend" },
  { t: "It replaced every other beer in my fridge.", b: "They knew what they did.", who: "@fridge_raider" },
  { t: "Tastes like a smoothie that could start a fight.", b: "Obsessed. Genuinely.", who: "@can_collector" },
  { t: "Ordered a 4-pack. Immediately regretted it.", b: "Should've bought the 24.", who: "@thirsty.sam" },
  { t: "So juicy I checked the ingredients.", b: "It's just beer. Witchcraft.", who: "@beer_nerd_ari" },
  { t: "I don't even like IPAs.", b: "I like this one. Rude, honestly.", who: "@lager_loyalist" },
];

function Card({ t, b, who }: { t: string; b: string; who: string }) {
  return (
    <div className="rev">
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <p className="rev-t">&ldquo;{t}&rdquo;</p>
      <p className="rev-b">{b}</p>
      <div className="who">
        <b>{who}</b> · sample
      </div>
    </div>
  );
}

export default function Reviews() {
  const track = [...REVIEWS, ...REVIEWS];
  return (
    <section className="rev-strip" id="reviews">
      <div className="wrap">
        <div className="rev-head reveal">
          <h2 className="sec-title">The Reviews Are In.</h2>
          <p className="sec-lead">Sample voice — swap in your real ones. (These are placeholders.)</p>
        </div>
      </div>
      <div className="rev-track">
        {track.map((r, i) => (
          <Card key={i} {...r} />
        ))}
      </div>
    </section>
  );
}
