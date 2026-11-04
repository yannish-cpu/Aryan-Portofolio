export const SITE_URL = "https://aryan-portfolio-omega-six.vercel.app";

export const profile = {
  name: "Aryan Danish",
  firstName: "Aryan",
  lastName: "Danish",
  role: "Student & vibe coder",
  origin: "Indonesia",
  basedIn: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  intro:
    "A student from Indonesia, studying in Malaysia. I love vibe coding — turning ideas into real websites that people actually use.",
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

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const socials: readonly Social[] = [
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
};

export const projects: readonly Project[] = [
  {
    slug: "mk-mulia-hotel",
    title: "MK Mulia Hotel",
    category: "Hospitality",
    country: "Indonesia",
    description:
      "Website for a sharia hotel in Lhoksukon, Aceh — rooms, nightly rates, facilities and booking via WhatsApp.",
    href: "https://mkmuliahotel.com/",
    domain: "mkmuliahotel.com",
    image: "/work/mkmulia.jpg",
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
  },
  {
    slug: "aryann-store",
    title: "Aryann Store",
    category: "E-commerce",
    country: "Malaysia",
    description:
      "Store for perfume, cosmetics and personal care in Malaysia — product categories and a simple WhatsApp ordering flow.",
    href: "https://aryannstore.vercel.app/",
    domain: "aryannstore.vercel.app",
    image: "/work/aryannstore.jpg",
  },
  {
    slug: "hawa-beauty",
    title: "Hawa Beauty",
    category: "Wholesale",
    country: "Malaysia",
    description:
      "Official website for a Kuala Lumpur beauty and daily-needs wholesaler — store details, location and WhatsApp QR.",
    href: "https://hawabeauty.com.my/",
    domain: "hawabeauty.com.my",
    image: "/work/hawa.jpg",
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
  },
];
