import Section from "./section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export default function FAQ() {
  return (
    <Section id="faq" className="py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar rental mobil di Dinda
            Trans.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-slate-900 border border-slate-800 rounded-lg px-6 data-[state=open]:border-blue-500/50"
              >
                <AccordionTrigger className="text-left text-white hover:text-blue-400 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
