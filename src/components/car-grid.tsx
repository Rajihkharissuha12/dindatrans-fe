import Section from "./section";
import CarGridClient from "./car-grid-client";
import { cars } from "../lib/data";
import { getCarAvailability } from "../lib/car-availability";

export default async function CarGrid() {
  const availability = await getCarAvailability();
  console.log(availability);

  return (
    <Section id="armada" className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Armada Kami
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            Pilih dari berbagai jenis mobil yang terawat dan siap menemani
            perjalanan Anda. Semua armada dilengkapi asuransi dan dalam kondisi
            prima.
          </p>
        </div>

        <CarGridClient cars={cars} initialAvailability={availability} />
      </div>
    </Section>
  );
}
