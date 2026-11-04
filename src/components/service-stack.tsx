"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project, Service } from "@/content/site";

type ServiceWithExample = Service & { exampleProject: Project };

function ServiceCard({
  service,
  index,
  total,
  progress,
  stacked,
}: {
  service: ServiceWithExample;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  // Cards further down the stack shrink a little as later cards slide over them.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const { exampleProject: project } = service;

  return (
    <div
      className={`flex items-start justify-center ${stacked ? "sticky" : ""}`}
      style={stacked ? { top: `calc(5.5rem + ${index * 1.75}rem)` } : undefined}
    >
      <motion.article
        style={stacked ? { scale } : undefined}
        className="grid w-full origin-top overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50 md:grid-cols-2"
      >
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-12">
          <div>
            <span className="font-mono text-xs tracking-[0.14em] text-accent">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
              {service.title}
            </h3>
            <p className="mt-6 max-w-md leading-relaxed text-subtle text-pretty">{service.description}</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-subtle"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative min-h-64 border-t border-white/10 md:min-h-[26rem] md:border-t-0 md:border-l">
          <Image
            src={project.image}
            alt={`Screenshot of the ${project.title} website`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground backdrop-blur-md">
            Example: {project.title}
          </figcaption>
        </figure>
      </motion.article>
    </div>
  );
}

/** Service cards that pin and stack on top of each other while scrolling. */
export function ServiceStack({ services }: { services: readonly ServiceWithExample[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Pinning/stacking needs vertical room; on small screens the cards simply flow.
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (min-height: 640px)");
    const update = () => setStacked(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} className={`relative flex flex-col ${stacked ? "gap-[18vh] pb-[6vh]" : "gap-6"}`}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          service={service}
          index={index}
          total={services.length}
          progress={scrollYProgress}
          stacked={stacked}
        />
      ))}
    </div>
  );
}
