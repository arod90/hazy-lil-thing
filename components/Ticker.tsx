const ITEMS = [
  "Double Dry-Hopped",
  "Canned Fresh",
  "Ships Cold",
  "Small Batch",
  "Unfiltered",
  "21+ Only",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-row">
        {row.map((t, i) => (
          <span className="chip" key={i}>
            <span className="dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
