import { LocalTime } from "@/components/local-time";
import { profile } from "@/content/site";

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 font-mono text-xs uppercase tracking-[0.14em] sm:px-8 lg:px-12">
        <a href="#top" className="text-foreground">
          {profile.name}
        </a>
        <p className="hidden text-muted-foreground md:block">
          Kuala Lumpur <span aria-hidden>·</span>{" "}
          <LocalTime timeZone={profile.timeZone} />
        </p>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 sm:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline inline-flex min-h-11 items-center text-subtle transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
