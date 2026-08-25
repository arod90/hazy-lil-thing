import { Circle } from "./Mark";

const FEATURES = [
  {
    no: "01",
    title: ["No", "Filter"],
    body: "We leave the haze in. That cloud is juice and soft mouthfeel — not a mistake we forgot to clean up.",
  },
  {
    no: "02",
    title: ["No", "Adjuncts"],
    body: "Grain, hops, water, yeast. No corn syrup, no sugar-lab tricks, nothing you need a chemistry degree to pronounce.",
  },
  {
    no: "03",
    title: ["No", "Shortcuts"],
    body: "Small batches, obsessive taste checks, canned the second it peaks. Fresh or it doesn't leave the building.",
  },
  {
    no: "04",
    title: ["No", "Chill"],
    body: "Two dry-hop charges piled on after fermentation. Any sense of restraint left the building a while ago.",
  },
];

export default function Features() {
  return (
    <section id="beer">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title reveal">
            Four Things We
            <br />
            <Circle>Won&apos;t</Circle> Compromise.
          </h2>
          <p className="sec-lead reveal">
            Everything else about this beer is up for debate. These four aren&apos;t.
          </p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f) => (
            <div className="feat reveal" key={f.no}>
              <div className="no">{f.no}</div>
              <h3>
                {f.title[0]}
                <br />
                {f.title[1]}
              </h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
