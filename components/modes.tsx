import Image from "next/image";
import { uz } from "@/content/uz";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Mode = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  chips: readonly string[];
  art: string;
  alt: string;
};

function ModePanel({
  mode,
  tone,
  className,
}: {
  mode: Mode;
  tone: "moss" | "ember";
  className?: string;
}) {
  const isMoss = tone === "moss";

  return (
    <article
      id={`rejim-${mode.id}`}
      className={cn(
        "group relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden lg:min-h-[44rem]",
        className
      )}
    >
      <Image
        src={mode.art}
        alt={mode.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,11,15,0.35)_0%,rgba(10,11,15,0.72)_45%,rgba(10,11,15,0.96)_100%)]"
      />
      {/* Rejim rangini bildiruvchi yuqori chiziq */}
      <div
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-1", isMoss ? "bg-moss" : "bg-ember")}
      />

      <div className="relative px-6 pb-12 pt-24 sm:px-10 sm:pb-14 lg:px-14 lg:pb-16">
        <h3
          className={cn(
            "font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-none tracking-tightest",
            isMoss ? "text-moss" : "text-ember"
          )}
        >
          {mode.name}
        </h3>
        <p className="mt-3 font-display text-lg font-semibold text-bone sm:text-xl">
          {mode.tagline}
        </p>
        <p className="mt-4 max-w-[44ch] leading-relaxed text-ash">{mode.desc}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {mode.chips.map((chip) => (
            <li
              key={chip}
              className={cn(
                "border px-3 py-1.5 text-sm",
                isMoss
                  ? "border-moss/35 bg-moss/10 text-moss"
                  : "border-ember/35 bg-ember/10 text-ember"
              )}
            >
              {chip}
            </li>
          ))}
        </ul>

        <LinkButton href="#ulanish" variant={tone} size="md" className="mt-8">
          {uz.actions.join}
        </LinkButton>
      </div>
    </article>
  );
}

export function Modes() {
  return (
    <section id="rejimlar" className="relative border-t border-line bg-void">
      <div className="container py-20 lg:py-28">
        <Reveal>
          <SectionHeading title={uz.modes.title} lead={uz.modes.lead} />
        </Reveal>
      </div>

      {/* To'liq kenglikdagi ikki yarim — sahifaning asosiy vizual g'oyasi */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        <ModePanel mode={uz.modes.smp} tone="moss" />
        {/* Mobil: gorizontal yoriq. Desktop: vertikal yoriq. */}
        <div aria-hidden className="seam-x h-[2px] w-full lg:hidden" />
        <ModePanel mode={uz.modes.anarchy} tone="ember" />
        <div
          aria-hidden
          className="seam-y absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 lg:block"
        />
      </div>
    </section>
  );
}
