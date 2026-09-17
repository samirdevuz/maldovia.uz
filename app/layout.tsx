import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, Press_Start_2P } from "next/font/google";
import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: uz.meta.title,
  description: uz.meta.description,
  applicationName: site.name,
  keywords: [
    "Maldovia",
    "o'zbek Minecraft serveri",
    "Minecraft Java server",
    "SMP Survival",
    "Anarxiya",
    site.ip,
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "uz_UZ",
    title: uz.meta.title,
    description: uz.meta.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: uz.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: uz.meta.title,
    description: uz.meta.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" } as Metadata["robots"],
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${display.variable} ${sans.variable} ${pixel.variable}`}>
      <body>
        <a
          href="#asosiy"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-iris focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Asosiy kontentga o'tish
        </a>
        {children}
      </body>
    </html>
  );
}
