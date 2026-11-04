import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SITE_URL, profile } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: profile.intro,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description: profile.intro,
    siteName: profile.name,
    images: [
      {
        url: profile.portrait.src,
        width: profile.portrait.width,
        height: profile.portrait.height,
        alt: profile.portrait.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.intro,
    images: [profile.portrait.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain min-h-svh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
