"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Youtube } from "lucide-react";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b border-line bg-void/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <a href="#asosiy" className="flex items-center gap-3">
          <Image src="/art/maldovia-logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight text-bone">
            {site.name.toUpperCase()}
          </span>
        </a>

        <nav aria-label="Asosiy menyu" className="hidden items-center gap-7 lg:flex">
          {uz.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ash transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Maldovia YouTube kanali"
            className="hidden h-10 w-10 items-center justify-center border border-line text-ash transition-colors hover:border-iris hover:text-bone sm:flex"
          >
            <Youtube className="h-5 w-5" aria-hidden />
          </a>
          <LinkButton href="#ulanish" size="sm" className="hidden sm:inline-flex">
            {uz.actions.join}
          </LinkButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menyu"
            aria-label={open ? uz.actions.closeMenu : uz.actions.openMenu}
            className="flex h-10 w-10 items-center justify-center border border-line text-bone lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobil-menyu"
        hidden={!open}
        className="fixed inset-0 top-16 z-40 flex flex-col bg-void/97 backdrop-blur-lg sm:top-[4.5rem] lg:hidden"
      >
        <nav aria-label="Mobil menyu" className="container flex flex-col divide-y divide-line">
          {uz.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-5 font-display text-2xl font-semibold text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="container mt-auto flex flex-col gap-3 pb-10">
          <LinkButton href="#ulanish" size="lg" onClick={() => setOpen(false)}>
            {uz.actions.join}
          </LinkButton>
          <LinkButton
            href={site.discordInvite}
            variant="outline"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {uz.discord.cta}
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
