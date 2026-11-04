/**
 * Copy for the Indonesian-language service page (/jasa-pembuatan-website).
 * Target market: Indonesia + Malaysia. No prices by design (owner's choice).
 * Keep claims factual: only what the existing projects actually show.
 */

const WHATSAPP_NUMBER = "60178234700";
const WHATSAPP_MESSAGE_ID = "Halo Aryan, saya mau konsultasi pembuatan website.";

export const jasaWhatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_ID)}`;

export const jasaPage = {
  path: "/jasa-pembuatan-website",
  metaTitle: "Jasa Pembuatan Website untuk Bisnis di Indonesia & Malaysia | Aryan Danish",
  metaDescription:
    "Jasa pembuatan website untuk hotel, toko online, brand kecantikan dan grosir di Indonesia dan Malaysia. Mobile-friendly, cepat, dan pelanggan bisa pesan langsung lewat WhatsApp. Konsultasi gratis.",
  eyebrow: "Jasa pembuatan website",
  title: "Website untuk bisnis kamu, siap dipakai pelanggan.",
  intro:
    "Saya Aryan Danish, pelajar asal Indonesia yang tinggal di Malaysia. Saya membuat website untuk bisnis di Indonesia dan Malaysia: hotel, toko online, brand kecantikan dan grosir. Semua website saya buat ramah HP, cepat dibuka, dan memudahkan pelanggan menghubungi kamu lewat WhatsApp.",
} as const;

export type JasaService = { title: string; description: string; example: string };

export const jasaServices: readonly JasaService[] = [
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
];

export const jasaBenefits: readonly { title: string; description: string }[] = [
  { title: "Ramah HP", description: "Tampilan disusun untuk layar HP terlebih dahulu, karena di situlah pelanggan kamu membuka website." },
  { title: "Pesan lewat WhatsApp", description: "Pelanggan bisa langsung chat atau pesan dengan satu klik, tanpa harus mengisi formulir panjang." },
  { title: "Cepat dibuka", description: "Gambar dioptimalkan dan halaman dibuat ringan supaya tidak membuat pelanggan menunggu." },
  { title: "Siap ditemukan di Google", description: "Struktur halaman, judul dan deskripsi disiapkan sesuai dasar-dasar SEO." },
];

export const jasaSteps: readonly { title: string; description: string }[] = [
  { title: "Konsultasi", description: "Ceritakan bisnis dan kebutuhan kamu lewat WhatsApp. Gratis." },
  { title: "Rancangan", description: "Saya susun isi dan tampilan website sesuai bisnis kamu." },
  { title: "Pembuatan", description: "Website dibuat dan kamu bisa melihat hasilnya sebelum dipublikasikan." },
  { title: "Online", description: "Website dipasang di domain kamu dan siap dibagikan ke pelanggan." },
];

export const jasaFaq: readonly { question: string; answer: string }[] = [
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
    answer:
      "Bisa. Website dapat dipasang di domain milik kamu, misalnya .com, .id, .my atau .com.my.",
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
];
