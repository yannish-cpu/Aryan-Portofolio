import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SiteHeader } from "@/components/site-header";
import { WorkList } from "@/components/work-list";
import { SITE_URL, profile, projects, socials } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${profile.portrait.src}`,
  description: profile.intro,
  nationality: profile.origin,
  sameAs: socials.map((s) => s.href),
};

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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <Hero />

        <section id="work" aria-labelledby="work-title" className={`${container} scroll-mt-16 py-20 lg:py-32`}>
          <h2 id="work-title" className="sr-only">
            Selected work
          </h2>
          <SectionLabel index="01" aside={String(projects.length).padStart(2, "0")}>
            Selected work
          </SectionLabel>
          <WorkList projects={projects} />
        </section>

        <section id="about" aria-labelledby="about-title" className={`${container} scroll-mt-16 py-20 lg:py-32`}>
          <SectionLabel index="02">About</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <h2
                id="about-title"
                className="font-display text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[1] tracking-[-0.02em] text-balance"
              >
                From Indonesia, studying in Malaysia —{" "}
                <em className="text-accent">building the web</em> one idea at a time.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:self-end">
              {profile.about.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-subtle text-pretty">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={`${container} scroll-mt-16 border-t border-border pt-20 pb-10 lg:pt-32`}
        >
          <SectionLabel index="03">Contact</SectionLabel>
          <Reveal>
            <h2
              id="contact-title"
              className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em]"
            >
              Let&rsquo;s build
              <br />
              <em className="text-subtle">something.</em>
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-px overflow-hidden border-y border-border sm:grid-cols-2 lg:mt-24">
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
                    <span className="mt-2 block font-display text-4xl transition-colors duration-500 group-hover:text-accent sm:text-5xl">
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
