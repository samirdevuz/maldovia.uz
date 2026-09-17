import { site } from "@/lib/site";

/**
 * Saytdagi barcha matnlar shu yerda.
 * Kelajakda RU/EN qo'shish uchun: `content/ru.ts` yaratib, bir xil shaklni
 * takrorlash va `content/index.ts` da til bo'yicha tanlash kifoya.
 */
export const uz = {
  locale: "uz-UZ",

  nav: [
    { href: "#rejimlar", label: "Rejimlar" },
    { href: "#videolar", label: "Videolar" },
    { href: "#discord", label: "Discord" },
    { href: "#ulanish", label: "Ulanish" },
    { href: "#savollar", label: "Savollar" },
  ],

  actions: {
    join: "O'yinga kirish",
    seeModes: "Rejimlarni ko'rish",
    copy: "Manzilni nusxalash",
    copied: "Nusxalandi",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    playVideo: "Videoni ochish",
    closeVideo: "Videoni yopish",
  },

  hero: {
    kicker: `${site.edition} uchun`,
    title: ["Bitta dunyo.", "Ikki qonun."],
    lead:
      "Maldovia — o'zbek o'yinchilari uchun Minecraft Java serveri. Bir chetida SMP Survival'ning tinch qishloqlari, ikkinchi chetida Anarxiyaning kuygan cho'li turibdi. Qaysi tomonda yashashni o'zing tanlaysan.",
    ipLabel: "Server manzili",
    ipHint: "Manzil ustiga bosib nusxala.",
  },

  status: {
    checking: "Server holati tekshirilmoqda",
    online: (n: number, max: number) => `Onlayn — ${n}/${max} o'yinchi`,
    onlineEmpty: "Onlayn — hozircha bo'sh",
    offline: "Server hozir o'chiq",
    unknown: "Holatni aniqlab bo'lmadi",
    retry: "Qayta tekshirish",
  },

  modes: {
    title: "Qaysi rejim seniki?",
    lead:
      "Maldoviada ikkita rejim bor va ular bir-biriga umuman o'xshamaydi. Birida qurasan, ikkinchisida omon qolasan.",
    smp: {
      id: "smp",
      name: "SMP Survival",
      tagline: "Qur, savdo qil, qo'shni bo'l.",
      desc:
        "Do'stlaring bilan qishloq qur, ferma yarat va do'kon orqali savdo qil. Hudud himoyalangan, shuning uchun bugun qurgan uying ertaga ham joyida turadi.",
      chips: ["Qurilish", "Iqtisodiyot", "Hamjamiyat"],
      art: "/art/mode-smp.svg",
      alt: "SMP Survival rejimi: yoritilgan uylar, bug'doyzor va hovuz bo'lgan tinch qishloq.",
    },
    anarchy: {
      id: "anarxiya",
      name: "Anarxiya",
      tagline: "Qoida yo'q. Faqat sen va yashiringan bazang.",
      desc:
        "Grief ham, PvP ham ochiq. Bazangni qanchalik chuqur yashirsang, shunchalik uzoq yashaysan. Ittifoq tuzasanmi yoki hech kimga ishonmaysanmi — o'zing hal qil.",
      chips: ["Grief", "PvP", "Qoidasiz"],
      art: "/art/mode-anarxiya.svg",
      alt: "Anarxiya rejimi: lava ko'llari, vayron bo'lgan minoralar va havoda uchayotgan bloklar.",
    },
  },

  videos: {
    title: "Maldoviani ichidan ko'r.",
    lead: "Server qanday ko'rinishini va unga qanday kirishni qisqa videolarda ko'rsatdik.",
    items: [
      {
        id: site.video.trailerId,
        label: "Rasmiy treyler",
        desc: "Ikkala rejim bilan bir daqiqada tanish.",
      },
      {
        id: site.video.guideId,
        label: "Ulanish qo'llanmasi",
        desc: "Minecraft'ni ochishdan o'yinga kirishgacha bo'lgan yo'l.",
      },
    ],
    empty: "Video hali joylanmadi. Tayyor bo'lgach shu yerda paydo bo'ladi.",
    channel: "YouTube kanalga o'tish",
  },

  discord: {
    title: "Jamoangni shu yerdan top.",
    lead:
      "SMP'da qo'shni, Anarxiyada ittifoqchi kerakmi? Maldovia Discord'ida o'yinchilar bazalarini ko'rsatadi, ovozli kanallarda birga o'ynaydi va server yangiliklarini birinchi bo'lib biladi.",
    bullets: ["Matnli suhbat", "Ovozli kanallar", "Server e'lonlari"],
    cta: "Discord'ga qo'shilish",
    widget: {
      online: "Hozir onlayn",
      loading: "Discord ma'lumotlari yuklanmoqda",
      disabled: "Jonli hisoblagich hozircha yoqilmagan. Serverga to'g'ridan-to'g'ri qo'shilsang bo'ladi.",
      subtitle: "Minecraft jamoasi",
    },
  },

  connect: {
    title: "Serverga qanday qo'shilaman?",
    lead: "Uch qadam, bir daqiqadan kam vaqt.",
    steps: [
      {
        title: "Minecraft'ni och",
        desc: "Java Edition'ni ishga tushir va asosiy menyudan Multiplayer bo'limiga kir.",
      },
      {
        title: "Serverni qo'sh",
        desc: `Add Server tugmasini bos. Server Address maydoniga ${site.ip} yoz, server nomini xohlagancha qo'y.`,
      },
      {
        title: "O'yinga kir",
        desc: "Done, so'ng Join Server. Ichkaridagi menyudan SMP Survival yoki Anarxiya rejimini tanla.",
      },
    ],
  },

  faq: {
    title: "Savoling bormi?",
    lead: "Manzil, rejimlar va ulanish haqida eng ko'p so'raladiganlari.",
    items: [
      {
        q: "Maldovia qanday server?",
        a: `Maldovia — o'zbek tilida muloqot qiladigan o'yinchilar uchun ${site.edition} serveri. Ikkita rejim ishlaydi: SMP Survival — tinch qurilish va savdo uchun, Anarxiya — qoidasiz omon qolish uchun.`,
      },
      {
        q: "Server IP manzili qanday?",
        a: `Server manzili — ${site.ip}. Port yozish shart emas, Minecraft uni o'zi topadi. Manzilni sayt yuqorisidagi blokka bosib nusxalasang bo'ladi.`,
      },
      {
        q: "SMP Survival va Anarxiya nimasi bilan farq qiladi?",
        a: "SMP Survival'da hudud himoyalangan: qurilishing va fermang joyida qoladi, o'yin hamjamiyat va iqtisodiyot atrofida quriladi. Anarxiyada esa hech qanday himoya yo'q — grief va PvP ochiq, bazani yashirish va himoya qilish o'zingning ishing.",
      },
      {
        q: "Serverga qanday ulanaman?",
        a: `Minecraft Java Edition'ni och, Multiplayer > Add Server bo'limiga kir, Server Address maydoniga ${site.ip} yoz va Join Server tugmasini bos. To'liq qadamlar "Serverga qanday qo'shilaman?" bo'limida.`,
      },
      {
        q: "Discord'da nima bor?",
        a: "Rejimlar bo'yicha alohida suhbat kanallari, birga o'ynash uchun ovozli kanallar, server yangiliklari va texnik ishlar haqida e'lonlar, shuningdek jamoa izlash kanali.",
      },
      {
        q: "Telefondagi Minecraft (Bedrock) ishlaydimi?",
        a: "Maldovia — Java Edition serveri. Bedrock (telefon, konsol, Windows 10/11 Edition) versiyasidan to'g'ridan-to'g'ri ulanib bo'lmaydi. Bedrock qo'llab-quvvatlash qo'shilsa, Discord'da e'lon qilamiz.",
      },
    ],
  },

  footer: {
    tagline: "O'zbek Minecraft jamoasi",
    modes: "SMP Survival va Anarxiya",
    links: [
      { label: "Discord", href: site.discordInvite, external: true },
      { label: "YouTube", href: site.youtube, external: true },
      { label: "Ulanish qo'llanmasi", href: "#ulanish", external: false },
    ],
    offer: "Ommaviy oferta",
    disclaimer:
      "Maldovia — Mojang yoki Microsoft bilan bog'liq bo'lmagan mustaqil loyiha.",
    rights: `© ${new Date().getFullYear()} ${site.name}`,
  },

  meta: {
    title: `${site.name} — O'zbek Minecraft serveri | SMP Survival va Anarxiya`,
    shortTitle: `${site.name} — O'zbek Minecraft serveri`,
    description: `${site.name} — o'zbek Minecraft Java serveri. SMP Survival va Anarxiya rejimlarida o'yna. IP: ${site.ip}. Ulanish qo'llanmasi va Discord jamoasi shu yerda.`,
    ogAlt: `${site.name} — o'zbek Minecraft serveri. SMP Survival va Anarxiya. ${site.ip}`,
  },
} as const;

export type Content = typeof uz;
