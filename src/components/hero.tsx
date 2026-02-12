"use client";

import { Button } from "@/components/ui/button";
import { Phone, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                ✨ Rental Mobil Terpercaya di Jember
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Perjalanan Nyaman Dimulai dari{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Dinda Trans
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Sewa mobil berkualitas dengan harga terjangkau untuk perjalanan
              harian, wisata, atau mudik. Armada terawat, pelayanan ramah,
              proses cepat!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="text-base px-8 h-12 min-w-[200px]"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 min-w-[200px]"
              >
                <a href="#armada">Lihat Armada</a>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  14+
                </div>
                <div className="text-sm text-slate-400">Armada Mobil</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-slate-400">Pelanggan Puas</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-slate-400">Layanan</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#promo"
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
        >
          <span className="text-sm">Scroll untuk info promo</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
