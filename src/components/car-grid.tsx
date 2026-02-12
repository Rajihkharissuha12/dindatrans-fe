import Section from "./section";
import CarCard from "./car-card";
import { cars } from "@/lib/data";

export default function CarGrid() {
  return (
    <Section id="armada" className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Armada Kami
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Pilih dari berbagai jenis mobil yang terawat dan siap menemani
            perjalanan Anda. Semua armada dilengkapi asuransi dan dalam kondisi
            prima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </Section>
  );
}
