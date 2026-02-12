"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/data";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", href: "#hero" },
    { label: "Armada", href: "#armada" },
    { label: "Layanan", href: "#why-us" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Dinda Trans Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dinda Trans</h1>
              <p className="text-xs text-slate-400">Rental Mobil Jember</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-blue-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </a>
            </Button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-300 hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="w-full mt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
