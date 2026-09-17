import { NextResponse } from "next/server";
import { status } from "minecraft-server-util";
import type { ServerStatus } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOST = process.env.MC_HOST ?? "mc.maldovia.uz";
const PORT = Number(process.env.MC_PORT ?? 25565);
const TTL_MS = 25_000; // Server List Ping natijasi 25 soniya keshlanadi

let cache: { at: number; body: ServerStatus } | null = null;

async function ping(): Promise<ServerStatus> {
  try {
    const res = await status(HOST, PORT, { timeout: 4000, enableSRV: true });
    return {
      online: true,
      players: { online: res.players.online, max: res.players.max },
      version: res.version?.name ?? null,
      checkedAt: new Date().toISOString(),
    };
  } catch {
    return { online: false, players: null, version: null, checkedAt: new Date().toISOString() };
  }
}

export async function GET() {
  const now = Date.now();
  if (!cache || now - cache.at > TTL_MS) {
    cache = { at: now, body: await ping() };
  }
  return NextResponse.json(cache.body, {
    headers: { "Cache-Control": "public, s-maxage=25, stale-while-revalidate=60" },
  });
}
