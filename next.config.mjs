/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sahna rasmlari SVG (blokli piksel-art). Keyinchalik .webp render bilan
    // almashtirilsa, bu bayroqni o'chirib qo'ysa ham bo'ladi.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};
export default nextConfig;
