import Image from "next/image";
import { Circle, Underline } from "./Mark";

export default function Statement() {
  return (
    <section className="statement" id="story">
      <div className="wrap statement-grid">
        <div className="statement-copy">
          <p className="big reveal">
            We pile on the hops like rent&apos;s due, leave the{" "}
            <Underline>haze</Underline> in on <Circle>purpose</Circle>, and can it
            before it can argue. Crack one cold and act surprised when people think
            you have <Underline>taste</Underline>.
          </p>
        </div>

        <div className="statement-media reveal">
          <div className="sm-frame">
            <Image
              src="/open-can.png"
              alt="Hazy Lil' Thing cracked open, mid-splash"
              fill
              className="sm-img"
              sizes="(max-width: 940px) 88vw, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
