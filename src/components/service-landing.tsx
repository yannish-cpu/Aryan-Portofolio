import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { LOCALES, localeLabels, serviceCopy, servicePaths, serviceWhatsappHref, type Locale } from "@/content/services";
import { SITE_URL, profile, projects, socials } from "@/content/site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Aryan Danish, website design for businesses" };

/** Per-locale metadata with hreflang alternates pointing at every language version. */
export function serviceMetadata(locale: Locale): Metadata {
  const copy = serviceCopy[locale];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: servicePaths[locale],
      languages: {
        en: servicePaths.en,
        ms: servicePaths.ms,
        id: servicePaths.id,
        "x-default": servicePaths.en,
      },
    },
    openGraph: {
      type: "website",
      url: servicePaths[locale],
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => localeLabels[l].ogLocale),
      siteName: profile.name,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.metaDescription, images: [OG_IMAGE.url] },
  };
}

const container = "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12";
const h2Class = "mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:mb-16";

function WhatsappButton({ locale, kicker }: { locale: Locale; kicker: string }) {
  const copy = serviceCopy[locale];
  return (
    <a
      href={serviceWhatsappHref(locale)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-14 items-center gap-4 self-start rounded-full bg-foreground py-2 pr-7 pl-2 text-background transition-colors duration-500 hover:bg-accent"
    >
      <span className="grid size-10 place-items-center rounded-full bg-background text-foreground">
        <MessageCircle className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-xs uppercase tracking-[0.14em]">{kicker}</span>
        <span className="text-lg font-medium">{copy.ctaLabel}</span>
      </span>
      <span className="sr-only">{copy.newTab}</span>
    </a>
  );
}

function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <nav aria-label={serviceCopy[current].languageNav} className="mb-8">
      <ul className="inline-flex rounded-full border border-border p-1">
        {LOCALES.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={servicePaths[locale]}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-10 min-w-12 items-center justify-center rounded-full px-4 font-mono text-xs tracking-[0.14em] transition-colors duration-300 ${
                  active ? "bg-foreground text-background" : "text-subtle hover:text-foreground"
                }`}
              >
                <span aria-hidden>{localeLabels[locale].short}</span>
                <span className="sr-only">{localeLabels[locale].name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ServiceLanding({ locale }: { locale: Locale }) {
  const copy = serviceCopy[locale];
  const pageUrl = `${SITE_URL}${servicePaths[locale]}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#web-design-service`,
      name: `${profile.name} Website Design`,
      url: pageUrl,
      image: `${SITE_URL}/og.png`,
      logo: `${SITE_URL}/brand/aryan-logo-dark.png`,
      description: copy.metaDescription,
      inLanguage: locale,
      founder: { "@type": "Person", name: profile.name, url: SITE_URL },
      areaServed: [
        { "@type": "Country", name: "Malaysia" },
        { "@type": "Country", name: "Indonesia" },
      ],
      availableLanguage: ["en", "ms", "id"],
      serviceType: copy.eyebrow,
      sameAs: socials.filter((s) => !s.href.includes("wa.me")).map((s) => s.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: copy.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FloatingNav />

      <main id="main" lang={locale}>
        <section aria-labelledby="service-title" className={`${container} pt-32 pb-24 lg:pt-44 lg:pb-36`}>
          <LanguageSwitcher current={locale} />
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              ({copy.eyebrow}) &nbsp;/&nbsp; Malaysia &amp; Indonesia
            </p>
            <h1
              id="service-title"
              className="max-w-[17ch] font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.03em] text-balance"
            >
              {copy.h1Lead} <em className="text-accent">{copy.h1Accent}</em> {copy.h1Tail}
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-subtle text-pretty sm:text-xl">{copy.intro}</p>
            <WhatsappButton locale={locale} kicker={copy.ctaKicker} />
          </Reveal>
        </section>

        <section aria-labelledby="services-heading" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="01">{copy.sections.services}</SectionLabel>
          <h2 id="services-heading" className={h2Class}>
            {copy.headings.services}
          </h2>
          <ol className="border-t border-border">
            {copy.services.map((service, index) => (
              <li key={service.title} className="grid gap-4 border-b border-border py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
                <span className="font-mono text-xs text-accent tabular-nums lg:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.875rem,3.5vw,3rem)] leading-[1] lg:col-span-5">{service.title}</h3>
                <div className="lg:col-span-6">
                  <p className="text-lg leading-relaxed text-subtle text-pretty">{service.description}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{service.example}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="portfolio" aria-labelledby="work-heading" className={`${container} scroll-mt-24 py-20 lg:py-28`}>
          <SectionLabel index="02" aside={String(projects.length).padStart(2, "0")}>
            {copy.sections.work}
          </SectionLabel>
          <h2 id="work-heading" className={h2Class}>
            {copy.headings.workLead} <em className="text-accent">{copy.headings.workAccent}</em>
          </h2>
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                    <Image
                      src={project.image}
                      alt={copy.screenshotAlt(project.title)}
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
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {copy.categories[project.category] ?? project.category} · {project.country}
                      </p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-[transform,border-color,color] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                  <span className="sr-only">{copy.openSite(project.domain)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="benefits-heading" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="03">{copy.sections.benefits}</SectionLabel>
          <h2 id="benefits-heading" className={h2Class}>
            {copy.headings.benefits}
          </h2>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {copy.benefits.map((benefit) => (
              <div key={benefit.title} className="bg-background p-8 lg:p-10">
                <dt className="font-display text-3xl">{benefit.title}</dt>
                <dd className="mt-3 max-w-md leading-relaxed text-subtle text-pretty">{benefit.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="process-heading" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="04">{copy.sections.process}</SectionLabel>
          <h2 id="process-heading" className={h2Class}>
            {copy.headings.process}
          </h2>
          <ol className="grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, index) => (
              <li key={step.title}>
                <span className="font-mono text-xs text-accent tabular-nums">
                  {copy.stepLabel} {index + 1}
                </span>
                <h3 className="mt-3 font-display text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-subtle text-pretty">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className={`${container} py-20 lg:py-28`}>
          <SectionLabel index="05">{copy.sections.faq}</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-12">
            <h2 id="faq-heading" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] lg:col-span-4">
              {copy.headings.faq}
            </h2>
            <div className="border-t border-border lg:col-span-7 lg:col-start-6">
              {copy.faq.map((item) => (
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

        <section aria-labelledby="cta-heading" className={`${container} border-t border-border pt-24 pb-12 lg:pt-36`}>
          <Reveal>
            <h2 id="cta-heading" className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
              {copy.finalLead}
              <br />
              <em className="text-accent">{copy.finalAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-lg text-lg leading-relaxed text-subtle text-pretty sm:text-xl">{copy.finalText}</p>
            <WhatsappButton locale={locale} kicker={copy.finalKicker} />
          </Reveal>
          <footer className="mt-20 flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {profile.name}</span>
            <span className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy" lang="en" className="link-underline">
                Privacy
              </Link>
              <Link href="/" className="link-underline">
                {copy.backToPortfolio} →
              </Link>
            </span>
          </footer>
        </section>
      </main>
    </>
  );
}
