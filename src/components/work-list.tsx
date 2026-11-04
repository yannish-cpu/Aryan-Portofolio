"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import type { Project } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 180, damping: 24, mass: 0.6 };

type WorkListProps = { projects: readonly Project[] };

/**
 * Editorial project index. On large pointer devices, hovering a row shows a
 * screenshot that trails the cursor; on touch/small screens the screenshot is inline.
 */
export function WorkList({ projects }: WorkListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div
      ref={listRef}
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActive(null)}
    >
      <ol className="border-t border-border">
      {projects.map((project, index) => (
        <motion.li
          key={project.slug}
          className="border-b border-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(index)}
            onFocus={() => setActive(null)}
            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-4 py-7 sm:gap-x-8 lg:grid-cols-12 lg:py-10"
          >
            <span className="font-mono text-xs text-muted-foreground tabular-nums lg:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="lg:col-span-6">
              <span className="block font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.95] tracking-[-0.02em] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-accent group-focus-visible:text-accent">
                {project.title}
              </span>
              <span className="mt-3 block max-w-md text-sm leading-relaxed text-muted-foreground lg:hidden">
                {project.description}
              </span>
            </span>

            <span className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground lg:col-span-3 lg:block">
              {project.description}
            </span>

            <span className="flex flex-col items-end gap-2 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:col-span-2">
              <span className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-[transform,border-color,color] duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
              <span>{project.category}</span>
              <span className="hidden sm:block">{project.country}</span>
            </span>

            <span className="col-span-3 block overflow-hidden rounded-sm border border-border lg:hidden">
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.title} website`}
                width={1440}
                height={900}
                sizes="100vw"
                className="h-auto w-full"
              />
            </span>
            <span className="sr-only">(opens {project.domain} in a new tab)</span>
          </a>
        </motion.li>
      ))}
      </ol>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[380px] lg:block"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="relative ml-10 aspect-[16/10] -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl shadow-black/60 ring-1 ring-border"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {projects.map((project, index) => (
                <Image
                  key={project.slug}
                  src={project.image}
                  alt=""
                  fill
                  sizes="380px"
                  className={`object-cover object-top transition-opacity duration-300 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
