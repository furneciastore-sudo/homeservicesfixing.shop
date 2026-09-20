import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCallBar } from "@/components/MobileStickyCallBar";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homeservicesfixing.shop";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HomeServicesFixing.shop | Home Service Help Near You",
  description:
    "Find and call home service help for HVAC, plumbing, electrical, appliance, roofing, locksmith, and garage door needs across the USA.",
  openGraph: {
    type: "website",
    siteName: "HomeServicesFixing.shop",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCallBar />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
