"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { servicePaths } from "@/content/services";

const links = [
  { id: "work", label: "Work", href: "/#work", className: "" },
  { id: "services", label: "Services", href: "/#services", className: "hidden sm:inline-flex" },
  { id: "about", label: "About", href: "/#about", className: "" },
  { id: "contact", label: "Contact", href: "/#contact", className: "" },
] as const;

type SectionId = (typeof links)[number]["id"];

const SERVICE_PAGES = new Set<string>(Object.values(servicePaths));
/** A section counts as "current" once its top edge passes this fraction of the viewport. */
const ACTIVATION_LINE = 0.45;

/** Scroll spy: on the home page, returns the section currently being read. */
function useActiveSection(enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVATION_LINE;
      let current: SectionId | null = null;
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach the line; treat it as current.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? "contact" : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return enabled ? active : null;
}

/** Primary nav links with a pill that slides to whichever section is in view. */
export function NavLinks() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const spied = useActiveSection(isHome);
  const active: SectionId | null = isHome ? spied : SERVICE_PAGES.has(pathname) ? "services" : null;

  return (
    <ul className="flex items-center">
      {links.map((link) => {
        const isActive = link.id === active;
        return (
          <li key={link.id} className={link.className}>
            <Link
              href={link.href}
              aria-current={isActive ? (isHome ? "location" : "page") : undefined}
              className={`relative inline-flex h-10 items-center rounded-full px-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-300 sm:px-4 ${
                isActive ? "text-foreground" : "text-subtle hover:text-foreground"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="nav-active-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white/[0.13] ring-1 ring-white/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                />
              ) : null}
              <span className="relative">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
