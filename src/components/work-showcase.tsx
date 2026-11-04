"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function ProjectBlock({
  project,
  index,
  total,
  onActive,
}: {
  project: Project;
  index: number;
  total: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -3 : 3, 0]);

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      aria-labelledby={`project-${project.slug}`}
      className="grid min-h-[85svh] items-center gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
    >
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="font-mono text-xs tracking-[0.14em] text-subtle tabular-nums">
          {number} <span className="text-white/30">/ {String(total).padStart(2, "0")}</span>
        </p>
        <h3
          id={`project-${project.slug}`}
          className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.025em]"
        >
          {project.title}
        </h3>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: project.accent }}>
          {project.category} · {project.country}
        </p>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-subtle text-pretty">{project.description}</p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 py-2 pr-2 pl-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-500 hover:border-white/60"
        >
          Visit site
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
          <span className="sr-only">— {project.domain} (opens in a new tab)</span>
        </a>
      </motion.div>

      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        style={{ scale, rotate }}
        className="group block lg:col-span-7"
      >
        <div className="overflow-hidden rounded-xl border border-white/12 bg-black/40 shadow-2xl shadow-black/60">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
            </span>
            <span className="mx-auto truncate rounded-full bg-white/8 px-4 py-1 font-mono text-[11px] text-subtle">
              {project.domain}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </motion.a>
    </article>
  );
}

/** Project showcase whose background colour shifts to match the project in view. */
export function WorkShowcase({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState(0);
  const tint = projects[active]?.tint ?? "#0b0a09";

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ backgroundColor: tint }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {projects.map((project, index) => (
          <ProjectBlock
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            onActive={setActive}
          />
        ))}
      </div>
    </motion.div>
  );
}
