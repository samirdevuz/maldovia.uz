"use client";

import Image from "next/image";
import { Play, Youtube } from "lucide-react";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function VideoCard({ id, label, desc }: { id: string; label: string; desc: string }) {
  if (!id) {
    return (
      <div className="flex min-h-[16rem] flex-col justify-between border border-line bg-coal p-7">
        <div>
          <h3 className="font-display text-xl font-semibold text-bone">{label}</h3>
          <p className="mt-2 text-ash">{desc}</p>
        </div>
        <div className="mt-8">
          <p className="text-sm text-ash/70">{uz.videos.empty}</p>
          <LinkButton
            href={site.youtube}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <Youtube className="h-4 w-4" aria-hidden />
            {uz.videos.channel}
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group border border-line bg-coal text-left transition-colors hover:border-iris/60"
        >
          <span className="relative block aspect-video overflow-hidden">
            <Image
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt={`${label} — ${site.name} videosining ko'rinishi`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.1),rgba(10,11,15,0.75))]"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-iris text-white shadow-iris transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none"
            >
              <Play className="h-6 w-6 fill-current" />
            </span>
          </span>
          <span className="block p-6">
            <span className="block font-display text-xl font-semibold text-bone">{label}</span>
            <span className="mt-2 block text-ash">{desc}</span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent closeLabel={uz.actions.closeVideo}>
        <DialogTitle className="sr-only">{label}</DialogTitle>
        <DialogDescription className="sr-only">{desc}</DialogDescription>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Videos() {
  return (
    <section id="videolar" className="border-t border-line bg-void">
      <div className="container py-20 lg:py-28">
        <Reveal>
          <SectionHeading title={uz.videos.title} lead={uz.videos.lead} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {uz.videos.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <VideoCard id={item.id} label={item.label} desc={item.desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
