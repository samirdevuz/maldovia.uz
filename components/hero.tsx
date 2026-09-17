import Image from "next/image";
import { uz } from "@/content/uz";
import { LinkButton } from "@/components/ui/button";
import { CopyIp } from "@/components/copy-ip";
import { ServerStatusPill } from "@/components/server-status";

export function Hero() {
  return (
    <section id="asosiy" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      {/* Fon: "bitta dunyo, ikki qonun" panoramasi */}
      <Image
        src="/art/hero-panorama.svg"
        alt="Maldovia dunyosi: chap tomonda tinch SMP qishlog'i, o'ng tomonda yongan anarxiya vayronalari, o'rtada yorqin yoriq."
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[62%_center] sm:object-center"
      />
      {/* Matn o'qilishi uchun ekran */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,11,15,0.94)_0%,rgba(10,11,15,0.82)_38%,rgba(10,11,15,0.32)_68%,rgba(10,11,15,0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(180deg,transparent,#0A0B0F)]"
      />

      <div className="container pb-16 pt-32 sm:pb-24">
        <div className="max-w-[46rem]">
          <p className="text-sm text-ash">{uz.hero.kicker}</p>

          <h1 className="mt-4 font-display text-[clamp(2.9rem,8.4vw,6rem)] font-bold leading-[0.9] tracking-tightest text-bone">
            {uz.hero.title[0]}
            <br />
            {uz.hero.title[1]}
          </h1>

          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-ash sm:text-lg">
            {uz.hero.lead}
          </p>

          <div className="mt-9 max-w-md">
            <CopyIp />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <ServerStatusPill />
              <p className="text-sm text-ash/70">{uz.hero.ipHint}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#ulanish" size="lg">
              {uz.actions.join}
            </LinkButton>
            <LinkButton href="#rejimlar" variant="outline" size="lg">
              {uz.actions.seeModes}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
