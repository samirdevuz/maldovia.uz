import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";

export const runtime = "edge";
export const alt = uz.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG rasm kod orqali quriladi — alohida .png fayl saqlashga hojat yo'q. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0A0B0F",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ flex: 1, background: "linear-gradient(160deg,#0E2A22,#1C5238)" }} />
          <div style={{ width: 6, background: "#A88CFF" }} />
          <div style={{ flex: 1, background: "linear-gradient(200deg,#2A1315,#7A2418)" }} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,rgba(10,11,15,0.55),rgba(10,11,15,0.94))",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: "#8C93A8", letterSpacing: 1 }}>
            {site.ip}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 82,
              fontWeight: 700,
              color: "#E9EAF1",
              lineHeight: 1.02,
            }}
          >
            <span>Bitta dunyo.</span>
            <span>Ikki qonun.</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#8C93A8" }}>
            {site.name} — o&apos;zbek Minecraft serveri. SMP Survival va Anarxiya.
          </div>
        </div>
      </div>
    ),
    size
  );
}
