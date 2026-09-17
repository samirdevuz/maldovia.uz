"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import { cn } from "@/lib/utils";

/** IP blokini clipboard'ga nusxalaydi. Clipboard API bo'lmasa, execCommand'ga tushadi. */
export function CopyIp({
  size = "lg",
  className,
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.ip);
      } else {
        const el = document.createElement("textarea");
        el.value = site.ip;
        el.setAttribute("readonly", "");
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${uz.actions.copy}: ${site.ip}`}
      className={cn(
        "group relative flex w-full items-center justify-between gap-4 border border-line bg-coal/80 text-left backdrop-blur transition-colors hover:border-iris/70 hover:bg-coal",
        size === "lg" ? "px-5 py-4 sm:px-6 sm:py-5" : "px-4 py-3",
        className
      )}
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-iris/70 transition-colors group-hover:bg-iris" aria-hidden />
      <span className="min-w-0">
        <span className="block text-[0.8rem] text-ash/80">{uz.hero.ipLabel}</span>
        <span
          className={cn(
            "mt-2 block truncate font-pixel text-bone",
            size === "lg" ? "text-base sm:text-xl" : "text-xs sm:text-sm"
          )}
        >
          {site.ip}
        </span>
      </span>

      <span
        className={cn(
          "flex shrink-0 items-center gap-2 font-display text-sm font-semibold transition-colors",
          copied ? "text-moss" : "text-ash group-hover:text-iris-soft"
        )}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        <span className="hidden sm:inline">{copied ? uz.actions.copied : uz.actions.copy}</span>
      </span>
    </button>
  );
}
