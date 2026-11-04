export const SITE_URL = "https://aryanportofolio.vercel.app";

export const profile = {
  name: "Aryan Danish",
  firstName: "Aryan",
  lastName: "Danish",
  role: "Student & vibe coder",
  origin: "Indonesia",
  basedIn: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  intro:
    "A student from Indonesia, studying in Malaysia. I love vibe coding: turning ideas into real websites that people actually use.",
  about: [
    "I'm Aryan, an Indonesian student living and studying in Malaysia.",
    "What I enjoy most is vibe coding: moving fast from an idea to a working, live website. So far that has meant building sites for hotels, beauty brands and online stores on both sides of the Strait of Malacca.",
  ],
  portrait: {
    src: "/images/aryan.jpg",
    alt: "Portrait of Aryan Danish in a black suit and tie, adjusting his tie against a light wall.",
    width: 1122,
    height: 1402,
  },
} as const;

const WHATSAPP_NUMBER = "60178234700"; // Malaysia, local 017-823 4700
const WHATSAPP_MESSAGE = "Hi Aryan, I'd like to build a website with you.";

export const whatsapp = {
  label: "WhatsApp",
  display: "+60 17-823 4700",
  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const socials: readonly Social[] = [
  {
    label: whatsapp.label,
    handle: whatsapp.display,
    href: whatsapp.href,
  },
  {
    label: "Instagram",
    handle: "@danishalfarid",
    href: "https://www.instagram.com/danishalfarid/",
  },
  {
    label: "TikTok",
    handle: "@yayannish",
    href: "https://www.tiktok.com/@yayannish",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  country: "Indonesia" | "Malaysia";
  description: string;
  href: string;
  domain: string;
  image: string;
  /** Dark background tint sampled from the project's own palette. */
  tint: string;
  /** Readable accent from the project's palette, used for small labels. */
  accent: string;
};

export const projects: readonly Project[] = [
  {
    slug: "mk-mulia-hotel",
    title: "MK Mulia Hotel",
    category: "Hospitality",
    country: "Indonesia",
    description:
      "Website for a sharia hotel in Lhoksukon, Aceh, with rooms, nightly rates, facilities and booking via WhatsApp.",
    href: "https://mkmuliahotel.com/",
    domain: "mkmuliahotel.com",
    image: "/work/mkmulia.jpg",
    tint: "#231d12",
    accent: "#c9a25a",
  },
  {
    slug: "astika-cosmetic",
    title: "Astika Cosmetic",
    category: "E-commerce",
    country: "Malaysia",
    description:
      "Online shop for original Indonesian products, with orders routed through TikTok Shop and WhatsApp support.",
    href: "https://astikacosmetic.netlify.app/",
    domain: "astikacosmetic.netlify.app",
    image: "/work/astika.jpg",
    tint: "#1c1230",
    accent: "#bfa3e6",
  },
  {
    slug: "aryann-store",
    title: "Aryann Store",
    category: "E-commerce",
    country: "Malaysia",
    description:
      "Store for perfume, cosmetics and personal care in Malaysia, with product categories and a simple WhatsApp ordering flow.",
    href: "https://aryannstore.vercel.app/",
    domain: "aryannstore.vercel.app",
    image: "/work/aryannstore.jpg",
    tint: "#0e1526",
    accent: "#8fb0ea",
  },
  {
    slug: "hawa-beauty",
    title: "Hawa Beauty",
    category: "Wholesale",
    country: "Malaysia",
    description:
      "Official website for a Kuala Lumpur beauty and daily-needs wholesaler, with store details, location and a WhatsApp QR code.",
    href: "https://hawabeauty.com.my/",
    domain: "hawabeauty.com.my",
    image: "/work/hawa.jpg",
    tint: "#17140e",
    accent: "#d8bb73",
  },
  {
    slug: "jelita-beauty",
    title: "Jelita Beauty",
    category: "Wholesale",
    country: "Malaysia",
    description:
      "Official website for a beauty product wholesaler, built for resellers looking for stock and pricing.",
    href: "https://jelitabeauty.netlify.app/",
    domain: "jelitabeauty.netlify.app",
    image: "/work/jelita.jpg",
    tint: "#1d1910",
    accent: "#d2c178",
  },
];

export type Service = {
  title: string;
  description: string;
  tags: readonly string[];
  /** Slug of the project that best shows this kind of work. */
  example: Project["slug"];
};

export const services: readonly Service[] = [
  {
    title: "Business websites",
    description:
      "A clear, fast site that tells customers who you are, what you offer and how to reach you, like the MK Mulia Hotel site with rooms, rates and booking.",
    tags: ["Mobile-first", "WhatsApp booking", "Google-friendly"],
    example: "mk-mulia-hotel",
  },
  {
    title: "Online stores",
    description:
      "Product catalogues that make ordering easy, sending customers straight to WhatsApp or TikTok Shop to buy.",
    tags: ["Product catalogue", "WhatsApp / TikTok Shop ordering", "Fast loading"],
    example: "aryann-store",
  },
  {
    title: "Wholesale & reseller sites",
    description:
      "Official pages for wholesalers: store details, location, opening hours and a quick way for resellers to get stock and prices.",
    tags: ["Store details", "Maps & QR", "Reseller enquiries"],
    example: "hawa-beauty",
  },
];
