"use client";

import { useCallback, useEffect, useState } from "react";
import { uz } from "@/content/uz";
import type { ServerStatus } from "@/lib/site";
import { cn } from "@/lib/utils";

type State = { kind: "loading" } | { kind: "ready"; data: ServerStatus } | { kind: "error" };

/** Jonli server holati. 30 soniyada bir marta yangilanadi (API 25s keshlaydi). */
export function ServerStatusPill({ className }: { className?: string }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/status", { signal, cache: "no-store" });
      if (!res.ok) throw new Error("status");
      setState({ kind: "ready", data: (await res.json()) as ServerStatus });
    } catch (err) {
      if ((err as Error).name !== "AbortError") setState({ kind: "error" });
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    const id = setInterval(() => load(), 30_000);
    return () => {
      ctrl.abort();
      clearInterval(id);
    };
  }, [load]);

  const online = state.kind === "ready" && state.data.online;
  const dot = online ? "bg-moss" : state.kind === "loading" ? "bg-ash" : "bg-ember";

  let label: string = uz.status.checking;
  if (state.kind === "error") label = uz.status.unknown;
  if (state.kind === "ready") {
    const { data } = state;
    if (!data.online) label = uz.status.offline;
    else if (!data.players || data.players.online === 0) label = uz.status.onlineEmpty;
    else label = uz.status.online(data.players.online, data.players.max);
  }

  return (
    <p
      className={cn("flex items-center gap-2.5 text-sm text-ash", className)}
      aria-live="polite"
      role="status"
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        {online && (
          <span className="absolute inline-flex h-full w-full animate-pulse-dot bg-moss opacity-60" />
        )}
        <span className={cn("relative inline-flex h-2.5 w-2.5", dot)} />
      </span>
      <span className={cn(online && "text-bone")}>{label}</span>
    </p>
  );
}
