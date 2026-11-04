import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ScrollStatement } from "@/components/scroll-statement";
import { SectionLabel } from "@/components/section-label";
import { ServiceStack } from "@/components/service-stack";
import { WorkShowcase } from "@/components/work-showcase";
import { SITE_URL, profile, projects, services, socials, whatsapp } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${profile.portrait.src}`,
  description: profile.intro,
  nationality: profile.origin,
  sameAs: socials.filter((s) => !s.href.includes("wa.me")).map((s) => s.href),
};

const servicesWithExamples = services.map((service) => {
  const exampleProject = projects.find((p) => p.slug === service.example);
  if (!exampleProject) throw new Error(`Unknown example project: ${service.example}`);
  return { ...service, exampleProject };
});

const facts = [
  { label: "From", value: profile.origin },
  { label: "Based in", value: profile.basedIn },
  { label: "Focus", value: "Websites for businesses" },
  { label: "Live projects", value: String(projects.length).padStart(2, "0") },
] as const;

const container = "mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <FloatingNav />

      <main id="main">
        <Hero />

        <section aria-label="Introduction" className={`${container} py-28 lg:py-44`}>
          <SectionLabel index="00">Hello</SectionLabel>
          <ScrollStatement
            className="max-w-[22ch] font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
            segments={[
              { text: "I build websites for real businesses like" },
              { text: "hotels, beauty brands and online stores,", emphasis: true },
              { text: "moving fast from an idea to a live site people actually use." },
            ]}
          />
        </section>

        <section id="work" aria-labelledby="work-title" className="scroll-mt-0">
          <div className={`${container} pb-4`}>
            <SectionLabel index="01" aside={String(projects.length).padStart(2, "0")}>
              Selected work
            </SectionLabel>
            <h2
              id="work-title"
              className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.03em]"
            >
              Selected <em className="text-accent">work</em>
            </h2>
          </div>
          <WorkShowcase projects={projects} />
        </section>

        <section id="services" aria-labelledby="services-title" className={`${container} scroll-mt-0 pt-28 lg:pt-40`}>
          <SectionLabel index="02">Services</SectionLabel>
          <div className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-12">
            <h2
              id="services-title"
              className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.03em] lg:col-span-7"
            >
              What I can <em className="text-accent">build</em> for you
            </h2>
            <p className="max-w-sm self-end text-lg leading-relaxed text-subtle text-pretty lg:col-span-4 lg:col-start-9">
              Every site is mobile-first, fast to load and built so customers can reach you on WhatsApp in one tap.
            </p>
          </div>
          <ServiceStack services={servicesWithExamples} />
        </section>

        <section
          id="about"
          aria-labelledby="about-title"
          className="scroll-mt-0 bg-[var(--paper-100)] py-28 text-[var(--ink-950)] lg:py-40"
        >
          <div className={container}>
            <div className="mb-10 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#5c554b] lg:mb-14">
              <span>
                <span className="text-[#735630]">(03)</span> About
              </span>
            </div>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    src={profile.portrait.src}
                    alt={profile.portrait.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </figure>
              </Reveal>
              <div className="flex flex-col justify-between gap-12 lg:col-span-7">
                <Reveal>
                  <h2
                    id="about-title"
                    className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1] tracking-[-0.02em] text-balance"
                  >
                    From Indonesia, studying in Malaysia,{" "}
                    <em className="text-[#735630]">building the web</em> one idea at a time.
                  </h2>
                </Reveal>
                <Reveal delay={0.1} className="grid gap-10 md:grid-cols-2">
                  <div className="flex flex-col gap-5">
                    {profile.about.map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-relaxed text-[#3d3831] text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <dl className="grid grid-cols-2 content-start gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10">
                    {facts.map((fact) => (
                      <div key={fact.label} className="bg-[var(--paper-100)] p-5">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b6458]">
                          {fact.label}
                        </dt>
                        <dd className="mt-2 font-display text-2xl leading-tight">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={`${container} scroll-mt-0 pt-28 pb-10 lg:pt-40`}
        >
          <SectionLabel index="04">Contact</SectionLabel>
          <Reveal>
            <h2
              id="contact-title"
              className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em]"
            >
              Let&rsquo;s build
              <br />
              <em className="text-accent">something.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-lg text-lg leading-relaxed text-subtle text-pretty sm:text-xl">
              Need a website for your business, shop or brand? Message me on WhatsApp and
              let&rsquo;s talk about what you need.
            </p>
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center gap-4 self-start rounded-full bg-foreground py-2 pr-7 pl-2 text-background transition-colors duration-500 hover:bg-accent lg:self-auto"
            >
              <span className="grid size-10 place-items-center rounded-full bg-background text-foreground">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Chat on WhatsApp</span>
                <span className="text-lg font-medium tabular-nums">{whatsapp.display}</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>

          <ul className="mt-16 grid gap-px overflow-hidden border-y border-border sm:grid-cols-3 lg:mt-24">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 py-8 sm:pr-8"
                >
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {social.label}
                    </span>
                    <span className="mt-2 block font-display text-4xl transition-colors duration-500 group-hover:text-accent sm:text-3xl lg:text-5xl">
                      {social.handle}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-[transform,border-color,color] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="mt-20 flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:justify-between">
            <span>© 2026 {profile.name}</span>
            <a href="#top" className="link-underline self-start">
              Back to top ↑
            </a>
          </footer>
        </section>
      </main>
    </>
  );
}
