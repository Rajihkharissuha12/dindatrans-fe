import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import PromoCarousel from "@/components/promo-carousel";
import CarGrid from "@/components/car-grid";
import WhyUs from "@/components/why-us";
import Steps from "@/components/steps";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import CTABanner from "@/components/cta-banner";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <SiteHeader />
      <Hero />
      <PromoCarousel />
      <CarGrid />
      <WhyUs />
      <Steps />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <SiteFooter />
    </main>
  );
}
