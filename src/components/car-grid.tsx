"use client";

import { useState } from "react";
import Section from "./section";
import CarCard from "./car-card";
import { cars } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function CarGrid() {
  const [priceMode, setPriceMode] = useState<"lepas-kunci" | "dengan-driver">(
    "lepas-kunci",
  );

  return (
    <Section id="armada" className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Armada Kami
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Pilih dari berbagai jenis mobil yang terawat dan siap menemani
            perjalanan Anda. Semua armada dilengkapi asuransi dan dalam kondisi
            prima.
          </p>

          {/* Toggle Price Mode */}
          <div>
            <div className="inline-flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
              <button
                onClick={() => setPriceMode("lepas-kunci")}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  priceMode === "lepas-kunci"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🔑 Lepas Kunci
              </button>
              <button
                onClick={() => setPriceMode("dengan-driver")}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  priceMode === "dengan-driver"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                👨‍✈️ Dengan Driver
              </button>
            </div>
          </div>
          {/* Info Badge */}
          <div className="mt-4 inline-block">
            {priceMode === "lepas-kunci" ? (
              <p className="text-xs text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                💡 Harga lepas kunci
              </p>
            ) : (
              <p className="text-xs text-slate-500 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                💡 Harga sudah termasuk driver
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} priceMode={priceMode} />
          ))}
        </div>
      </div>
    </Section>
  );
}
