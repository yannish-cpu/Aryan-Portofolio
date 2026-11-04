import { WHATSAPP_NUMBER } from "@/content/site";

/**
 * Copy for the service landing page in three languages.
 * en = primary. ms = Bahasa Melayu (Malaysia). id = Bahasa Indonesia.
 * Positioning ("affordable/murah") is the owner's choice; no prices are shown by design.
 * Keep claims factual: only what the existing projects actually show.
 */

export const LOCALES = ["en", "ms", "id"] as const;
export type Locale = (typeof LOCALES)[number];

export const servicePaths: Record<Locale, string> = {
  en: "/website-design-services",
  ms: "/ms/buat-website",
  id: "/jasa-pembuatan-website",
};

export const localeLabels: Record<Locale, { short: string; name: string; ogLocale: string }> = {
  en: { short: "EN", name: "English", ogLocale: "en_MY" },
  ms: { short: "BM", name: "Bahasa Melayu", ogLocale: "ms_MY" },
  id: { short: "ID", name: "Bahasa Indonesia", ogLocale: "id_ID" },
};

type Item = { title: string; description: string };

export type ServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  h1Tail: string;
  intro: string;
  whatsappMessage: string;
  ctaKicker: string;
  ctaLabel: string;
  newTab: string;
  sections: { services: string; work: string; benefits: string; process: string; faq: string };
  headings: { services: string; workLead: string; workAccent: string; benefits: string; process: string; faq: string };
  services: readonly (Item & { example: string })[];
  categories: Record<string, string>;
  benefits: readonly Item[];
  stepLabel: string;
  steps: readonly Item[];
  faq: readonly { question: string; answer: string }[];
  finalLead: string;
  finalAccent: string;
  finalText: string;
  finalKicker: string;
  backToPortfolio: string;
  openSite: (domain: string) => string;
  screenshotAlt: (title: string) => string;
  languageNav: string;
};

