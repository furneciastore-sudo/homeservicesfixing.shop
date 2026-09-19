import type { Metadata } from "next";
import { CommonProblems } from "@/components/CommonProblems";
import { CoverageStrip } from "@/components/CoverageStrip";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { FullWidthBreak } from "@/components/FullWidthBreak";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { RealWorkGrid } from "@/components/RealWorkGrid";
import { ServiceFinderSection } from "@/components/ServiceFinderSection";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceStorySection } from "@/components/ServiceStorySection";
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
      <ServiceFinderSection />
      <ServiceGrid />
      <ServiceStorySection
        service="hvac"
        imageSide="left"
        heading="Cooling Problems?"
      />
      <ServiceStorySection
        service="plumbing"
        imageSide="right"
        heading="Plumbing Problems?"
      />
      <ServiceStorySection
        service="electrician"
        imageSide="left"
        heading="Electrical Problems?"
      />
      <FullWidthBreak />
      <RealWorkGrid />
      <WhyUs />
      <HowItWorks />
      <CoverageStrip />
      <CommonProblems />
      <FAQ />
      <FinalCTA />
    </>
  );
}
