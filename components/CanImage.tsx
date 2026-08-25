import Image from "next/image";
import { getFlavor, type Flavor } from "@/lib/products";

export default function CanImage({
  flavor,
  flavorId = "hazy",
  priority = false,
  className = "",
  sizes = "(max-width: 940px) 70vw, 440px",
  float = true,
}: {
  flavor?: Flavor;
  flavorId?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  float?: boolean;
}) {
  const f = flavor ?? getFlavor(flavorId);
  return (
    <div className={`can ${float ? "" : "can-static"} ${className}`}>
      <Image
        src={f.image}
        alt={`${f.name} — 473ml hazy IPA can`}
        width={f.width}
        height={f.height}
        className="can-img"
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}