export const serviceCopy: Record<Locale, ServiceCopy> = {
  en: {
    metaTitle: "Affordable Website Design in Malaysia & Indonesia | Aryan Danish",
    metaDescription:
      "Affordable website design for hotels, online stores and beauty brands in Malaysia and Indonesia. Mobile-friendly, fast, WhatsApp ordering. Free consultation.",
    eyebrow: "Website design services",
    h1Lead: "Affordable website design",
    h1Accent: "for businesses",
    h1Tail: "in Malaysia & Indonesia",
    intro:
      "I'm Aryan Danish, an Indonesian student based in Malaysia. I build websites for businesses in Malaysia and Indonesia: hotels, online stores, beauty brands and wholesalers. Every site is designed for phones first, loads quickly and lets customers reach you on WhatsApp in one tap.",
    whatsappMessage: "Hi Aryan, I'd like a consultation about building a website.",
    ctaKicker: "Get started",
    ctaLabel: "Free consultation on WhatsApp",
    newTab: "(opens in a new tab)",
    sections: { services: "Services", work: "Portfolio", benefits: "What you get", process: "Process", faq: "FAQ" },
    headings: {
      services: "Websites I can build",
      workLead: "Websites already",
      workAccent: "live",
      benefits: "What you get",
      process: "How it works",
      faq: "Frequently asked questions",
    },
    services: [
      {
        title: "Business & company profile websites",
        description:
          "Show who you are, what you offer, your location, opening hours and how to contact you. Ideal for hotels, service businesses and small businesses.",
        example: "Example: MK Mulia Hotel, Aceh",
      },
      {
        title: "Online stores & product catalogues",
        description:
          "A clean product catalogue with buttons that send customers straight to WhatsApp or TikTok Shop to order.",
        example: "Examples: Aryann Store and Astika Cosmetic, Malaysia",
      },
      {
        title: "Wholesale & reseller websites",
        description:
          "An official page for wholesalers and distributors: store info, address, map, WhatsApp QR and how resellers can get stock.",
        example: "Examples: Hawa Beauty and Jelita Beauty, Malaysia",
      },
    ],
    categories: { Hospitality: "Hotel", "E-commerce": "Online store", Wholesale: "Wholesale" },
    benefits: [
      { title: "Mobile-first", description: "Layouts are designed for phone screens first, because that is where your customers open your site." },
      { title: "WhatsApp ordering", description: "Customers can chat or order in one tap, without filling in long forms." },
      { title: "Fast loading", description: "Optimised images and lightweight pages, so customers are not left waiting." },
      { title: "Ready for Google", description: "Page structure, titles and descriptions follow SEO fundamentals." },
    ],
    stepLabel: "Step",
    steps: [
      { title: "Consultation", description: "Tell me about your business and what you need on WhatsApp. It's free." },
      { title: "Plan", description: "I put together the content and design for your website." },
      { title: "Build", description: "Your website is built and you can review it before it goes live." },
      { title: "Launch", description: "The website goes live on your domain, ready to share with customers." },
    ],
    faq: [
      {
        question: "How much does a website cost?",
        answer:
          "It depends on the type of website and the features you need. Tell me what you need on WhatsApp; the consultation is free.",
      },
      {
        question: "Do you work with clients in Indonesia?",
        answer:
          "Yes. I'm based in Malaysia and most of my clients are Malaysian businesses, but I also work with Indonesian clients, such as MK Mulia Hotel in Aceh.",
      },
      {
        question: "Can the website use my own domain?",
        answer: "Yes. The website can run on your own domain, for example .com, .my, .com.my or .id.",
      },
      {
        question: "Can customers order through WhatsApp?",
        answer:
          "Yes. Almost every website I build has a WhatsApp button, so customers can chat or order in one tap.",
      },
      {
        question: "How do I get started?",
        answer: "Tap the WhatsApp button on this page and tell me about your business. We'll take it from there.",
      },
    ],
    finalLead: "Ready for",
    finalAccent: "your own website?",
    finalText: "Tell me about your business and we'll work out the right website for it. The consultation is free.",
    finalKicker: "Chat now",
    backToPortfolio: "Back to portfolio",
    openSite: (domain) => `Open ${domain} (new tab)`,
    screenshotAlt: (title) => `Screenshot of the ${title} website`,
    languageNav: "Language",
  },
  ms: {
    metaTitle: "Servis Buat Website Murah di Malaysia | Aryan Danish",
    metaDescription:
      "Servis buat website murah untuk hotel, kedai online dan jenama kecantikan di Malaysia & Indonesia. Mesra telefon, laju, order melalui WhatsApp.",
    eyebrow: "Servis buat website",
    h1Lead: "Buat website murah",
    h1Accent: "untuk perniagaan",
    h1Tail: "di Malaysia & Indonesia",
    intro:
      "Saya Aryan Danish, pelajar dari Indonesia yang tinggal di Malaysia. Saya membina website untuk perniagaan di Malaysia dan Indonesia: hotel, kedai online, jenama kecantikan dan pemborong. Setiap website direka untuk telefon terlebih dahulu, laju dibuka dan memudahkan pelanggan menghubungi anda melalui WhatsApp.",
    whatsappMessage: "Hai Aryan, saya nak konsultasi tentang buat website.",
    ctaKicker: "Mula sekarang",
    ctaLabel: "Konsultasi percuma di WhatsApp",
    newTab: "(dibuka dalam tab baharu)",
    sections: { services: "Servis", work: "Portfolio", benefits: "Kelebihan", process: "Proses", faq: "Soalan lazim" },
    headings: {
      services: "Website yang saya boleh bina",
      workLead: "Website yang sudah",
      workAccent: "online",
      benefits: "Apa yang anda dapat",
      process: "Cara ia berfungsi",
      faq: "Soalan lazim",
    },
    services: [
      {
        title: "Website perniagaan & profil syarikat",
        description:
          "Tunjukkan siapa anda, apa yang anda tawarkan, lokasi, waktu operasi dan cara menghubungi anda. Sesuai untuk hotel, perniagaan servis dan PKS.",
        example: "Contoh: MK Mulia Hotel, Aceh",
      },
      {
        title: "Kedai online & katalog produk",
        description:
          "Katalog produk yang kemas, dengan butang yang membawa pelanggan terus ke WhatsApp atau TikTok Shop untuk order.",
        example: "Contoh: Aryann Store dan Astika Cosmetic, Malaysia",
      },
      {
        title: "Website pemborong & reseller",
        description:
          "Halaman rasmi untuk pemborong dan pengedar: maklumat kedai, alamat, peta, QR WhatsApp dan cara reseller mendapatkan stok.",
        example: "Contoh: Hawa Beauty dan Jelita Beauty, Malaysia",
      },
    ],
    categories: { Hospitality: "Hotel", "E-commerce": "Kedai online", Wholesale: "Pemborong" },
    benefits: [
      { title: "Mesra telefon", description: "Susun atur direka untuk skrin telefon terlebih dahulu, kerana di situlah pelanggan membuka website anda." },
      { title: "Order melalui WhatsApp", description: "Pelanggan boleh chat atau order dengan satu klik, tanpa perlu mengisi borang panjang." },
      { title: "Laju dibuka", description: "Gambar dioptimumkan dan halaman dibina ringan supaya pelanggan tidak perlu menunggu." },
      { title: "Sedia untuk Google", description: "Struktur halaman, tajuk dan penerangan mengikut asas SEO." },
    ],
    stepLabel: "Langkah",
    steps: [
      { title: "Konsultasi", description: "Ceritakan tentang perniagaan dan keperluan anda melalui WhatsApp. Percuma." },
      { title: "Rancangan", description: "Saya susun kandungan dan reka bentuk website anda." },
      { title: "Pembinaan", description: "Website dibina dan anda boleh menyemaknya sebelum ia dilancarkan." },
      { title: "Pelancaran", description: "Website dilancarkan di domain anda dan sedia untuk dikongsi dengan pelanggan." },
    ],
    faq: [
      {
        question: "Berapakah kos untuk buat website?",
        answer:
          "Kos bergantung pada jenis website dan ciri yang anda perlukan. Ceritakan keperluan anda melalui WhatsApp; konsultasi adalah percuma.",
      },
      {
        question: "Adakah anda menerima pelanggan dari Indonesia?",
        answer:
          "Ya. Saya tinggal di Malaysia dan kebanyakan pelanggan saya ialah perniagaan di Malaysia, tetapi saya juga bekerja dengan pelanggan di Indonesia, seperti MK Mulia Hotel di Aceh.",
      },
      {
        question: "Bolehkah website menggunakan domain sendiri?",
        answer: "Boleh. Website boleh dipasang pada domain anda sendiri, contohnya .com, .my, .com.my atau .id.",
      },
      {
        question: "Bolehkah pelanggan order melalui WhatsApp?",
        answer:
          "Boleh. Hampir setiap website yang saya bina mempunyai butang WhatsApp, jadi pelanggan boleh chat atau order dengan satu klik.",
      },
      {
        question: "Bagaimana untuk bermula?",
        answer: "Tekan butang WhatsApp di halaman ini dan ceritakan tentang perniagaan anda. Kita akan bincang dari situ.",
      },
    ],
    finalLead: "Sedia untuk",
    finalAccent: "website sendiri?",
    finalText: "Ceritakan tentang perniagaan anda dan kita bincang website yang paling sesuai. Konsultasi adalah percuma.",
    finalKicker: "Chat sekarang",
    backToPortfolio: "Kembali ke portfolio",
    openSite: (domain) => `Buka ${domain} (tab baharu)`,
    screenshotAlt: (title) => `Paparan website ${title}`,
    languageNav: "Bahasa",
  },
  id: {
    metaTitle: "Jasa Pembuatan Website Murah Indonesia | Aryan Danish",
    metaDescription:
      "Tempat pembuatan website murah untuk hotel, toko online dan brand kecantikan di Indonesia & Malaysia. Ramah HP, cepat, pesan via WhatsApp. Konsultasi gratis.",
    eyebrow: "Jasa pembuatan website",
    h1Lead: "Jasa pembuatan website murah",
    h1Accent: "untuk bisnis",
    h1Tail: "di Indonesia & Malaysia",
    intro:
      "Mencari tempat pembuatan website yang terjangkau? Saya Aryan Danish, pelajar asal Indonesia yang tinggal di Malaysia. Saya membuat website untuk bisnis di Indonesia dan Malaysia: hotel, toko online, brand kecantikan dan grosir. Semua website saya buat ramah HP, cepat dibuka, dan memudahkan pelanggan menghubungi kamu lewat WhatsApp.",
    whatsappMessage: "Halo Aryan, saya mau konsultasi pembuatan website.",
    ctaKicker: "Mulai sekarang",
    ctaLabel: "Konsultasi gratis via WhatsApp",
    newTab: "(membuka tab baru)",
    sections: { services: "Layanan", work: "Portofolio", benefits: "Keunggulan", process: "Proses", faq: "FAQ" },
    headings: {
      services: "Website yang bisa saya buat",
      workLead: "Website yang sudah",
      workAccent: "online",
      benefits: "Yang kamu dapat",
      process: "Cara kerjanya",
      faq: "Pertanyaan yang sering ditanyakan",
    },
    services: [
      {
        title: "Website bisnis & company profile",
        description:
          "Menampilkan siapa kamu, apa yang kamu jual, lokasi, jam buka dan cara menghubungi kamu. Cocok untuk hotel, usaha jasa dan UMKM.",
        example: "Contoh: MK Mulia Hotel, Aceh",
      },
      {
        title: "Toko online & katalog produk",
        description:
          "Katalog produk yang rapi, dengan tombol pesan langsung ke WhatsApp atau TikTok Shop. Tanpa ribet, pelanggan tinggal klik.",
        example: "Contoh: Aryann Store dan Astika Cosmetic, Malaysia",
      },
      {
        title: "Website grosir & reseller",
        description:
          "Halaman resmi untuk pemborong atau distributor: info toko, alamat, peta, QR WhatsApp dan cara reseller mendapatkan stok.",
        example: "Contoh: Hawa Beauty dan Jelita Beauty, Malaysia",
      },
    ],
    categories: { Hospitality: "Hotel", "E-commerce": "Toko online", Wholesale: "Grosir" },
    benefits: [
      { title: "Ramah HP", description: "Tampilan disusun untuk layar HP terlebih dahulu, karena di situlah pelanggan kamu membuka website." },
      { title: "Pesan lewat WhatsApp", description: "Pelanggan bisa langsung chat atau pesan dengan satu klik, tanpa harus mengisi formulir panjang." },
      { title: "Cepat dibuka", description: "Gambar dioptimalkan dan halaman dibuat ringan supaya tidak membuat pelanggan menunggu." },
      { title: "Siap ditemukan di Google", description: "Struktur halaman, judul dan deskripsi disiapkan sesuai dasar-dasar SEO." },
    ],
    stepLabel: "Langkah",
    steps: [
      { title: "Konsultasi", description: "Ceritakan bisnis dan kebutuhan kamu lewat WhatsApp. Gratis." },
      { title: "Rancangan", description: "Saya susun isi dan tampilan website sesuai bisnis kamu." },
      { title: "Pembuatan", description: "Website dibuat dan kamu bisa melihat hasilnya sebelum dipublikasikan." },
      { title: "Online", description: "Website dipasang di domain kamu dan siap dibagikan ke pelanggan." },
    ],
    faq: [
      {
        question: "Berapa biaya pembuatan website?",
        answer:
          "Biaya tergantung jenis website dan fitur yang kamu butuhkan. Ceritakan kebutuhan kamu lewat WhatsApp, konsultasinya gratis.",
      },
      {
        question: "Apakah melayani klien di Malaysia?",
        answer:
          "Ya. Saya tinggal di Malaysia dan sebagian besar klien saya adalah bisnis di Malaysia. Klien di Indonesia juga dilayani, contohnya MK Mulia Hotel di Aceh.",
      },
      {
        question: "Apakah website bisa memakai domain sendiri?",
        answer: "Bisa. Website dapat dipasang di domain milik kamu, misalnya .com, .id, .my atau .com.my.",
      },
      {
        question: "Apakah pelanggan bisa memesan lewat WhatsApp?",
        answer:
          "Bisa. Hampir semua website yang saya buat punya tombol WhatsApp, sehingga pelanggan bisa chat atau memesan dengan satu klik.",
      },
      {
        question: "Bagaimana cara memulai?",
        answer:
          "Klik tombol WhatsApp di halaman ini dan ceritakan bisnis kamu. Dari situ kita bahas kebutuhan dan langkah selanjutnya.",
      },
    ],
    finalLead: "Siap punya",
    finalAccent: "website sendiri?",
    finalText: "Ceritakan bisnis kamu, dan kita bahas website yang paling cocok. Tanpa biaya untuk konsultasi.",
    finalKicker: "Chat sekarang",
    backToPortfolio: "Kembali ke portfolio",
    openSite: (domain) => `Buka ${domain} (tab baru)`,
    screenshotAlt: (title) => `Tampilan website ${title}`,
    languageNav: "Bahasa",
  },
};

export function serviceWhatsappHref(locale: Locale) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(serviceCopy[locale].whatsappMessage)}`;
}
