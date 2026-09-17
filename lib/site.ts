/** Saytning barcha o'zgaruvchi qiymatlari shu yerda. Boshqa joyda hardcode qilinmasin. */
export const site = {
  name: "Maldovia",
  domain: "maldovia.uz",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maldovia.uz",
  ip: "mc.maldovia.uz",
  edition: "Minecraft Java Edition",
  discordInvite: process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.maldovia.uz",
  youtube: process.env.NEXT_PUBLIC_YT_CHANNEL ?? "https://www.youtube.com/@maldoviauz",
  video: {
    trailerId: process.env.NEXT_PUBLIC_YT_TRAILER_ID ?? "",
    guideId: process.env.NEXT_PUBLIC_YT_GUIDE_ID ?? "",
  },
  offerUrl: "", // ommaviy oferta hujjati tayyor bo'lganda shu yerga qo'yiladi
} as const;

export type ServerStatus = {
  online: boolean;
  players: { online: number; max: number } | null;
  version: string | null;
  checkedAt: string;
};

export type DiscordWidget = {
  enabled: boolean;
  name: string | null;
  presence: number | null;
  invite: string;
};
