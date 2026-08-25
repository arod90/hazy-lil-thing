import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Products from "@/components/Products";
import Shop from "@/components/Shop";
import Features from "@/components/Features";
import Why from "@/components/Why";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Statement />
        <Products />
        <Shop />
        <Features />
        <Why />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
