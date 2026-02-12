import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dinda Trans | Rental Mobil Jember",
  description:
    "Rental mobil terpercaya di Jember. Armada lengkap, harga terjangkau, pelayanan profesional. Sewa mobil untuk harian, mingguan, wisata & mudik.",
  keywords:
    "rental mobil jember, sewa mobil jember, rental mobil murah, dinda trans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
