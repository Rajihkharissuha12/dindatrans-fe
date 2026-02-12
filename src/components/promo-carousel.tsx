"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { promoSlides, whatsappLink } from "@/lib/data";
import Section from "./section";

export default function PromoCarousel() {
  return (
    <Section id="promo" className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {promoSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent"></div>
                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-8 md:px-12">
                      <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-200 mb-6">
                          {slide.description}
                        </p>
                        <Button asChild size="lg">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {slide.cta}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </Section>
  );
}
