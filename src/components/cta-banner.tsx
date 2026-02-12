import Section from "./section";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { whatsappLink } from "@/lib/data";

export default function CTABanner() {
  return (
    <Section className="py-16 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Anda?
            </h2>
            <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk booking mobil atau konsultasi gratis
              tentang paket rental yang sesuai kebutuhan Anda.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base px-8 h-12"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                Chat WhatsApp Sekarang
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
