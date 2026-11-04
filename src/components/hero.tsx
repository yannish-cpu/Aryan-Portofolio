"use client";

import { ArrowDown, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { HeroCanvas } from "@/components/hero-canvas";
import { LocalTime } from "@/components/local-time";
import { profile, whatsapp } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splits a word into letters that rise out of a clipping mask, one after another. */
function MaskedWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`}>
      <span className="sr-only">{word}</span>
      <span aria-hidden className="inline-block">
        {word.split("").map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay: delay + i * 0.05, ease: EASE }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] h-[100svh] flex-col overflow-hidden bg-background"
    >
      <HeroCanvas className="absolute inset-0 -z-10 size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-28 pb-8 sm:px-8 lg:px-12 lg:pb-10">
        <motion.p
          className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle"
          {...fadeUp(0.1)}
        >
          (Portfolio — 2026) &nbsp;/&nbsp; {profile.role}
        </motion.p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(4.5rem,19vw,15rem)] leading-[0.84] tracking-[-0.035em] whitespace-nowrap"
        >
          <MaskedWord word={profile.firstName} delay={0.2} />
          <MaskedWord word={profile.lastName} delay={0.45} className="pl-[0.55em] italic text-accent" />
        </h1>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            className="max-w-md text-lg leading-relaxed text-subtle text-pretty sm:text-xl"
            {...fadeUp(1)}
          >
            {profile.intro}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-x-6 gap-y-4" {...fadeUp(1.15)}>
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground py-2 pr-6 pl-2 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors duration-500 hover:bg-accent"
            >
              <span className="grid size-9 place-items-center rounded-full bg-background text-foreground">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              Start a project
              <span className="sr-only">on WhatsApp (opens in a new tab)</span>
            </a>
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-foreground/20 px-5 font-mono text-xs uppercase tracking-[0.14em] text-foreground backdrop-blur-sm transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              View work
              <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex items-center justify-between border-t border-foreground/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground lg:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          <span>
            {profile.origin} <span aria-hidden>→</span>
            <span className="sr-only">based in</span> {profile.basedIn}
          </span>
          <span className="hidden sm:inline">Scroll to explore</span>
          <span>
            KL <LocalTime timeZone={profile.timeZone} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
