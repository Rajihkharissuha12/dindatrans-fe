"use client";

import { useState, useRef } from "react";
import CarCard from "./car-card";
import { Car } from "@/lib/data";
import { useCarAvailabilityPolling } from "@/hooks/use-car-availability-polling";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 8;

interface Props {
  cars: Car[];
  initialAvailability: Record<string, "on" | "off">;
}

export default function CarGridClient({ cars, initialAvailability }: Props) {
  const [priceMode, setPriceMode] = useState<"lepas-kunci" | "dengan-driver">(
    "lepas-kunci",
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { availability, isPolling } = useCarAvailabilityPolling(
    initialAvailability,
    10000,
  );

  const visibleCars = cars.slice(0, visibleCount);
  const hasMore = visibleCount < cars.length;
  const remaining = cars.length - visibleCount;

  const handleLoadMore = () => {
    setIsLoading(true);

    // Simpan posisi scroll saat ini sebelum load
    const scrollY = window.scrollY;

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, cars.length));
      setIsLoading(false);

      // Kembalikan posisi scroll ke posisi semula setelah render
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      });
    }, 400);
  };

  return (
    <>
      {/* Status Live */}
      <div className="flex justify-center mb-4">
        <span
          className={`text-[11px] flex items-center gap-1.5 px-3 py-1 rounded-full border
          ${
            isPolling
              ? "text-green-400 border-green-500/30 bg-green-500/5"
              : "text-slate-500 border-slate-700 bg-slate-800/30"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isPolling ? "bg-green-400 animate-pulse" : "bg-slate-600"}`}
          />
          Status armada live
        </span>
      </div>

      {/* Info counter */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="text-xs text-slate-500">
          Menampilkan{" "}
          <span className="text-slate-300 font-medium">
            {visibleCars.length}
          </span>{" "}
          dari <span className="text-slate-300 font-medium">{cars.length}</span>{" "}
          armada
        </p>
        {hasMore && (
          <p className="text-xs text-slate-500">+{remaining} lainnya</p>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <AnimatePresence initial={false}>
          {visibleCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay:
                  index >= visibleCount - ITEMS_PER_PAGE
                    ? (index % ITEMS_PER_PAGE) * 0.05 // delay stagger hanya item baru
                    : 0,
              }}
              className="h-full"
            >
              <CarCard
                car={car}
                priceMode={priceMode}
                isAvailable={availability[car.id] !== "off"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More / Selesai */}
      <div ref={loaderRef} className="flex flex-col items-center mt-8 gap-3">
        {hasMore ? (
          <>
            {/* Progress bar */}
            <div className="w-full max-w-xs bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(visibleCount / cars.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {/* <p className="text-[11px] text-slate-500">
              {Math.round((visibleCount / cars.length) * 100)}% ditampilkan
            </p> */}

            <Button
              variant="outline"
              className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-blue-500/50 transition-all duration-200 gap-2 px-8"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memuat...
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Tampilkan {Math.min(remaining, ITEMS_PER_PAGE)} Lainnya
                </>
              )}
            </Button>
          </>
        ) : (
          // Semua sudah tampil
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-full max-w-xs bg-blue-500/20 rounded-full h-1.5">
              <div className="h-full w-full bg-blue-500 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-500">
              Semua {cars.length} armada ditampilkan
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}
