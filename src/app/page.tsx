import type { Metadata } from "next";
import { CommonProblems } from "@/components/CommonProblems";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ServiceFinderSection } from "@/components/ServiceFinderSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { TechnicianShowcase } from "@/components/TechnicianShowcase";
import { WhyUs } from "@/components/WhyUs";

export const metadata: Metadata = {
  title: "Home Service Help Near You | HomeServicesFixing.shop",
  description:
    "Find and call home service help for HVAC, plumbing, electrical, appliance, roofing, locksmith, and garage door needs. Check your ZIP code to see what's available.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <HowItWorks />
      <ServiceFinderSection />
      <WhyUs />
      <TechnicianShowcase />
      <CommonProblems />
      <FAQ />
      <FinalCTA />
    </>
  );
}
