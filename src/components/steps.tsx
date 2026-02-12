import Section from "./section";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, FileCheck, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Hubungi Kami",
    description:
      "Chat via WhatsApp atau telepon untuk booking mobil pilihan Anda.",
  },
  {
    icon: FileCheck,
    title: "Verifikasi & Booking",
    description:
      "Kirim data diri (KTP, SIM) dan bayar DP untuk konfirmasi booking.",
  },
  {
    icon: Car,
    title: "Ambil atau Antar Mobil",
    description: "Ambil mobil di kantor kami atau kami antar ke lokasi Anda.",
  },
  {
    icon: CheckCircle,
    title: "Nikmati Perjalanan",
    description:
      "Mobil siap pakai! Kembalikan sesuai waktu atau perpanjang jika perlu.",
  },
];

export default function Steps() {
  return (
    <Section className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cara Sewa Mobil di Dinda Trans
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Proses rental yang mudah dan transparan dalam 4 langkah sederhana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <Card className="h-full border-slate-800 bg-slate-900 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full min-h-[220px]">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-6 relative">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
