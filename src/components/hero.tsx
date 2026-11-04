"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splits a word into letters that rise out of a clipping mask, one after another. */
function MaskedWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <span className="sr-only">{word}</span>
      <span aria-hidden className="inline-block">
        {word.split("").map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.05, ease: EASE }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-[1440px] px-5 pt-28 pb-20 sm:px-8 lg:px-12 lg:pt-36 lg:pb-28"
    >
      <motion.div
        className="mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b border-border pb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground lg:mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <span>(Portfolio)</span>
        <span>
          {profile.origin} <span aria-hidden>→</span>
          <span className="sr-only">based in</span> {profile.basedIn}
        </span>
        <span>{profile.role}</span>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-12 lg:col-span-7">
          <h1
            id="hero-title"
            className="font-display text-[clamp(5rem,22vw,12.5rem)] leading-[0.86] whitespace-nowrap tracking-[-0.03em]"
          >
            <MaskedWord word={profile.firstName} delay={0.15} />
            <MaskedWord
              word={profile.lastName}
              delay={0.4}
              className="pl-[0.5em] italic text-subtle"
            />
          </h1>

          <motion.div
            className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:max-w-xl lg:flex-col lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            <p className="max-w-md text-lg leading-relaxed text-subtle text-pretty sm:text-xl">
              {profile.intro}
            </p>
            <a
              href="#work"
              className="group inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
            >
              <span className="grid size-11 place-items-center rounded-full border border-border transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden />
              </span>
              Selected work
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.figure
            className="relative overflow-hidden rounded-sm bg-card"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
          >
            <motion.div style={{ y: portraitY }} className="relative aspect-[4/5]">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.18 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.25, ease: EASE }}
              >
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top grayscale-[15%]"
                />
              </motion.div>
            </motion.div>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pt-16 pb-4 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-foreground">{profile.name}</span>
              <span className="text-subtle">{profile.basedIn}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
