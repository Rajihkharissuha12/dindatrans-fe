import Section from "./section";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <Section id="testimoni" className="py-16 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas kami. Berikut testimoni dari
            mereka yang sudah merasakan layanan Dinda Trans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testi) => (
            <Card
              key={testi.id}
              className="h-full flex flex-col border-slate-800 bg-slate-900 hover:border-blue-500/50 transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="w-8 h-8 text-blue-400/30 mb-3" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testi.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed flex-1">
                  {testi.comment}
                </p>
                <div className="border-t border-slate-800 pt-3 mt-auto">
                  <p className="font-semibold text-white text-sm">
                    {testi.name}
                  </p>
                  <p className="text-xs text-slate-400">{testi.location}</p>
                  <p className="text-xs text-slate-500 mt-1">{testi.date}</p>
                  <a
                    href={testi.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Lihat Testimoni
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
