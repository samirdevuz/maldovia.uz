import Image from "next/image";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="container py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/art/maldovia-logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
              <span className="font-display text-lg font-bold tracking-tight text-bone">
                {site.name.toUpperCase()}
              </span>
            </div>
            <p className="mt-4 text-sm text-ash">{uz.footer.tagline}</p>
            <p className="mt-1 text-sm text-ash">{uz.footer.modes}</p>
            <p className="mt-4 font-pixel text-xs text-ash/80">{site.ip}</p>
          </div>

          <nav aria-label="Pastki menyu" className="flex flex-col gap-3">
            {uz.footer.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm text-ash transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
            {site.offerUrl ? (
              <a
                href={site.offerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ash transition-colors hover:text-bone"
              >
                {uz.footer.offer}
              </a>
            ) : (
              <span className="text-sm text-ash/40" title="Hujjat tayyorlanmoqda">
                {uz.footer.offer}
              </span>
            )}
          </nav>
        </div>

        <div className="seam-x mt-12 h-[2px] w-full" aria-hidden />

        <div className="mt-6 flex flex-col gap-2 text-sm text-ash/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{uz.footer.disclaimer}</p>
          <p>{uz.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
