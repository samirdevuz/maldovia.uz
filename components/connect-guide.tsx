import { uz } from "@/content/uz";
import { SectionHeading } from "@/components/section-heading";
import { CopyIp } from "@/components/copy-ip";
import { Reveal } from "@/components/reveal";

export function ConnectGuide() {
  return (
    <section id="ulanish" className="relative border-t border-line bg-void">
      <div aria-hidden className="grid-floor absolute inset-0 opacity-[0.35]" />

      <div className="container relative py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading title={uz.connect.title} lead={uz.connect.lead} />
          </Reveal>
          <Reveal delay={0.08} className="w-full lg:w-[22rem]">
            <CopyIp size="sm" />
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {uz.connect.steps.map((step, i) => (
            <li key={step.title} className="bg-coal p-7 sm:p-8">
              <span className="font-pixel text-sm text-iris" aria-hidden>
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-bone">
                <span className="sr-only">{i + 1}-qadam. </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ash">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
