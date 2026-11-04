import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";
import { servicePaths } from "@/content/services";
import { whatsapp } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found | Aryan Danish",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Portfolio", href: "/" },
  { label: "Website design services", href: servicePaths.en },
  { label: "Servis buat website (BM)", href: servicePaths.ms },
  { label: "Jasa pembuatan website (ID)", href: servicePaths.id },
] as const;

export default function NotFound() {
  return (
    <>
      <FloatingNav />
      <main id="main" className="mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-5 pt-28 pb-16 sm:px-8 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">(Error 404)</p>
        <h1 className="mt-6 font-display text-[clamp(4rem,16vw,13rem)] leading-[0.85] tracking-[-0.035em]">
          Lost <em className="text-accent">the way.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-subtle text-pretty sm:text-xl">
          This page doesn&rsquo;t exist or has moved. Here are a few places to go instead.
        </p>

        <ul className="mt-12 flex flex-wrap gap-3">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-12 items-center rounded-full border border-border px-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground py-2 pr-6 pl-2 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors duration-500 hover:bg-accent"
          >
            <span className="grid size-9 place-items-center rounded-full bg-background text-foreground">
              <ArrowLeft className="size-4" aria-hidden />
            </span>
            Back home
          </Link>
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-subtle transition-colors hover:text-foreground"
          >
            <MessageCircle className="size-4" aria-hidden />
            Ask me on WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </main>
    </>
  );
}
