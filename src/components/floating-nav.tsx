import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/content/site";

const links = [
  { label: "Work", href: "#work", className: "" },
  { label: "Services", href: "#services", className: "hidden sm:inline-flex" },
  { label: "About", href: "#about", className: "" },
  { label: "Contact", href: "#contact", className: "" },
] as const;

/** Floating, glassy pill navigation centred at the top of the viewport. */
export function FloatingNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0a09]/55 p-1.5 shadow-lg shadow-black/30 backdrop-blur-xl"
      >
        <a
          href="#top"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground font-display text-lg leading-none text-background italic transition-colors duration-500 hover:bg-accent"
        >
          <span aria-hidden>ad</span>
          <span className="sr-only">Aryan Danish — back to top</span>
        </a>
        <ul className="flex items-center">
          {links.map((link) => (
            <li key={link.href} className={link.className}>
              <a
                href={link.href}
                className="inline-flex h-10 items-center rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle transition-colors duration-300 hover:bg-white/8 hover:text-foreground sm:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-accent px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-foreground transition-colors duration-500 hover:bg-foreground sm:px-4"
        >
          <MessageCircle className="size-4" aria-hidden />
          <span className="hidden sm:inline">Let&rsquo;s talk</span>
          <span className="sr-only sm:hidden">WhatsApp</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </nav>
    </header>
  );
}
