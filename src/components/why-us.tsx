import Section from "./section";
import {
  Shield,
  Clock,
  ThumbsUp,
  HeadphonesIcon,
  CarFront,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: CarFront,
    title: "Armada Terawat",
    description:
      "Semua mobil kami rutin service dan dalam kondisi prima untuk kenyamanan Anda.",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    description:
      "Harga kompetitif dengan paket fleksibel untuk harian, mingguan, atau bulanan.",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description:
      "Booking mudah via WhatsApp, proses cepat, mobil siap dalam hitungan jam.",
  },
  {
    icon: HeadphonesIcon,
    title: "Layanan 24/7",
    description:
      "Tim kami siap melayani Anda kapan saja untuk kebutuhan rental mendadak.",
  },
  {
    icon: Shield,
    title: "Asuransi & Legal",
    description:
      "Semua armada dilengkapi asuransi dan dokumen lengkap untuk keamanan Anda.",
  },
  {
    icon: ThumbsUp,
    title: "Driver Profesional",
    description:
      "Tersedia pilihan dengan driver berpengalaman, ramah, dan menguasai area Jember.",
  },
];

export default function WhyUs() {
  return (
    <Section id="why-us" className="py-16 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kenapa Dinda Trans?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman rental terbaik dengan layanan
            yang ramah dan profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
