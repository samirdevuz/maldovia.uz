import { NextResponse } from "next/server";
import { site, type DiscordWidget } from "@/lib/site";

export const runtime = "nodejs";
export const revalidate = 60;

const GUILD_ID = process.env.DISCORD_GUILD_ID ?? "";

const disabled: DiscordWidget = {
  enabled: false,
  name: null,
  presence: null,
  invite: site.discordInvite,
};

/**
 * Discord Widget API — serverda "Enable Server Widget" yoqilgan bo'lishi kerak.
 * Yoqilmagan yoki xato bo'lsa, front statik kartaga tushib qoladi.
 */
export async function GET() {
  if (!GUILD_ID) return NextResponse.json(disabled);

  try {
    const res = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return NextResponse.json(disabled);

    const data = (await res.json()) as {
      name?: string;
      presence_count?: number;
      instant_invite?: string;
    };

    return NextResponse.json({
      enabled: true,
      name: data.name ?? site.name,
      presence: data.presence_count ?? 0,
      invite: data.instant_invite || site.discordInvite,
    } satisfies DiscordWidget);
  } catch {
    return NextResponse.json(disabled);
  }
}
