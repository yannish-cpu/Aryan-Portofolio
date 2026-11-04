import type { Metadata } from "next";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { profile, whatsapp } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${profile.name}`,
  description: "How this website handles visitor data: no forms, no cookies, privacy-friendly analytics and contact via WhatsApp.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "4 November 2026";

const sections = [
  {
    title: "Who runs this website",
    body: [
      `This website is run by ${profile.name}, an independent website designer based in Malaysia. You can contact me on WhatsApp at ${whatsapp.display}.`,
    ],
  },
  {
    title: "What data this website collects",
    body: [
      "This website has no contact forms, no accounts and no newsletter, so it does not ask you for any personal information.",
      "It does not use cookies for tracking or advertising.",
    ],
  },
  {
    title: "Analytics",
    body: [
      "I use Vercel Web Analytics to count page views and see which pages are visited. It does not use cookies and does not identify individual visitors. The data is aggregated and used only to improve this website.",
    ],
  },
  {
    title: "Hosting",
    body: [
      "This website is hosted by Vercel. Like any web host, Vercel processes technical data such as IP addresses to deliver the site and protect it from abuse. See Vercel's privacy policy for details.",
    ],
  },
  {
    title: "WhatsApp and external links",
    body: [
      "When you tap a WhatsApp button, you leave this website and WhatsApp (Meta) handles your message under its own privacy policy. Messages you send me are used only to reply to your enquiry and are not shared with anyone else.",
      "Links to client websites and social media open third-party sites that have their own privacy policies.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "If you have contacted me and would like our conversation or your details deleted, send me a message on WhatsApp and I will delete them.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <FloatingNav />
      <main id="main" className="mx-auto max-w-3xl px-5 pt-36 pb-24 sm:px-8 lg:pt-44">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle">Last updated {LAST_UPDATED}</p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em]">
          Privacy <em className="text-accent">policy</em>
        </h1>
        <div className="mt-14 flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-3xl">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed text-subtle text-pretty">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link href="/" className="link-underline">
            Back to portfolio →
          </Link>
        </p>
      </main>
    </>
  );
}
