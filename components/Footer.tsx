import { Instagram, TikTok, XMark } from "./icons";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-word">
          Stay <span className="r">Hazy.</span>
        </div>
        <div className="foot-cols">
          <div className="fc">
            <h4>Shop</h4>
            <a href="#shop">The Pack</a>
            <a href="#shop">Subscribe</a>
            <a href="#">Find a Stockist</a>
          </div>
          <div className="fc">
            <h4>The Brew</h4>
            <a href="#beer">Our Beer</a>
            <a href="#why">Why Us</a>
            <a href="#">Our Story</a>
          </div>
          <div className="fc">
            <h4>Say Hi</h4>
            <a href="#">hello@[yourdomain]</a>
            <a href="#">Wholesale</a>
            <a href="#">Press Kit</a>
          </div>
          <div className="fc">
            <h4>Follow the Haze</h4>
            <div className="socials">
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" aria-label="TikTok">
                <TikTok />
              </a>
              <a href="#" aria-label="X">
                <XMark />
              </a>
            </div>
          </div>
        </div>
        <div className="legal">
          <span>© [year] Hazy Lil&apos; Thing Brewing Co. All rights reserved.</span>
          <span>
            Please drink responsibly · You must be 21+ (or legal age) to purchase.
          </span>
        </div>
      </div>
    </footer>
  );
}
