"use client";

import { Car } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Fuel,
  Calendar,
  Settings,
  Phone,
  Key,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import RentalFormModal from "@/components/rental-form-modal"; // 👈 tambah ini

interface CarCardProps {
  car: Car;
  priceMode: "lepas-kunci" | "dengan-driver";
  isAvailable: boolean; // 👈 tambah ini
}

export default function CarCard({ car, priceMode, isAvailable }: CarCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 👈 tambah ini

  const currentPrice =
    priceMode === "lepas-kunci" ? car.pricePerDay : car.priceWithDriver;

  return (
    <>
      {/* 👈 Modal di-render di sini */}
      <RentalFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        car={car}
        priceMode={priceMode}
      />

      <motion.div
        whileHover={{ y: isAvailable ? -4 : 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card
          className={`h-full flex flex-col overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur transition-all duration-300
          ${isAvailable ? "hover:border-blue-500/50" : "opacity-60 grayscale-[30%]"}`}
        >
          {/* ── Gambar ── */}
          <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {car.tag && (
              <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-[10px] px-1.5 py-0.5">
                {car.tag}
              </Badge>
            )}
            {/* <Badge
              variant="outline"
              className="absolute top-2 left-2 bg-slate-900/90 backdrop-blur border-slate-700 text-[10px] px-1.5 py-0.5"
            >
              {priceMode === "lepas-kunci" ? (
                <>
                  <Key className="w-2.5 h-2.5 mr-1" />
                  <span className="hidden sm:inline">Lepas Kunci</span>
                  <span className="sm:hidden">LK</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-2.5 h-2.5 mr-1" />
                  <span className="hidden sm:inline">+ Driver</span>
                  <span className="sm:hidden">+D</span>
                </>
              )}
            </Badge> */}
            <Badge
              className={`absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 font-semibold
                ${
                  isAvailable
                    ? "bg-green-500/90 hover:bg-green-500 text-white"
                    : "bg-red-500/90 hover:bg-red-500 text-white"
                }`}
            >
              {isAvailable ? "✅ Tersedia" : "❌ Sedang Dibooking"}
            </Badge>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-16" />
          </div>

          {/* ── Header ── */}
          <CardHeader className="px-3 pt-3 pb-2 sm:px-4">
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight truncate">
                  {car.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                  {car.type}
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0.5 shrink-0"
              >
                {car.year}
              </Badge>
            </div>
          </CardHeader>

          {/* ── Content ── */}
          <CardContent className="flex-1 px-3 pb-2 sm:px-4">
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-3">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">
                  {car.seats} Kursi
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">
                  {car.transmission}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Fuel className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">
                  {car.fuel}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs truncate">
                  Th. {car.year}
                </span>
              </div>
            </div>

            <Separator className="my-2 bg-slate-800" />

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-2 overflow-hidden"
              >
                <p className="text-[11px] sm:text-xs font-semibold text-slate-300 mb-1.5">
                  Fitur:
                </p>
                <ul className="grid grid-cols-2 gap-1">
                  {car.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 leading-tight"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full shrink-0" />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] sm:text-xs text-blue-400 hover:text-blue-300 transition-colors mb-2"
            >
              {expanded ? "▲ Sembunyikan" : "▼ Lihat Detail"}
            </button>

            <div className="bg-slate-800/50 rounded-lg px-3 py-2">
              {/* <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                {priceMode === "lepas-kunci"
                  ? "🔑 Lepas Kunci"
                  : "👨‍✈️ Dengan Driver"}
              </p> */}
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {formatPrice(currentPrice)}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400">per hari</p>
            </div>
          </CardContent>

          {/* ── Footer ── */}
          <CardFooter className="px-3 pt-0 pb-3 sm:px-4 sm:pb-4">
            <Button
              className={`w-full h-8 sm:h-9 md:h-10 text-xs sm:text-sm transition-all duration-200
      ${
        isAvailable
          ? "hover:bg-blue-600 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.15)] hover:border-white/30 active:scale-[0.98]"
          : "opacity-50 cursor-not-allowed"
      }`}
              onClick={() => isAvailable && setModalOpen(true)}
              disabled={!isAvailable}
              variant={isAvailable ? "default" : "outline"}
            >
              {isAvailable ? (
                <>
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  Rental Sekarang
                </>
              ) : (
                <>
                  <span className="mr-1.5">🚫</span>
                  Tidak Tersedia
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
