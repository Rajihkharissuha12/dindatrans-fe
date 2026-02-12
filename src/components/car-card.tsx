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
import { Users, Fuel, Calendar, Settings, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "../lib/utils";
import { whatsappNumber } from "@/lib/data";
import { useState } from "react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [expanded, setExpanded] = useState(false);

  const whatsappMessage = `Halo Dinda Trans, saya ingin rental ${car.name} dengan harga ${formatPrice(
    car.pricePerDay,
  )}/hari. Mohon info lebih lanjut.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur hover:border-blue-500/50 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {car.tag && (
            <Badge className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600">
              {car.tag}
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-20"></div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>
              <p className="text-sm text-slate-400">{car.type}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {car.year}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="w-4 h-4 text-blue-400" />
              <span>{car.seats} Kursi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Settings className="w-4 h-4 text-blue-400" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Fuel className="w-4 h-4 text-blue-400" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Th. {car.year}</span>
            </div>
          </div>

          <Separator className="my-3 bg-slate-800" />

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3"
            >
              <p className="text-sm font-semibold text-slate-300 mb-2">
                Fitur:
              </p>
              <ul className="grid grid-cols-2 gap-1.5">
                {car.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-400 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors mb-3"
          >
            {expanded ? "Sembunyikan Detail" : "Lihat Detail"}
          </button>

          <div className="bg-slate-800/50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Harga mulai dari</p>
            <p className="text-2xl font-bold text-white">
              {formatPrice(car.pricePerDay)}
            </p>
            <p className="text-xs text-slate-400">per hari</p>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button asChild className="w-full" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4 mr-2" />
              Rental Sekarang
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
