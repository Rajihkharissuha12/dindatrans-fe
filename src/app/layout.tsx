import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
// import { ToastProvider } from "@/context/ToastContext";
// import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dinda Trans Jember - Rental Mobil Murah Jember",
  description:
    "Sewa mobil murah di Jember. Avanza, Innova, APV dan lain-lain. Lepas kunci atau dengan driver. Hubungi WhatsApp 082332656326",
  keywords:
    "rental mobil jember, sewa mobil jember, dinda trans, mobil lepas kunci jember, rental mobil murah",

  // Open Graph untuk social share
  openGraph: {
    title: "Dinda Trans Jember - Rental Mobil Murah",
    description:
      "Rental mobil terlengkap di Jember. Harga mulai Rp300.000/hari.",
    url: "https://rentcarjember.com",
    siteName: "Dinda Trans",
    images: [
      {
        url: "https://res.cloudinary.com/dvuza2lpc/image/upload/v1772539670/512_mein5v.png", // 1200x630px
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Alternates untuk canonical
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="N_ojNU5oGWAi9Uhp-HOW0yidYea5cFjG-cX9n7P0luk"
        />
      </head>
      <body className={inter.className}>
        {/* <Providers> */}
          {/* <ToastProvider> */}
            {children}
            <Analytics />
          {/* </ToastProvider> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
