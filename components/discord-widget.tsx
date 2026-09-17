"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site, type DiscordWidget as Widget } from "@/lib/site";
import { uz } from "@/content/uz";

/** Discord Widget API'dan jonli onlayn sonini oladi; yoqilmagan bo'lsa statik karta. */
export function DiscordWidgetCard() {
  const [data, setData] = useState<Widget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/discord", { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d: Widget) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const live = data?.enabled ? data : null;

  return (
    <div className="border border-line bg-coal">
      <div className="flex items-center gap-4 border-b border-line p-6">
        <Image src="/art/maldovia-logo.svg" alt="" width={48} height={48} className="h-12 w-12" />
        <div>
          <p className="font-display text-lg font-semibold text-bone">
            {live?.name ?? site.name}
          </p>
          <p className="text-sm text-ash">{uz.discord.widget.subtitle}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-ash">{uz.discord.widget.online}</p>
        <p className="mt-2 font-pixel text-2xl text-iris-soft" aria-live="polite">
          {loading ? "..." : live ? live.presence : "—"}
        </p>

        {!loading && !live && (
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ash/80">
            {uz.discord.widget.disabled}
          </p>
        )}

        <div className="seam-x mt-6 h-[2px] w-full" aria-hidden />
      </div>
    </div>
  );
}
