"use client";

import { useState } from "react";
import CarCard from "./car-card";
import { Car } from "@/lib/data";
import { useCarAvailabilityPolling } from "@/hooks/use-car-availability-polling"; // 👈 1. tambah import

interface Props {
  cars: Car[];
  initialAvailability: Record<string, "on" | "off">; // 👈 2. rename dari "availability"
}

export default function CarGridClient({ cars, initialAvailability }: Props) {
  // 👈 3. rename prop
  const [priceMode, setPriceMode] = useState<"lepas-kunci" | "dengan-driver">(
    "lepas-kunci",
  );

  // 👇 4. TAMBAH INI — ganti availability statis dengan polling
  const { availability, lastUpdate, isPolling } = useCarAvailabilityPolling(
    initialAvailability,
    10000,
  );

  return (
    <>
      {/* 👇 5. TAMBAH INI — indikator status live */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2">
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
          {/* {lastUpdate && (
            <span className="text-[10px] text-slate-500">
              Update:{" "}
              {lastUpdate.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          )} */}
        </div>
      </div>

      {/* Toggle Price Mode — tidak ada perubahan */}
      {/* <div className="flex justify-center mb-6">
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
      </div> */}

      {/* Grid — tidak ada perubahan */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            priceMode={priceMode}
            isAvailable={availability[car.id] !== "off"}
          />
        ))}
      </div>
    </>
  );
}
