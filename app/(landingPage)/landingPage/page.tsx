import Features from "@/features/marketing/components/LandingPage/Features";
import Hero from "@/features/marketing/components/LandingPage/Hero";
import HowItWorks from "@/features/marketing/components/LandingPage/HowItWorks";
import UIShowcase from "@/features/marketing/components/LandingPage/UIShowcase";
import React from "react";
import TrustSection from "@/features/marketing/components/LandingPage/TrustSection";
import FinalCTA from "@/features/marketing/components/LandingPage/FinalCTA";
const page = () => {
  return (
    <div>
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />

        <UIShowcase />
        <TrustSection />

        <FinalCTA />
      </div>
    </div>
  );
};

export default page;
