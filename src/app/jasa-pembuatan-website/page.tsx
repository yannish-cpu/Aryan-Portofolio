import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { jasaBenefits, jasaFaq, jasaPage, jasaServices, jasaSteps, jasaWhatsappHref } from "@/content/jasa";
import { SITE_URL, profile, projects, socials } from "@/content/site";

export const metadata: Metadata = {
  title: jasaPage.metaTitle,
  description: jasaPage.metaDescription,
  alternates: { canonical: jasaPage.path },
  openGraph: {
    type: "website",
    url: jasaPage.path,
    title: jasaPage.metaTitle,
    description: jasaPage.metaDescription,
    locale: "id_ID",
    siteName: profile.name,
    images: [{ url: "/brand/aryan-logo-dark.png", width: 1024, height: 1024, alt: "Logo Aryan Danish" }],
  },
};

const categoryId: Record<string, string> = {
  Hospitality: "Hotel",
  "E-commerce": "Toko online",
  Wholesale: "Grosir",
};

const pageUrl = `${SITE_URL}${jasaPage.path}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#service`,
    name: `Jasa Pembuatan Website ${profile.name}`,
    url: pageUrl,
    image: `${SITE_URL}/brand/aryan-logo-dark.png`,
    description: jasaPage.metaDescription,
    founder: { "@type": "Person", name: profile.name, url: SITE_URL },
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Country", name: "Malaysia" },
    ],
    availableLanguage: ["id", "ms", "en"],
    serviceType: "Jasa pembuatan website",
    sameAs: socials.filter((s) => !s.href.includes("wa.me")).map((s) => s.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jasaFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

const container = "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12";

function WhatsappButton({ label }: { label: string }) {
  return (
    <a
      href={jasaWhatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-14 items-center gap-4 self-start rounded-full bg-foreground py-2 pr-7 pl-2 text-background transition-colors duration-500 hover:bg-accent"
    >
      <span className="grid size-10 place-items-center rounded-full bg-background text-foreground">
        <MessageCircle className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{label}</span>
        <span className="text-lg font-medium">Konsultasi gratis via WhatsApp</span>
      </span>
      <span className="sr-only">(membuka tab baru)</span>
    </a>
  );
}

export default function JasaPembuatanWebsitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FloatingNav />

      <main id="main" lang="id">
        <section aria-labelledby="jasa-title" className={`${container} pt-36 pb-24 lg:pt-48 lg:pb-36`}>
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              ({jasaPage.eyebrow}) &nbsp;/&nbsp; Indonesia &amp; Malaysia
            </p>
            <h1
              id="jasa-title"
              className="max-w-[16ch] font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.03em] text-balance"
            >
              Jasa pembuatan website <em className="text-accent">untuk bisnis</em> di Indonesia &amp; Malaysia
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-subtle text-pretty sm:text-xl">{jasaPage.intro}</p>
            <WhatsappButton label="Mulai sekarang" />
          </Reveal>
        </section>

        <section aria-labelledby="layanan-title" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="01">Layanan</SectionLabel>
          <h2 id="layanan-title" className="mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:mb-16">
            Website yang bisa saya buat
          </h2>
          <ol className="border-t border-border">
            {jasaServices.map((service, index) => (
              <li key={service.title} className="grid gap-4 border-b border-border py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
                <span className="font-mono text-xs text-accent tabular-nums lg:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.875rem,3.5vw,3rem)] leading-[1] lg:col-span-5">{service.title}</h3>
                <div className="lg:col-span-6">
                  <p className="text-lg leading-relaxed text-subtle text-pretty">{service.description}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{service.example}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="portofolio" aria-labelledby="portofolio-title" className={`${container} scroll-mt-24 py-20 lg:py-28`}>
          <SectionLabel index="02" aside={String(projects.length).padStart(2, "0")}>
            Portofolio
          </SectionLabel>
          <h2 id="portofolio-title" className="mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:mb-16">
            Website yang sudah <em className="text-accent">online</em>
          </h2>
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                    <Image
                      src={project.image}
                      alt={`Tampilan website ${project.title}`}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-3xl leading-tight transition-colors duration-500 group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {categoryId[project.category] ?? project.category} · {project.country}
                      </p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-[transform,border-color,color] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                  <span className="sr-only">Buka {project.domain} (tab baru)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="keunggulan-title" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="03">Keunggulan</SectionLabel>
          <h2 id="keunggulan-title" className="mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:mb-16">
            Yang kamu dapat
          </h2>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {jasaBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-background p-8 lg:p-10">
                <dt className="font-display text-3xl">{benefit.title}</dt>
                <dd className="mt-3 max-w-md leading-relaxed text-subtle text-pretty">{benefit.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="proses-title" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="04">Proses</SectionLabel>
          <h2 id="proses-title" className="mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:mb-16">
            Cara kerjanya
          </h2>
          <ol className="grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {jasaSteps.map((step, index) => (
              <li key={step.title}>
                <span className="font-mono text-xs text-accent tabular-nums">Langkah {index + 1}</span>
                <h3 className="mt-3 font-display text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-subtle text-pretty">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-title" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="05">FAQ</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-12">
            <h2 id="faq-title" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:col-span-4">
              Pertanyaan yang sering ditanyakan
            </h2>
            <div className="border-t border-border lg:col-span-7 lg:col-start-6">
              {jasaFaq.map((item) => (
                <details key={item.question} className="group border-b border-border">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-subtle text-pretty">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="cta-title" className={`${container} border-t border-border pt-24 pb-12 lg:pt-36`}>
          <Reveal>
            <h2 id="cta-title" className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
              Siap punya
              <br />
              <em className="text-accent">website sendiri?</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-lg text-lg leading-relaxed text-subtle text-pretty sm:text-xl">
              Ceritakan bisnis kamu, dan kita bahas website yang paling cocok. Tanpa biaya untuk konsultasi.
            </p>
            <WhatsappButton label="Chat sekarang" />
          </Reveal>
          <footer className="mt-20 flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:justify-between">
            <span>© 2026 {profile.name}</span>
            <Link href="/" className="link-underline self-start">
              Portfolio (English) →
            </Link>
          </footer>
        </section>
      </main>
    </>
  );
}
