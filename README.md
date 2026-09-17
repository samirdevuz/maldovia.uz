# Maldovia.uz — asosiy sayt

Maldovia (o'zbek Minecraft Java serveri) uchun bitta long-scroll marketing sayt.
Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion.

Dizayn g'oyasi — **"Bitta dunyo, ikki qonun"**: chap tomonda SMP Survival'ning
yashil, qurilgan olami, o'ng tomonda Anarxiyaning qizil, yongan cho'li, ularni
ajratib turuvchi binafsha **yoriq** esa brendning asosiy motivi. Yoriq butun sayt
bo'ylab takrorlanadi: hero panoramasida, rejimlar bo'limining o'rtasida, har bir
sarlavha ostida va footerda.

---

## 1. Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldir
npm run dev                  # http://localhost:3000
```

Build va prod:

```bash
npm run build
npm run start
```

## 2. .env.local

| O'zgaruvchi | Vazifasi | Majburiymi |
|---|---|---|
| `MC_HOST` | SLP uchun server hosti (`mc.maldovia.uz`) | ha |
| `MC_PORT` | Port, odatda `25565` | yo'q |
| `DISCORD_GUILD_ID` | Discord serverining ID'si (widget uchun) | yo'q |
| `NEXT_PUBLIC_DISCORD_INVITE` | Discord taklif havolasi | ha |
| `NEXT_PUBLIC_SITE_URL` | Kanonik manzil (`https://maldovia.uz`) | ha |
| `NEXT_PUBLIC_YT_TRAILER_ID` | Treyler YouTube ID'si | yo'q |
| `NEXT_PUBLIC_YT_GUIDE_ID` | Ulanish qo'llanmasi YouTube ID'si | yo'q |
| `NEXT_PUBLIC_YT_CHANNEL` | YouTube kanal havolasi | yo'q |

YouTube ID'lari bo'sh qolsa, video bo'limi **placeholder karta** ko'rsatadi —
sayt buzilmaydi. ID qo'yilishi bilan karta avtomatik thumbnail + modal pleyerga
aylanadi.

Discord `DISCORD_GUILD_ID` bo'sh bo'lsa yoki widget yoqilmagan bo'lsa, karta
jonli hisoblagich o'rniga statik ko'rinishga tushadi. Widget'ni yoqish:
**Server Settings → Widget → Enable Server Widget**.

## 3. Deploy (Vercel)

1. Repo'ni GitHub'ga push qil.
2. Vercel'da **New Project → Import**.
3. Environment Variables bo'limiga `.env.local` dagi qiymatlarni ko'chir.
4. Domain sifatida `maldovia.uz` ni ulab, DNS'da Vercel yozuvlarini ko'rsat.

> `/api/status` Node runtime'da ishlaydi (TCP socket kerak), shuning uchun Edge'ga
> ko'chirilmasin. Vercel'da bu marshrut Serverless Function sifatida ketadi.

## 4. Tuzilma

```
app/
  layout.tsx            fontlar, metadata, skip-link
  page.tsx              bo'limlar tartibi + JSON-LD (WebSite, Organization, FAQPage)
  globals.css           tokenlar, .seam-x / .seam-y / .notch / .grid-floor
  opengraph-image.tsx   1200x630 OG rasm kod orqali generatsiya qilinadi
  robots.ts, sitemap.ts
  api/status/route.ts   Server List Ping (minecraft-server-util), 25s kesh
  api/discord/route.ts  Discord Widget API, 60s kesh
components/
  site-header.tsx       sticky header, scroll'da blur, mobil full-screen menyu
  hero.tsx              panorama + IP bloki + jonli status
  modes.tsx             ikki yarimga bo'lingan to'liq kenglikdagi rejimlar
  videos.tsx            YouTube kartalari + modal (Radix Dialog)
  discord-section.tsx   matn + jonli widget kartasi
  connect-guide.tsx     3 qadamli ulanish yo'riqnomasi
  faq.tsx               Accordion (Radix)
  site-footer.tsx
  copy-ip.tsx           clipboard + "Nusxalandi" holati
  server-status.tsx     30s'da bir marta /api/status
  reveal.tsx            scroll-reveal, prefers-reduced-motion'ni hurmat qiladi
content/uz.ts           SAYTDAGI BARCHA MATN shu yerda
lib/site.ts             IP, havolalar, tiplar
public/art/*.svg        piksel-art sahnalar (generator: ../build/make_art.py)
```

## 5. Matnni tahrirlash

Hech qanday matn komponent ichiga yozilmagan — hammasi `content/uz.ts` da.
RU/EN qo'shish uchun `content/ru.ts` yaratib, xuddi shu shaklni takrorlash va
`content/index.ts` da til bo'yicha tanlash kifoya. `lang` atributi
`app/layout.tsx` da o'zgaradi.

## 6. Rasmlar

`public/art/` dagi sahnalar — qo'lda yozilgan generator orqali chiqarilgan
piksel-art SVG. Qayta generatsiya:

```bash
python3 build/make_art.py
```

Keyinchalik haqiqiy o'yin skrinshotlari yoki chizilgan illyustratsiyalar
tayyor bo'lsa:

1. Ularni `.webp` ga o'girib `public/art/` ga qo'y.
2. `content/uz.ts` dagi `art` yo'llarini va `hero.tsx` dagi `src` ni almashtir.
3. `next.config.mjs` dagi `dangerouslyAllowSVG` ni o'chirsa ham bo'ladi.

`alt` matnlari allaqachon mazmunli yozilgan — rasm almashtirilsa ularni ham
yangilashni unutma.

## 7. Diqqat qilinadigan kontent nuqtalari

Quyidagilar taxmin asosida yozilgan — server qoidalariga mos kelmasa,
`content/uz.ts` da tuzatish kerak:

- **SMP Survival** tavsifida "hudud himoyalangan" deyilgan (grief himoyasi bor
  deb faraz qilingan). Agar himoya yo'q bo'lsa, `modes.smp.desc` ni o'zgartir.
- **SMP** rejimida "do'kon orqali savdo" — iqtisodiyot tizimi bor deb olingan.
- FAQ'dagi **Bedrock** javobi: hozircha qo'llab-quvvatlanmaydi deb yozilgan.
- Footer'dagi **Ommaviy oferta** havolasi hozircha faol emas; hujjat tayyor
  bo'lgach `lib/site.ts` dagi `offerUrl` ga qo'yiladi.

## 8. Keyingi bosqich

Ushbu repo faqat **A qism** — asosiy sayt. Jazolar paneli (`bans.maldovia.uz`)
alohida loyiha sifatida qurilgani ma'qul: u ma'lumotlar bazasi, qidiruv va
jadval UI talab qiladi, va asosiy saytning statik/kesh strategiyasiga
aralashmasligi kerak.
