import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { whatsappLink } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="Dinda Trans Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dinda Trans</h3>
                <p className="text-xs text-slate-400">Rental Mobil Jember</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Solusi rental mobil terpercaya di Jember untuk perjalanan harian,
              wisata, dan mudik dengan armada terawat dan harga terjangkau.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak Kami</h4>
            <div className="space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+62823-3798-8088</span>
              </a>
              <a
                href={"https://maps.app.goo.gl/tEMFK8dxawpmYyid9"}
                target="_blank"
                className="flex items-start gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Jl. Merak Gg 2 Nomer 3 Jember (Depan MTsN 2 Jember), Jember,
                  Jawa Timur
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Jam Operasional</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Senin - Minggu</p>
                  <p className="text-blue-400">08.00 - 20.00 WIB</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">*WhatsApp 24/7</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/dinda_trans"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@dindatrans_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <div>
              <h5 className="text-white text-sm font-semibold mb-2">
                Link Cepat
              </h5>
              <div className="space-y-2">
                <a
                  href="#armada"
                  className="block text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Armada
                </a>
                <a
                  href="#why-us"
                  className="block text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Layanan
                </a>
                <a
                  href="#faq"
                  className="block text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-6" />

        <div className="text-center text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Dinda Trans. All rights reserved.
          </p>
          <p className="mt-1">Rental Mobil Jember | Melayani dengan Hati ❤️</p>
          <p className="mt-2 text-xs text-slate-500">
            Developed by{" "}
            <a
              href="https://www.instagram.com/aisolusimuda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Aisolusimuda
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
