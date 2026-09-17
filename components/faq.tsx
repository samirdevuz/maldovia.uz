import { uz } from "@/content/uz";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="savollar" className="border-t border-line bg-void">
      <div className="container grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <SectionHeading title={uz.faq.title} lead={uz.faq.lead} />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="border-t border-line">
            {uz.faq.items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
